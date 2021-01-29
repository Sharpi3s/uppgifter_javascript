// Deklarerar mina variabler
const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output');
const error = document.querySelector('#error');
// Skapar en tom array för att kunna fylla med alla todos 
let todos = [];

// fetch för att hämta JSON objekt med url och lägga in dom objekten i arrayen
const fetchTodos = () => {

  fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => res.json())
    .then(data => {
      todos = data; // spar ner datan till arrayen
      listTodos(); // Kommer sedan lista ut [todos] 
    })
}
/* Startar funktionen eftersom listTodos som skriver ut listan redan är startad 
inuti denna funktion så kommer nu listan skrivas ut på sidan*/
fetchTodos();

// Här skapas element så alla objekt får ett utseende. Petar in (todo) för att få åtkomst till en todo i funktionen
const newTodo = (todo) => {
  // Grund div som håller hela objektet.
  let card = document.createElement('div');
  // Sätter samma id på grund elementet som todon kommer få som skapas i den. 
    card.setAttribute('id', `${todo.id}`)
    card.classList.add('box', 'todo', 'col-xl-12');

  // Skapar en inre div som separerar innehållet till olika sidor.
  let innerCard = document.createElement('div');
    innerCard.classList.add('d-flex', 'justify-content-between', 'align-items-center');

  //Titel på varje todo som skrivs ut på sidan.
  let title = document.createElement('h4');
    title.classList.add('title');
    title.style.cursor = "default"
    title.innerText = todo.title;  // Sätter att h4 nu kommer vara den nya todons titel som man skickar in. 

  //En div som kommer hålla check knappen och titel på samma sida av diven.
  let contain = document.createElement('div');
    contain.classList.add('contain')

  // En knapp som kommer vara till för att kunna ta bort en todo från listan.
  let button = document.createElement('button');
    button.classList.add('btn', 'btn-remove', 'hidden'); 
 
    button.addEventListener('click', () => { // Event listner till min knapp som tar bort ett objekt. 
      todos = todos.filter(todo => todo.id != card.id)// Använde filter på min array. Använde mig att att jämföra todo.id med todo.id som jag satt på card diven.
      listTodos();// listar om min array så den blir uppdaterad med det objekt som blivit borttaget.
    })

  // denna i tag håller egentligen bara font awesome iconen med en soptunna för det visuella till min "ta-bort knapp".
  let i = document.createElement('i');
  i.classList.add('far', 'fa-trash-alt');

  //Skapar min knapp som tar ändrar en todo.completed från true till false och vise versa. 
  let check = document.createElement('button');
  check.classList.add('btn', 'btn-check', 'color')
    
    check.addEventListener('click', () => { // Event listner som gör det möjligt att ändra värdet på todo. 
      todo.completed = !todo.completed// denna rad gör att om todo.completed = true så blir den false och tvärt om.
      listTodos(); // Listar om min array för att den ska sorteras och den klara todon hamnar på den nedre delen av listan. 
    })

  // Detta gör så alla element jag deklarerat ovanför får den struktur jag vill att varje objekt ska få sen.
  button.appendChild(i);
  contain.appendChild(check);
  contain.appendChild(title);
  innerCard.appendChild(contain);
  innerCard.appendChild(button);
  card.appendChild(innerCard);
  output.appendChild(card); // output ligger i HTML-koden och alla andra element skapas i den diven. 

/* En snabb "toggle" if sats där jag sätter vilka klasser som ska synas och 
  tas bort beroende på om en todo är completed true eller fals.
  upplevde det smidigare att samala alla på samma ställe istälelt för att skriva en if sats under varje element jag skapat.  */
  if(todo.completed) {
    card.classList.add('done');
    button.classList.remove('hidden');
    check.classList.add('color');
  } else {
    card.classList.remove('done');
    check.classList.remove('color');
  }

}

// En funktion som sorterar min array samt gör det möjligt att skriva ut varje objekt genom "newTodo"
// som skapades ovanför. forEach tar varje "todo" i "todos" och ger objekten varsin div där titel och knapapr syns.
// Gör objekten synliga.
const listTodos = () => {
  output.innerHTML = '';
  todos.sort((a, b) => a.completed - b.completed)

  todos.forEach(todo => {
    newTodo(todo);
  });
}

// Funktion för att skapa en ny todo med samma upplägg som objekten som redan finns på jasonplaceholder. 
const createTodo = async title => {

  let url = 'https://jsonplaceholder.typicode.com/todos';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    // Vi vill skapa en titel och sätter completed till att från början vara false.
    body: JSON.stringify({
      title,
      completed: false
    })

  })
  // Responsen sätts till att heta todo för att kuna använda datan under. 
  const todo = await res.json()
  // Ger den nya todo ett unikt id för att kunna radera dom nya som skapas en och en 
  //istället för att alla tas bort samtidigt då som får samma id (201)
  todo.id = uuidv4();
  // Skickar in den nya todon med unshift så den nya todon hamnar högst upp i arrayen
  todos.unshift(todo)
  // Listar om allting för att uppdateringen med den nya todon ska synas. 
  listTodos(todos);
}

// funktion för validering 
const validate = () => {
  // om inputens värde är tomt så skrivs meddelande ut att fältet inte får vara tomt och ingen todo kan läggas in. 
  if (input.value === '') {
    input.classList.add('is-invalid');
    error.innerHTML = 'Cannot be blank';
  // Annars sätts error meddelandet till tomt och en ny todo skapas. Retunerar true för att ha något att jämnföra med i evemt listnern för Submit knappen.  
  } else {
    input.classList.remove('is-invalid');
    error.innerHTML = '';
    return true;
  }
}

//Event listner osm lyssnar efter todo
form.addEventListener('submit', e => {
  e.preventDefault();
  // Om valideringen är true skapas en ny todo med värdet som skrivit in i input. Det blir todons titel. 
  if (validate()) {
    createTodo(input.value);
    input.value = '';
  }

})
