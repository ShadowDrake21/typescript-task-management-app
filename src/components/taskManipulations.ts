import { ITask } from '../models/taskModel';
import { patchFormToUpdate } from '../utils/formUtils';
import { clearTaskTable, renderNewTask } from './render';
import { v4 as uuidv4 } from 'uuid';

export function addTask(event: Event): void {
  const target = event.target as HTMLFormElement;
  const titleEl = target.querySelector('#input-title') as HTMLInputElement;
  const descriptionEl = target.querySelector('#input-desc') as HTMLInputElement;
  const dateEl = target.querySelector('#input-date') as HTMLInputElement;
  const categoryEl = target.querySelector(
    '#input-category'
  ) as HTMLInputElement;

  let newTask: ITask;
  if (dateEl.value) {
    newTask = {
      id: uuidv4(),
      title: titleEl.value,
      description: descriptionEl.value,
      date: dateEl.value,
      category: categoryEl.value,
    };
  } else {
    newTask = {
      id: uuidv4(),
      title: titleEl.value,
      description: descriptionEl.value,
      category: categoryEl.value,
    };
  }

  globalThis.tasks.push(newTask);

  renderNewTask(newTask);
}

export function preparationsToUpdateTask(id: string) {
  const taskToUpdate = globalThis.tasks.find((task) => task.id === id);

  if (taskToUpdate) {
    patchFormToUpdate(taskToUpdate);

    const formBtn = document.querySelector(
      '#task-manager__form-btn'
    ) as HTMLButtonElement;
    formBtn.textContent = 'Edit task';
  }
}

export function updateTask(event: Event): void {
  const target = event.target as HTMLFormElement;
  const id = target.querySelector('#input-id') as HTMLInputElement;
  const titleEl = target.querySelector('#input-title') as HTMLInputElement;
  const descriptionEl = target.querySelector('#input-desc') as HTMLInputElement;
  const dateEl = target.querySelector('#input-date') as HTMLInputElement;
  const categoryEl = target.querySelector(
    '#input-category'
  ) as HTMLInputElement;

  let updatedTaskEl: ITask;
  if (dateEl.value) {
    updatedTaskEl = {
      id: id.value,
      title: titleEl.value,
      description: descriptionEl.value,
      date: dateEl.value,
      category: categoryEl.value,
    };
  } else {
    updatedTaskEl = {
      id: id.value,
      title: titleEl.value,
      description: descriptionEl.value,
      category: categoryEl.value,
    };
  }

  const idx = globalThis.tasks.findIndex(
    (task) => task.id === updatedTaskEl.id
  );

  if (idx) {
    globalThis.tasks[idx] = updatedTaskEl;
  }

  renderNewTask(newTask);
}

export function removeTask(id: string) {
  console.log('before', globalThis.tasks);
  globalThis.tasks = globalThis.tasks.filter((task) => task.id !== id);

  console.log('after', globalThis.tasks);

  clearTaskTable();
  globalThis.tasks.forEach((task) => {
    renderNewTask(task);
  });
}
