import { setDateDisabled } from '../components/render';
import {
  removeTask,
  preparationsToUpdateTask,
} from '../components/taskManipulations';
import { ITask } from '../models/taskModel';

export function createNewTaskElement(newTask: ITask): HTMLDivElement {
  const taskDiv = document.createElement('div');
  taskDiv.id = newTask.id;
  taskDiv.innerHTML = `
  <h3>${newTask.title}</h3>
  <p>${newTask.description}</p>
  <span>${newTask.date}</span>
  <p>${newTask.category}</p>
  `;

  const removeBtn = document.createElement('btn');
  removeBtn.classList.add('btn', 'btn-danger');
  removeBtn.textContent = 'Remove';

  removeBtn.addEventListener('click', (event) => {
    removeTask(newTask.id);
  });

  taskDiv.append(removeBtn);

  const updateBtn = document.createElement('btn');
  updateBtn.classList.add('btn', 'btn-primary');
  updateBtn.textContent = 'Update';

  updateBtn.addEventListener('click', (event) => {
    preparationsToUpdateTask(newTask.id);
  });

  taskDiv.append(updateBtn);
  return taskDiv;
}

export function patchFormToUpdate(task: ITask) {
  const formEl = document.querySelector('#task-form');

  if (formEl) {
    const idEl = formEl.querySelector('#input-id') as HTMLInputElement;
    idEl.value = task.id;
    const titleEl = formEl.querySelector('#input-title') as HTMLInputElement;
    titleEl.value = task.title;
    const descEl = formEl.querySelector('#input-desc') as HTMLInputElement;
    descEl.value = task.description;
    const dateLabelEl = formEl.querySelector(
      '#inputCheckboxDate'
    ) as HTMLInputElement;
    const dateEl = formEl.querySelector('#input-date') as HTMLInputElement;

    if (task.date) {
      dateEl.valueAsDate = new Date(task.date);
    } else {
      dateLabelEl.checked = false;
      setDateDisabled(dateLabelEl);
    }

    const categoryEl = formEl.querySelector(
      '#input-category'
    ) as HTMLInputElement;
    categoryEl.value = task.category;
  }
}
