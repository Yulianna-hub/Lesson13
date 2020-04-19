'use strict';

let isstring = function(m) {
    return isNaN(m) || m !== '' || m === null;
};
const todoControl = document.querySelector('.todo-control'),
headerInput = document.querySelector('.header-input'),
todoList = document.querySelector('.todo-list'),
todoCompleted = document.querySelector('.todo-completed'),
headerButton = document.querySelector('.header-button');


const todoData = [];

console.log(todoData);

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>'+
        '<div class="todo-buttons">' + 
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
        '</div>';
        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        const btntodoComplete = li.querySelector('.todo-complete');
        btntodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });
        const todoRemove = li.querySelector('.todo-remove');
        todoRemove.addEventListener('click', function(event) {
            event.preventDefault();
            
            todoRemove.remove(li) || localStorage.removeItem('memory');
      
            render();
        });
        const showTodo = function() {  
            todoData.textContent = localStorage.getItem('memory');

        };
        headerButton.addEventListener('click', function() {
            localStorage.setItem('memory', headerInput.value );
           
        showTodo();
        });
        showTodo();
       
    });
    


};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false
    };
     
    todoControl.reset();
    todoData.push(newTodo);
    render();
}, false);

render();

