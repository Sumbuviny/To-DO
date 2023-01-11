window.addEventListener('load', () => {
     // step 1 set and get a username or a single string from a database
    // create a global variable
    todos = JSON.parse(localStorage.getItem('todos')) || []; // if there is any todo's saved in our local storage we're going to get those
      
    // create nameInput, we're going to get the nameInput
    const nameInput = document.querySelector('#name');  
    // create newTodoForm
    const newTodoForm = document.querySelector('#todo-form');
     // create username, we're going to get the username
    const username = localStorage.getItem('username') || '';
     // whatever is in our local storage it will pull it here
    nameInput.value = username;
      
    // change made
    nameInput.addEventListener('change', e=> {
         // we're actually going to set an item in our local storage called username and we're set to the value there 
        localStorage.setItem('username', e.target.value); 

    })
     
    // step 2 get JSON code from it 

    newTodoForm.addEventListener('submit', e=>{
        e.preventDefault();

          //create todo which is going to have our content, category,..we're going to get our content from the form element

        const todo={
            content: e.target.elements.content.value, // e.target which is going to be the form we submitted,.. .value to get the actual value
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }
           // add the new todo to our array or global variable
        todos.push(todo);
           // save our local storage item
        localStorage.setItem('todos', JSON.stringify(todos));
           // reset our target
        e.target.reset();

        DisplayTodos(); // call this function
    })
    DisplayTodos();
})

// create a function, to display items on screeen
function DisplayTodos(){
     // create todo list
    const todoList = document.querySelector('#todo-list');

    todoList.innerHTML = ''; //clear all  of the elements
      // loop through every single todo in our todo's array
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const del = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('Menu');

          // add menu class
        if(todo.category == 'drink'){
            span.classList.add('drink');
        }else{
            span.classList.add('food');  
        }

        content.classList.add('todo-content')
        actions.classList.add('actions');
        edit.classList.add('edit');
        del.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        del.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(del);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if (todo.done){
            todoItem.classList.add('done');
        }

        input.addEventListener('click', e=>{
             todo.done = e.target.checked;

             localStorage.setItem('todos', JSON.stringify(todos));

             if(todo.done){
                todoItem.classList.add('done');
             }else{
                todoItem.classList.remove('done');
             }

             DisplayTodos();
        })
          // edit button
        edit.addEventListener('click', e=>{
             const input =content.querySelector('input');
             input.removeAttribute('readonly');
             input.focus();

             input.addEventListener('blur', e=>{
                input.setAttribute('readonly',true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        })

        // delete button
        del.addEventListener('click', e=>{
                 todos = todos.filter(t => t!== todo);
                 localStorage.setItem('todos', JSON.stringify(todos));
                 DisplayTodos();
        })
    })
}