import { ITask } from '../models/taskModel';
import { createNewTaskElement } from '../utils/formUtils';
import { addTask } from './taskManipulations';

const root = document.getElementById('root');

export function renderForm() {
  const form: HTMLFormElement = document.createElement('form');
  form.classList.add('task-manager__form');
  form.id = 'task-form';
  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    addTask(event);
  });

  form.innerHTML =
    '<input type="text" class="task-manager__form-input" id="input-title" required placeholder="Enter a task title..."/>' +
    '<input type="text" class="task-manager__form-input" id="input-desc" required placeholder="Enter a task description..."/>' +
    `<input type="date" id="input-date" min="${new Date().toISOString().split('T')[0]}" value="${new Date().toISOString().split('T')[0]}" required/>` +
    '<input type="text" class="task-manager__form-input" id="input-category" required placeholder="Enter a task category..." />' +
    `<button class="btn waves-effect waves-light" type="submit" name="action" >Add task<i class="material-icons right">add_circle</i></button>`;

  if (root) {
    root.append(form);
  }
}

export function renderNewTask(newTask: ITask) {
  if (root) {
    const tasksTable = root.querySelector('#task-table');

    if (tasksTable) {
      const newTaskEl = createNewTaskElement(newTask);
      tasksTable.append(newTaskEl);
    } else {
      const newTaskTable = document.createElement('div');
      newTaskTable.id = 'task-table';

      const newTaskEl = createNewTaskElement(newTask);
      newTaskTable.appendChild(newTaskEl);

      root.append(newTaskTable);
    }
  }
}
