import { ITask } from '../models/taskModel';
import { retrieveRecords } from '../services/tasksService';
import {
  createNewTaskElement,
  formReset,
  selectFormParts,
} from '../utils/formUtils';
import { getEmail, handleAuthorization, handleSignOut } from './authorization';

import { addTask, updateTask } from './taskManipulations';

const root = document.getElementById('root');
handleSignOutBtn();

export function renderAuthorization() {
  const signOutBtn = document.querySelector(
    '#signout-btn'
  ) as HTMLButtonElement;

  if (signOutBtn && signOutBtn.classList.contains('visible')) {
    signOutBtn.classList.remove('visible');
  }

  const googleBtn: HTMLButtonElement = document.createElement('button');
  googleBtn.classList.add('btn', 'btn-primary', 'google-btn');
  googleBtn.textContent = 'Sign-in with Google';
  googleBtn.addEventListener('click', (event) => {
    handleAuthorization();
  });

  if (root) {
    root.append(googleBtn);
  }
}

export function renderForm() {
  const signOutBtn = document.querySelector(
    '#signout-btn'
  ) as HTMLButtonElement;

  if (signOutBtn) {
    signOutBtn.classList.add('visible');
  }

  const form: HTMLFormElement = document.createElement('form');
  form.classList.add('task-manager__form');
  form.id = 'task-form';

  form.innerHTML = `
  <div class="task-manager__form-inner">
  <input type="text" class="d-none" id="input-id" />
  <input type="text" class="task-manager__form-input form-control" id="input-title" required placeholder="Enter a task title..."/>
  <input type="text" class="task-manager__form-input form-control" id="input-desc" required placeholder="Enter a task description..."/>
  <div class="d-flex align-items-center data-block">
  <div class="flex-shrink-0 pe-0 pe-sm-3">
  <label class="form-check-label" for="inputCheckboxDate">
  Does the task have a due date?
  </label>
  <input type="checkbox" class="form-check-input" id="inputCheckboxDate"/>
  </div>
  <input type="date" class="form-control" id="input-date" min="${new Date().toISOString().split('T')[0]}"  required/>
  </div>
  <input type="text" class="task-manager__form-input form-control" id="input-category" required placeholder="Enter a task category..." />
  <button class="btn btn-success d-flex align-items-center justify-content-center" type="submit" id="form-add" name="action" disabled>Add task<i class="material-icons right ms-2">add_circle</i></button>
  <button class="btn btn-danger d-flex align-items-center justify-content-center" type="submit" id="form-cancel" name="action" disabled>Cancel<i class="material-icons right ms-2">close</i></button>
  </div>
  `;

  const formBtnEl = form.querySelector('#form-add') as HTMLButtonElement;

  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    if (formBtnEl.textContent?.includes('Add')) {
      addTask(event);
    } else {
      updateTask(event);
    }
  });

  (form.querySelector('#form-cancel') as HTMLButtonElement).addEventListener(
    'click',
    (event) => {
      formReset();
    }
  );

  if (root) {
    root.append(form);

    const dateCheckEl = root.querySelector(
      '#inputCheckboxDate'
    ) as HTMLInputElement;

    toggleDateDisabled(dateCheckEl);
    listenToDateCheck();
    renderSavedTasks();
  }

  const { titleEl, descEl, dateLabelEl, dateEl, categoryEl } =
    selectFormParts();

  const inputs = [titleEl, descEl, dateLabelEl, dateEl, categoryEl];

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      toggleDisableAddBtn();
      toggleDisableCancelBtn();
    });
  });
}

export async function renderTableInfo() {
  const block = document.createElement('div');
  block.classList.add('d-flex', 'pt-3', 'table-info');
  const currentValue = document.createElement('p');
  currentValue.id = 'currentValue';
  currentValue.textContent = (
    'Tasks already in table: ' + globalThis.tasks.length
  ).toString();
  currentValue.classList.add('pe-4');

  const allValues = document.createElement('p');
  allValues.id = 'allValues';
  allValues.textContent = 'Allowed number of tasks: 9';

  block.append(currentValue, allValues);

  if (root) {
    root.appendChild(block);
  }
}

export async function rerenderTableInfo() {
  const currentValueMessage = document.querySelector(
    '#currentValue'
  ) as HTMLParagraphElement;

  if (currentValueMessage) {
    currentValueMessage.textContent = (
      'Tasks already in table: ' + globalThis.tasks.length
    ).toString();
  }
}

export async function renderSavedTasks() {
  try {
    const tasks: ITask[] = await retrieveRecords(getEmail());

    globalThis.tasks = tasks;
    renderTableInfo();

    tasks.forEach((task) => {
      renderNewTask(task);
    });

    if (tasks.length === 0) {
      handleEmptyRoot();
    }

    if (tasks.length === 9) {
      toggledisableForm(true);
    }
  } catch (error) {
    renderTemporaryError('Error during retrieving the saved tasks');
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
    handleEmptyRoot();
  }
}

export function listenToDateCheck() {
  const dataCheckEl = root?.querySelector(
    '#inputCheckboxDate'
  ) as HTMLInputElement;

  dataCheckEl.addEventListener('change', (event) => {
    toggleDateDisabled(dataCheckEl);
  });
}

export function toggleDateDisabled(dateCheckEl: HTMLInputElement) {
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

export function toggledisableForm(value: boolean) {
  const {
    titleEl,
    descEl,

    categoryEl,
    addBtn,
    cancelBtn,
  } = selectFormParts();

  const inputs = [titleEl, descEl, categoryEl, addBtn, cancelBtn];

  inputs.forEach((input) => {
    if (input) {
      input.disabled = value;
    }
  });
}

export function toggleDisableAddBtn() {
  const { titleEl, descEl, categoryEl, addBtn } = selectFormParts();

  if (titleEl.value && descEl.value && categoryEl.value) {
    addBtn.disabled = false;
  } else {
    addBtn.disabled = true;
  }
}

export function toggleDisableCancelBtn() {
  const { titleEl, descEl, dateEl, categoryEl, cancelBtn } = selectFormParts();

  if (titleEl.value || descEl.value || dateEl.value || categoryEl.value) {
    cancelBtn.disabled = false;
  } else {
    cancelBtn.disabled = true;
  }
}

export function handleEmptyRoot() {
  if (!root) {
    return;
  }
  const emptyMessage = root.querySelector('#empty-message');

  if (!globalThis.tasks || globalThis.tasks.length === 0) {
    if (!emptyMessage) {
      const emptyMessageElement = document.createElement('p');
      emptyMessageElement.id = 'empty-message';
      emptyMessageElement.classList.add('empty-message');
      emptyMessageElement.textContent = "You haven't added any task...";
      root.append(emptyMessageElement);
    }
  } else {
    if (emptyMessage) {
      emptyMessage.remove();
    }
  }
}

export function renderTemporaryError(message: string) {
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('temporary__error-message');
  errorMessage.textContent = message;

  root?.appendChild(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, 5000);
}

export function handleSignOutBtn() {
  const signOutBtn = document.querySelector(
    '#signout-btn'
  ) as HTMLButtonElement;
  if (signOutBtn) {
    signOutBtn.addEventListener('click', (event) => {
      handleSignOut();
    });
  }
}

export function clearTaskTable() {
  const taskTable = root?.querySelector('#task-table') as HTMLDivElement;

  if (taskTable) {
    taskTable.innerText = '';
  }
}

export function clearRoot() {
  if (root) {
    root.innerHTML = '';
  }
}
