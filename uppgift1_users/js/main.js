// let users = [
//     {
//         id: '1',
//         firstName: 'Erik',
//         lastName: 'Sten',
//         email: 'erik@sten.com'
//     },
//     {
//         id: '2',
//         firstName: 'Sandra',
//         lastName: 'Wallen',
//         email: 'sandra@sandren.com'
//     },
//     {
//         id: '3',
//         firstName: 'Hedwig',
//         lastName: 'Görgensson',
//         email: 'hedwig@gorgensson.com'
//     }
// ]

// //---------------------------------------------------------

// const addUser = document.querySelector('#submit');
// const list = document.querySelector('#list');
// const test = document.querySelector('#test');
// const firstname = document.querySelector('#firstname');
// const lastname = document.querySelector('#lastname');
// const email = document.querySelector('#email');
// const form = document.querySelector('.form');
// const input = document.querySelectorAll('input');

// const moveFirstName = document.querySelector('#moveFirstName');
// const moveLastName = document.querySelector('#moveLastName');
// const moveEmail = document.querySelector('#moveEmail');


// let change = false;
// let userId


// //---------------------------------------------------------

// const listUser = () => {
//     list.innerHTML = '';

//     users.forEach(user => {
//         list.innerHTML += 
//         `<div id="${user.id}" class="list-element text-white rounded p-2 d-flex justify-content-between align-items-center mt-1">
//             <div> ${user.firstName} ${user.lastName} 
//                 <br>
//                 <span id="email-text">${user.email}</span>
//             </div>
//             <div>
//                 <button class="btn btn-change">change</button>
//                 <button class="btn btn-remove">X</button>
//             </div>
//         </div>
//         <hr>`
//     })
// }

// listUser();

//         // <div>
//         //     <button class="btn btn-change">change</button>
//         //     <button class="btn btn-remove">X</button>
//         // </div>



//                 // <div class="changeParent">
//                 //     <button class="btn btn-change"><i class="fas fa-pen"></i></button>
//                 //     <div class="change"></div>
//                 // </div>

//             // <div id="btns">
//             //     <div class="change">
//             //         <button class="btn btn-change"><i class="fas fa-pen"></i></button>
//             //     </div>
//             //     <button class="btn btn-remove">X</button>
//             // </div>

// //---------------------------------------------------------
// // Event listner som går på submit knappen. Hämtar functioner nedanför och lägger informationen i array users som skrivs ut på DOM.
// form.addEventListener('input', function(e) {
//     e.preventDefault();

//     if (firstname.value !== '') {
//         moveFirstName.classList.add('move');
//     } else if (firstname.value == '') {
//         moveFirstName.classList.remove('move');
//     }
//     if (lastname.value !== '') {
//         moveLastName.classList.add('move');
//     } else if (lastname.value == '') {
//         moveLastName.classList.remove('move');
//     }
//     if (email.value !== '') {
//         moveEmail.classList.add('move');
//     } else if (email.value == '') {
//         moveEmail.classList.remove('move');
//     }

// })

// addUser.addEventListener('click', (e) => {
//     e.preventDefault();
    
//     if (change === true) {

//         users = changeUser(userId);
//         addUser.innerText = 'Submit';
//         change = false
//         listUser();

//         moveFirstName.classList.remove('move');
//         moveLastName.classList.remove('move');
//         moveEmail.classList.remove('move');

//         firstname.value = '';
//         lastname.value = '';
//         email.value = '';

//         return
//     }
//     const error = document.querySelector('#error-email');
    
//     validate('firstname');
//     validate('lastname');
//     validateEmail();
//     // checkDuplicates()

//     if (users.some(user => user.email === email.value)) {
//         email.classList.add('is-invalid');
//         error.innerHTML = 'Email already exist';
//         return false  
//     }
//     // if(validate('firstname') == true && validate('lastname') == true && validateEmail() == true)
//     if(validate('firstname', 'lastname') == true && validateEmail() == true) {
//         firstname.classList.remove('is-valid');
//         lastname.classList.remove('is-valid');
//         email.classList.remove('is-valid');

//         let newuser = {
//             // id: Date.now().toString(),
//             id: uuidv4(),
//             firstName: firstname.value,
//             lastName: lastname.value,
//             email: email.value,
//         }
        
//         users.push(newuser);
//         listUser();
        
//         moveFirstName.classList.remove('move');
//         moveLastName.classList.remove('move');
//         moveEmail.classList.remove('move');

//         firstname.value = '';
//         lastname.value = '';
//         email.value = '';
//     }

// }) 

// //---------------------------------------------------------
// // Validera firstname & lastname, samt kolla så det inte inenhåller siffror
// function validate(i) {
//     let input = document.querySelector('#' + i)
//     let error = document.querySelector('#error-' + i)
//     const re = /^[A-Za-z- ]+$/
//     const check = re.test(input.value)

//     // console.log(input)
//     if (input.value === '') {
//         input.classList.add('is-invalid');
//         error.innerHTML = 'Cannot be blank';
//     } else if (check == false) {
//         input.classList.add('is-invalid');
//         error.innerHTML = `Cannot use numbers`
//     } else {
//         input.classList.remove('is-invalid');
//         input.classList.add('is-valid');
//         error.innerHTML = ''
//         return true;
//     }
// }

// //---------------------------------------------------------
// // Validera email och kolla så email inte innehåller spacialtecken och måste ha en @
// function validateEmail() {
//     const input = document.querySelector('#email')
//     const error = document.querySelector('#error-email')
//     const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
//     const check = re.test(input.value)

//     if (input.value === '') {
        
//         input.classList.add('is-invalid');
//         error.innerHTML = 'Cannot be blank';
//     } else if (check == false) {
        
//         input.classList.add('is-invalid');
//         error.innerHTML = `Must enter a valid email`
//     } else {
//         input.classList.remove('is-invalid');
//         input.classList.add('is-valid');
//         error.innerHTML = ''
//         return true;
//     }
// }



// //---------------------------------------------------------


// list.addEventListener('click', (e) => {
//     if (e.target.classList.contains('btn-remove')) {
//         users = users.filter(newuser => newuser.id !== e.target.parentNode.parentNode.id)
//         listUser();
//         // console.log(e.target.parentNode.parentNode)
//     }
   
// })

// list.addEventListener('click', (e) => {

//     if (e.target.classList.contains('btn-change')) {

//         moveFirstName.classList.add('move');
//         moveLastName.classList.add('move');
//         moveEmail.classList.add('move');

//         addUser.innerText = 'Update';
//         change = true
//         // userId = e.target.parentNode.parentNode.parentNode.id;
//         userId = e.target.parentNode.parentNode.id;

//         // let user = users.find(user => user.id == e.target.parentNode.parentNode.parentNode.id)
//         let user = users.find(user => user.id == e.target.parentNode.parentNode.id)
//         let firstName = user.firstName;
//         let lastName = user.lastName;
//         let Email = user.email;

//         firstname.value = firstName
//         lastname.value = lastName
//         email.value = Email
//     }
// }) 

// //---------------------------------------------------------

// function changeUser(id) {

//     // users = users.map(user => {
//     return users.map(user => {
//         if (user.id === id)
//         return {
//             id: user.id,
//             firstName: firstname.value,
//             lastName: lastname.value,
//             email: email.value
//         }
//         // console.log(user)
//         return user
//     })
// }

