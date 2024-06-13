import { ITask } from '../models/taskModel';
import { createNewTaskElement } from '../utils/formUtils';
import { addTask, updateTask } from './taskManipulations';

const root = document.getElementById('root');

export function renderForm() {
  const form: HTMLFormElement = document.createElement('form');
  form.classList.add('task-manager__form');
  form.id = 'task-form';

  form.innerHTML = `
  <input type="text" class="d-none" id="input-id" />
  <input type="text" class="task-manager__form-input form-control" id="input-title" required placeholder="Enter a task title..."/>
  <input type="text" class="task-manager__form-input form-control" id="input-desc" required placeholder="Enter a task description..."/>
  <div>
  <label class="form-check-label" for="inputCheckboxDate">
  Does the task have a due date?
  </label>
  <input type="checkbox" class="form-check-input" id="inputCheckboxDate"/>
  </div>
  <input type="date" class="form-control" id="input-date" min="${new Date().toISOString().split('T')[0]}"  required/>
  </div>
  <input type="text" class="task-manager__form-input form-control" id="input-category" required placeholder="Enter a task category..." />
  <button class="btn btn-success d-flex items-center" type="submit" id="task-manager__form-btn" name="action">Add task<i class="material-icons right ms-2">add_circle</i></button>
  `;

  const formBtnEl = form.querySelector(
    '#task-manager__form-btn'
  ) as HTMLButtonElement;

  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    if (formBtnEl.textContent?.includes('Add')) {
      addTask(event);
    } else {
      updateTask(event);
    }
  });

  if (root) {
    root.append(form);
    const dateCheckEl = root.querySelector(
      '#inputCheckboxDate'
    ) as HTMLInputElement;

    setDateDisabled(dateCheckEl);
    listenToDateCheck();
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

export function listenToDateCheck() {
  const dataCheckEl = root?.querySelector(
    '#inputCheckboxDate'
  ) as HTMLInputElement;

  dataCheckEl.addEventListener('change', (event) => {
    setDateDisabled(dataCheckEl);
  });
}

export function setDateDisabled(dateCheckEl: HTMLInputElement) {
  const inputDateEl = root?.querySelector('#input-date') as HTMLInputElement;
  if (inputDateEl) {
    inputDateEl.disabled = !dateCheckEl.checked;

    if (inputDateEl.disabled) {
      inputDateEl.valueAsDate = null;
    } else {
      inputDateEl.value = new Date().toISOString().split('T')[0];
    }
  }
}

export function clearTaskTable() {
  const taskTable = root?.querySelector('#task-table') as HTMLDivElement;

  if (taskTable) {
    taskTable.innerText = '';
  }
}
