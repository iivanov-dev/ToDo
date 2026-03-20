import { TODOS_STORAGE_KEY } from "./constants";
import { createTodosModel } from "./model";
import { createView } from "./view";
import { createStorage } from "./storage";


const inputNode = document.querySelector('.js-input');
const btnNode = document.querySelector('.js-btn');
const btnClearNode = document.querySelector('.js-clear-btn');

const initialTodos = [];

const model = createTodosModel(initialTodos);
const view = createView('.js-output', handleClickToDo);
const storage = createStorage(TODOS_STORAGE_KEY);

storage.pull().then((todos) => {
    model.setTodos(todos);
    view.renderTodos(model.getTodos());
});

btnNode.addEventListener('click', function() {
    const todoTitle = inputNode.value;

    const todo = model.addTodo({
        title: todoTitle
    });

    view.addTodo(todo);

    storage.push(todo);
});

btnClearNode.addEventListener('click', function() {
    storage.delete(model.getTodos());

    model.setTodos([]);

    view.clearTodos();
});

function handleClickToDo(id){
    model.toggleTodo(id);
    storage.update(model.getTodo(id));
}