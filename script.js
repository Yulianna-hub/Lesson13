'use strict';

let isstring = function(m) {
    return isNaN(m) || m !== '' || m === null;
};
const todoControl = document.querySelector('.todo-control'),
headerInput = document.querySelector('.header-input'),
todoList = document.querySelector('.todo-list'),
todoCompleted = document.querySelector('.todo-completed'),
headerButton = document.querySelector('.header-button');

let todoData = [];
if (localStorage.getItem('memory')) {
    todoData = JSON.parse(localStorage.getItem('memory'));
}
const renderItemUpdate = function () {
    if (!todoData.todoList.length && !todoData.todoCompleted.length) return;

    for (let i = 0; i < todoData.todoList.length; i++) {
        render(todoData.todoList[i]);
    }
    for (let i = 0; i < todoData.todoCompleted.length; i++) {
        render(todoData.todoCompleted[i], true);
    }      
    
};

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
        const itemRemove = function(elem) {
            const item = elem.parentNode.parentNode;
            const itemParent = item.parentNode;
            const id = itemParent.id;
            const text = item.textContent;
    
            todoData.splice(todoData.indexOf(text), 1);
            itemParent.removeChild(item);
            //localStorage.removeItem('memory'); - Возможно использовать этот метод?? 
        };
        todoRemove.addEventListener('click', function(event) {
            event.preventDefault();
           itemRemove(event.target);
        });
        const showTodo = function() {  
            todoData.textContent = localStorage.getItem('memory');

        };
        headerButton.addEventListener('click', function() {
            localStorage.setItem('memory', JSON.stringify(todoData));
            console.log(localStorage.getItem('memory'));
           
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

