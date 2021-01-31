let users = [] // Tom array som kommer hålla users som skapas sen 

// Deklarerar allt som man behöver komma åt från HTML koden.
const form = document.querySelector('.form');
const title = document.querySelector('.title')
const addUser = document.querySelector('#submit');
const list = document.querySelector('#list');

const input = document.querySelectorAll('input');
const firstname = document.querySelector('#firstname');
const lastname = document.querySelector('#lastname');
const email = document.querySelector('#email');
const error = document.querySelector('#error-email');

const moveFirstName = document.querySelector('#moveFirstName');
const moveLastName = document.querySelector('#moveLastName');
const moveEmail = document.querySelector('#moveEmail');
// change används senare när jag vill kunna ändra namn på användare längre ner. 
let change = false;
// behöver kunna spara ett värde senare som behöver vara åtkomlig i flera funktioner.
let userId
// sätter strukturen på hur body till varje användare ska se ut 
const listUser = () => {
    list.innerHTML = '';

    users.forEach(user => {
        list.innerHTML += 
        `<div id="${user.id}" class="list-element text-white rounded p-2 d-flex justify-content-between align-items-center mt-1">
            <div> ${user.firstName} ${user.lastName} 
                <br>
                <span id="email-text">${user.email}</span>
            </div>
            <div>
                <button class="btn btn-change"><i class="fas fa-pen"></i></button>
                <button class="btn btn-remove"><i class="far fa-times-circle"></i></button>
            </div>
        </div>
        <hr>`
    })
}
//Startar funktionen så det blir synligt på sidan
listUser();

//---------------------------------------------------------
// Validera firstname & lastname, samt kolla så det inte inenhåller siffror
const validate = (i) => {
    let input = document.querySelector('#' + i)
    let error = document.querySelector('#error-' + i)
    const re = /^[A-ZÅÄÖa-zåäö\s\-]+$/ // Får innehålla A-Ö samt mellanrum och bindestreck ifall personen har dubbelnamn 
    const check = re.test(input.value)

    if (input.value === '') {
        input.classList.add('is-invalid');
        error.innerHTML = 'Cannot be blank';
    } else if (input.value.length < 2){
        input.classList.add('is-invalid');
        error.innerHTML = `Name must be more than one letter`
    } else if (check == false) {
        input.classList.add('is-invalid');
        error.innerHTML = `Cannot use numbers`
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        error.innerHTML = ''
        return true;
    }
}

//---------------------------------------------------------
// Validera email och kolla så email inte innehåller spacialtecken och måste ha en @
const validateEmail = () => {
    const input = document.querySelector('#email')
    const error = document.querySelector('#error-email')
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/
    const check = re.test(input.value)

    if (input.value === '') {
        input.classList.add('is-invalid');
        error.innerHTML = 'Cannot be blank';
    } else if (check == false) {
        
        input.classList.add('is-invalid');
        error.innerHTML = `Must enter a valid email`
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        error.innerHTML = ''
        return true;
    }
}

//---------------------------------------------------
// För att kunna ändra användaren. Med map plockar man ut en user och flyttar dess value till inputarna.
const changeUser = (id) => {

    return users.map(user => {
        if (user.id === id)
        return {
            id: user.id,
            firstName: firstname.value,
            lastName: lastname.value,
            email: email.value
        }

        return user
    })
}
//---------------------------------------------------------
/* Fixar så label till inputs åker upp och ner beroende på om 
användaren tryckt på en input eller inte, samt validerar direkt på input. */
form.addEventListener('input', function(e) {
    e.preventDefault();

    if (firstname.value !== '') {
        moveFirstName.classList.add('move');
        validate('firstname');
        
    } else if (firstname.value == '') {
        moveFirstName.classList.remove('move');
    }

    if (lastname.value !== '') {
        moveLastName.classList.add('move');
        validate('lastname');
    } else if (lastname.value == '') {
        moveLastName.classList.remove('move');
    }

    if (email.value !== '') {
        moveEmail.classList.add('move');
        validateEmail();
    } else if (email.value == '') {
        moveEmail.classList.remove('move');
    }

})

//---------------------------------------------------------
/* Event Listener för submit knappen. Kollar först om man tryckt för att ändra en användare,
så körs den funktionen och byter tillbaka namnet på knappen till vad det stod innan.
Tömmer även värdet på inputs samt ändrar tillbaka label på input till utgångsläget.

Sen körs validerings funktionerna som kollar så att alla inputs har fyllts i korrekt.

Efter det kollar den om emailen som fyllts i input(email) är samma som någon som redan
finns i arreyen (users). Om den finns kommer den ge false och inte gå vidare till nästa steg.

Slutligen kollar den så alla validerings funktioner har gått igenom till true och i så fall 
tas klassen (is-valid) bort för att ta bort grön ram. En ny användare kan nu skapas och pushas
in i arrayen (users). Efter det återställs inputs både från värdet som skrivits in samt återställer label. 
*/
addUser.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (change === true) {

        users = changeUser(userId);
        title.innerText = 'Add new user';
        addUser.innerText = 'Submit';
        change = false
        listUser();

        moveFirstName.classList.remove('move');
        moveLastName.classList.remove('move');
        moveEmail.classList.remove('move');

        firstname.classList.remove('is-valid');
        lastname.classList.remove('is-valid');
        email.classList.remove('is-valid');

        firstname.value = '';
        lastname.value = '';
        email.value = '';

        return
    }
    
    validate('firstname');
    validate('lastname');
    validateEmail();


    if (users.some(user => user.email === email.value)) {
        email.classList.add('is-invalid');
        error.innerHTML = 'Email already exist';
        return false  
    }
   
    if(validate('firstname', 'lastname') == true && validateEmail() == true) { // om valideringen är true på förnamn, eftern 
        firstname.classList.remove('is-valid');
        lastname.classList.remove('is-valid');
        email.classList.remove('is-valid');

        let newuser = {
            id: uuidv4(), // skapar ett unikt id 
            firstName: firstname.value,
            lastName: lastname.value,
            email: email.value,
        }
        
        users.push(newuser);
        listUser();
        
        moveFirstName.classList.remove('move');
        moveLastName.classList.remove('move');
        moveEmail.classList.remove('move');

        firstname.value = '';
        lastname.value = '';
        email.value = '';
    }

}) 


//---------------------------------------------------------
// Event Listener till remove knappen som tar bort vald användare.
list.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-remove')) {
        users = users.filter(newuser => newuser.id !== e.target.parentNode.parentNode.id)
        listUser();
        // console.log(e.target.parentNode.parentNode)
    }
   
})


//---------------------------------------------------------
/* Event Listener till change knappen som gör det möjligt att ändra användaren. */
list.addEventListener('click', (e) => {

    if (e.target.classList.contains('btn-change')) {

        title.innerText = 'Update user';

        moveFirstName.classList.add('move');
        moveLastName.classList.add('move');
        moveEmail.classList.add('move');

        addUser.innerText = 'Update';
        change = true
        // userId = e.target.parentNode.parentNode.parentNode.id;
        userId = e.target.parentNode.parentNode.id;

        // let user = users.find(user => user.id == e.target.parentNode.parentNode.parentNode.id)
        let user = users.find(user => user.id == e.target.parentNode.parentNode.id)
        let firstName = user.firstName;
        let lastName = user.lastName;
        let Email = user.email;

        firstname.value = firstName
        lastname.value = lastName
        email.value = Email
    }
}) 