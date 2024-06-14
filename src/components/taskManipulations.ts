import { ITask } from '../models/taskModel';
import { formReset, patchFormToUpdate } from '../utils/formUtils';
import { clearTaskTable, disableForm, renderNewTask } from './render';
import { v4 as uuidv4 } from 'uuid';

export function addTask(event: Event): void {
  const target = event.target as HTMLFormElement;
  const titleEl = target.querySelector('#input-title') as HTMLInputElement;
  const descriptionEl = target.querySelector('#input-desc') as HTMLInputElement;
  const dateEl = target.querySelector('#input-date') as HTMLInputElement;
  const categoryEl = target.querySelector(
    '#input-category'
  ) as HTMLInputElement;

  const newTask: ITask = {
    id: uuidv4(),
    title: titleEl.value,
    description:
      descriptionEl.value.length > 300
        ? descriptionEl.value.slice(0, 300) + '...'
        : descriptionEl.value,
    category: categoryEl.value,
    status: false,
  };

  if (dateEl && dateEl.value) {
    newTask.date = dateEl.value;
  }

  globalThis.tasks.push(newTask);
  formReset();
  renderNewTask(newTask);

  if (globalThis.tasks.length === 9) {
    disableForm();
  }
}

export function preparationsToUpdateTask(id: string) {
  const taskToUpdate = globalThis.tasks.find((task) => task.id === id);

  if (taskToUpdate) {
    patchFormToUpdate(taskToUpdate);

    const formBtn = document.querySelector('#form-add') as HTMLButtonElement;
    formBtn.innerHTML =
      'Edit task<i class="material-icons right ms-2">edit</i>';
  }
}

export function updateTask(event: Event): void {
  const target = event.target as HTMLFormElement;
  const idEl = target.querySelector('#input-id') as HTMLInputElement;
  const titleEl = target.querySelector('#input-title') as HTMLInputElement;
  const descriptionEl = target.querySelector('#input-desc') as HTMLInputElement;
  const dateEl = target.querySelector('#input-date') as HTMLInputElement;
  const categoryEl = target.querySelector(
    '#input-category'
  ) as HTMLInputElement;

  if (!idEl || !titleEl || !descriptionEl || !categoryEl) {
    console.error('Form elements not found');
    return;
  }

  const idx = globalThis.tasks.findIndex((task) => task.id === idEl.value);

  if (idx !== -1) {
    const previusTask = globalThis.tasks[idx];

    const updatedTask: ITask = {
      id: idEl.value,
      title: titleEl.value,
      description: descriptionEl.value,
      date: dateEl.value,
      category: categoryEl.value,
      status: previusTask.status,
    };

    if (dateEl && dateEl.value) {
      updatedTask.date = dateEl.value;
    }

    globalThis.tasks[idx] = updatedTask;

    clearTaskTable();
    formReset();

    globalThis.tasks.forEach((task) => {
      renderNewTask(task);
    });
  } else {
    console.log('Task not found');
  }
}

export function removeTask(id: string) {
  globalThis.tasks = globalThis.tasks.filter((task) => task.id !== id);

  clearTaskTable();
  globalThis.tasks.forEach((task) => {
    renderNewTask(task);
  });
}

export function toggleTaskCompleteness(id: string) {
  const idx = globalThis.tasks.findIndex((task) => task.id === id);

  if (idx !== -1) {
    let doneTask = globalThis.tasks[idx];
    globalThis.tasks[idx] = { ...doneTask, status: !doneTask.status };
  }
}
