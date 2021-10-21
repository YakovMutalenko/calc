
/**
 * Примитивная генерация id, основанная на Web Crypto API.
 */
function getId(): string {
    return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
}

class Todo {
    private id: string = getId();
    private element: HTMLElement;

    constructor(public value: string, public isDone: boolean = false) {
    }

    public createElement() {
        // Создаем основной контейнер туду-шки
        let todoElem = document.createElement('li');
        todoElem.classList.add('todo-list__todo');
        if (this.isDone) {
            // Если она выполнена, то добавляем класс "выполненности"
            todoElem.classList.add('todo-list__todo_done');
        }

        // Создаем чекбокс с текстом
        let label = document.createElement('label');

        let input = document.createElement('input');
        input.classList.add('todo-list__checkbox');
        input.type = 'checkbox';
        input.checked = this.isDone;

        // Добавляем обработчик на чекбокс на событие клика.
        input.addEventListener('click', (_e) => {
            this.element.classList.toggle('todo-list__todo_done');
        })

        let text = document.createElement('span');
        text.classList.add('todo-list__todo-text');
        text.textContent = this.value;

        label.appendChild(input);
        label.appendChild(text);

        todoElem.appendChild(label);

        return todoElem;
    }

    public getElement() {
        if (!this.element) {
            this.element = this.createElement();
        }

        return this.element;
    }
}

function renderList(listData: Todo[]) {
    let listElem = document.querySelector('.todo-app__list');

    if (listElem) {
        while (listElem.firstChild) {
            listElem.removeChild(listElem.firstChild);
        }

        listData.forEach(todo => {
            listElem?.appendChild(todo.getElement());
        })
    }
}

let todos: Todo[] = [];

todos.push(new Todo('Дать лабораторные работы', true));
todos.push(new Todo('Показать CSS'));
todos.push(new Todo('Проверить работы'));
todos.push(new Todo('Объяснить DOM и DOM'));

let button = document.querySelector('.todo-app__add-todo');

button?.addEventListener('click', () => {
    let input = document.querySelector('.todo-app__new-todo-value') as HTMLInputElement | null;

    if (input?.value) {
        let value = input.value;

        todos.push(new Todo(value));
        input.value = "";
        renderList(todos);
    }
})
