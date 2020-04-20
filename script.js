'use strict';

const todoControl = document.querySelector('.todo-control'),
headerInput = document.querySelector('.header-input'),
todoList = document.querySelector('.todo-list'),
todoCompleted = document.querySelector('.todo-completed');

let todoData= [];
if (localStorage.getItem('memory')) {
    todoData = JSON.parse(localStorage.getItem('memory'));
}
const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item, i){
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
            localStorage.setItem('memory', JSON.stringify(todoData));
            render();
        });
        const todoRemove = li.querySelector('.todo-remove');
        const itemRemove = function(elem) {
            const text = li.textContent;
            todoData.splice(i, 1);
            localStorage.setItem('memory', JSON.stringify(todoData));
            render();   
        };
        todoRemove.addEventListener('click', function(event) {
            event.preventDefault();
           itemRemove(event.target);
        });
    });

};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    if (headerInput.value.trim() === '') return;
    const newTodo = {
        value: headerInput.value,
        completed: false
    };
    todoControl.reset();
    todoData.push(newTodo);
    localStorage.setItem('memory', JSON.stringify(todoData));
    render();
}, false);

render();

