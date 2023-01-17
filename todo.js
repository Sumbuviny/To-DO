window.addEventListener('load', () => {
     // step 1 set and get a username or a single string from a database
    // create a global variable
    todoProject = JSON.parse(localStorage.getItem('todos')) || []; // if there is any todo's saved in our local storage we're going to get those
      
    // create name, we're going to get the nameInput
    const name = document.querySelector('#username');  
    // create TodoForm
    const todoForm = document.querySelector('#todoForm');
     // create user, we're going to get the username
    const user = localStorage.getItem('username') || '';
     // whatever is in our local storage it will pull it here
    name.value = user;
      
    // change made
    name.addEventListener('change', e=> {
         // we're actually going to set an item in our local storage called username and we're set to the value there 
        localStorage.setItem('username', e.target.value); 

    })
     
    // step 2 get JSON code from it 

    todoForm.addEventListener('submit', e=>{
        e.preventDefault();

          //create todoElem which is going to have our content, option,..we're going to get our content from the form element

        const todoElem ={
            content: e.target.elements.content.value, // e.target which is going to be the form we submitted,.. .value to get the actual value
            option: e.target.elements.option.value,
            done: false,
            MadeAt: new Date().getTime()
        }
           // add the new todo to our array or global variable
        todoProject.push(todoElem);
           // save our local storage item
        localStorage.setItem('todos', JSON.stringify(todoProject));
           // reset our target
        e.target.reset();

        showTodos(); // call this function
    })
    showTodos();
})

// create a function, to display items on screeen
function showTodos(){
     // create todo list
    const todoList = document.querySelector('#todoList');

    todoList.innerHTML = ''; //clear all  of the elements
      // loop through every single todo in our todo's array
    todoProject.forEach(todoElem => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todoItem');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const strong = document.createElement('strong');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const del = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todoElem.done;
        strong.classList.add('menu');

          // add menu class
        if(todoElem.option == 'drink'){
            strong.classList.add('drink');
        }else{
            strong.classList.add('food');  
        }

        content.classList.add('todoContent')
        actions.classList.add('actions');
        edit.classList.add('edit');
        del.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todoElem.content}" readonly>`;
        edit.innerHTML = 'Edit';
        del.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(strong);
        actions.appendChild(edit);
        actions.appendChild(del);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if (todoElem.done){
            todoItem.classList.add('done');
        }

        input.addEventListener('click', e=>{
             todoElem.done = e.target.checked;

             localStorage.setItem('todos', JSON.stringify(todoProject));

             if(todoElem.done){
                todoItem.classList.add('done');
             }else{
                todoItem.classList.remove('done');
             }

             showTodos();
        })
          // edit button
        edit.addEventListener('click', e=>{
             const input =content.querySelector('input');
             input.removeAttribute('readonly');
             input.focus();

             input.addEventListener('blur', e=>{
                input.setAttribute('readonly',true);
                todoElem.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todoProject));
                showTodos();
            })
        })

        // delete button
        del.addEventListener('click', e=>{
                 todoProject = todoProject.filter(todo => todo!== todoElem);
                 localStorage.setItem('todos', JSON.stringify(todoProject));
                 showTodos();
        })
    })
}