import { toggleDateDisabled } from '../components/render';
import {
  removeTask,
  preparationsToUpdateTask,
  toggleTaskCompleteness,
} from '../components/taskManipulations';
import { ITask } from '../models/taskModel';

export function createNewTaskElement(newTask: ITask): HTMLDivElement {
  const taskDiv = document.createElement('div');
  taskDiv.id = newTask.id;

  const taskTitle = document.createElement('h3');
  taskTitle.textContent = newTask.title;

  const taskDesc = document.createElement('p');
  taskDesc.textContent = newTask.description;

  const taskDate = document.createElement('span');
  taskDate.textContent =
    newTask.date || 'The task does not have any time bounderies';

  const taskCategory = document.createElement('p');
  taskCategory.textContent = newTask.category;

  const taskStatus = document.createElement('p');
  taskStatus.textContent = newTask.status ? 'complete' : 'incomplete';

  if (newTask.status) {
    taskTitle.classList.add('complete');
  }

  const removeBtn = document.createElement('btn');
  removeBtn.classList.add('btn', 'btn-danger');
  removeBtn.textContent = 'Remove';

  removeBtn.addEventListener('click', (event) => {
    removeTask(newTask.id);
  });

  const updateBtn = document.createElement('btn');
  updateBtn.classList.add('btn', 'btn-primary');
  updateBtn.textContent = 'Update';

  updateBtn.addEventListener('click', (event) => {
    preparationsToUpdateTask(newTask.id);
  });

  const checkDoneBtn = document.createElement('button');
  checkDoneBtn.classList.add('btn', 'btn-success');
  checkDoneBtn.innerHTML = '&#10003;';

  checkDoneBtn.addEventListener('click', (event) => {
    toggleTaskCompleteness(newTask.id);

    newTask.status = !newTask.status;

    if (newTask.status) {
      taskTitle.classList.add('complete');
    } else {
      taskTitle.classList.remove('complete');
    }

    taskStatus.textContent = newTask.status ? 'complete' : 'incomplete';
  });

  taskDiv.append(
    taskTitle,
    taskDesc,
    taskDate,
    taskCategory,
    taskStatus,
    removeBtn,
    updateBtn,
    checkDoneBtn
  );

  taskDiv.append(removeBtn);
  taskDiv.append(updateBtn);
  taskDiv.append(checkDoneBtn);

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
      dateLabelEl.checked = true;
      toggleDateDisabled(dateLabelEl);
      dateEl.valueAsDate = new Date(task.date);
    } else {
      dateLabelEl.checked = false;
      toggleDateDisabled(dateLabelEl);
    }

    const categoryEl = formEl.querySelector(
      '#input-category'
    ) as HTMLInputElement;
    categoryEl.value = task.category;
  }
}

export function formReset() {
  const formEl = document.querySelector('#task-form');

  if (formEl) {
    const idEl = formEl.querySelector('#input-id') as HTMLInputElement;
    idEl.value = '';
    const titleEl = formEl.querySelector('#input-title') as HTMLInputElement;
    titleEl.value = '';
    const descEl = formEl.querySelector('#input-desc') as HTMLInputElement;
    descEl.value = '';
    const dateLabelEl = formEl.querySelector(
      '#inputCheckboxDate'
    ) as HTMLInputElement;
    const dateEl = formEl.querySelector('#input-date') as HTMLInputElement;

    dateLabelEl.checked = false;
    toggleDateDisabled(dateEl);

    const categoryEl = formEl.querySelector(
      '#input-category'
    ) as HTMLInputElement;
    categoryEl.value = '';

    const btn = formEl.querySelector('#form-add') as HTMLButtonElement;
    btn.innerHTML =
      'Add task<i class="material-icons right ms-2">add_circle</i>';
  }
}
