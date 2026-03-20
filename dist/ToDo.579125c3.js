const inputNode = document.querySelector('.js-input');
const btnNode = document.querySelector('.js-btn');
const btnClearNode = document.querySelector('.js-clear-btn');
const initialTodos = []; // создаем массив данных.
const model = createTodosMode(initialTodos);
const view = createView('.js-output');
const storage = createStorage(TODOS_STORAGE_KEY);
const storageTodos = storage.pull();
if (storageTodos) model.update(storageTodos);
view.render(model.get());
btnNode.addEventListener('click', function() {
    const todo = inputNode.value;
    model.add(todo);
    view.render(model.get());
    storage.push(model.get());
});
btnClearNode.addEventListener('click', function() {
    model.clear();
    view.render(model.get());
    storage.push(model.get());
});

//# sourceMappingURL=ToDo.579125c3.js.map
