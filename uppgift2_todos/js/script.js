



const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output');
const error = document.querySelector('#error');

let todos = [];

const fetchTodos = () => {
     //    http://jsonplaceholder.typicode.com/posts?_start=10&_limit=10
    fetch('https://jsonplaceholder.typicode.com/todos?_start20=&_limit=10')
    .then(res => res.json())
    .then(data => {
        todos = data;
        // console.log(todos);
        listTodos();
    })
}

fetchTodos();


const newTodo = (todo) => {
    let card = document.createElement('div');
    card.setAttribute('id', `${todo.id}`)
    card.classList.add('box', 'todo', 'col-xl-12');
    if(todo.completed) {
        card.classList.add('done');
    } else {
        card.classList.remove('done');
    }


    let innerCard = document.createElement('div');
    innerCard.classList.add('d-flex', 'justify-content-between', 'align-items-center');

    let title = document.createElement('h4');
    title.classList.add('title');
    title.style.cursor= "default"
    title.innerText = todo.title;

    let contain = document.createElement('div');
    contain.classList.add('contain')



    let button = document.createElement('button');
    button.classList.add('btn', 'btn-remove', 'hidden'); //
    // button.innerText = 'X';
    if(todo.completed) {
        button.classList.remove('hidden');
    }
    button.addEventListener('click', () => {
        // todos = todos.filter(todo => todo.id !== e.target.parentNode.parentNode.parentNode.id)
        todos = todos.filter(todo => todo.id != card.id)
        listTodos();
        // createTodo();
    })
    
    let i = document.createElement('i');
    i.classList.add('far', 'fa-trash-alt');

    let check = document.createElement('button');
    check.classList.add('btn', 'btn-check', 'color')
    if(todo.completed) {
        check.classList.add('color');
        
        // i.classList.remove('hidden');
     } else {
        check.classList.remove('color');
     }
    check.addEventListener('click', () => {
        check.classList.toggle('color')
        card.classList.toggle('done');
        button.classList.toggle('hidden');
        
        todos.map(t => {
            if(t.id === todo.id){
                todo.completed = !todo.completed;

            } 
            // todos.sort((a,b) => a.completed - b.completed)
            return t 
        }) 
        listTodos(todos.sort((a,b) => a.completed - b.completed)); 
    })
   

    button.appendChild(i);
    
    // contain.appendChild(check);
    contain.appendChild(check);
    contain.appendChild(title);
    innerCard.appendChild(contain);
    innerCard.appendChild(button);
    card.appendChild(innerCard);
    output.appendChild(card);
    
}

const listTodos = () => {
    output.innerHTML = '';
    todos.sort((a,b) => a.completed - b.completed)

    todos.forEach(todo => {
        newTodo(todo);
    });
}


const createTodo = (title) => {

    fetch('https://jsonplaceholder.typicode.com/todos?_start=20&_limit=10',{
        method: 'POST',
        headers: {
        'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
        title,
        completed: false
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        todos.unshift(data);
        listTodos();
    })
}

const validate = () => {

    if (input.value === '') {
        input.classList.add('is-invalid');
        error.innerHTML = 'Cannot be blank';

    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        error.innerHTML = ''
        return true;
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();

    validate();

    if(validate()) {       
        createTodo(input.value);
        input.value = '';
        input.classList.remove('is-valid');
    }

})