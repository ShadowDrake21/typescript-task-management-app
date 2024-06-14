import { toggleDateDisabled } from '../components/render';
import {
  removeTask,
  preparationsToUpdateTask,
  toggleTaskCompleteness,
} from '../components/taskManipulations';
import { ITask } from '../models/taskModel';

export function createNewTaskElement(newTask: ITask): HTMLDivElement {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add(
    'single-task',
    'd-flex',
    'p-3',
    'text-dark',
    'mt-3',
    'mb-3'
  );
  taskDiv.id = newTask.id;

  const taskContent = document.createElement('div');
  taskContent.classList.add(
    'single-task__inner',
    'w-100',
    'd-flex',
    'flex-column'
  );

  const taskTitle = document.createElement('h3');
  taskTitle.classList.add('single-task__title');
  taskTitle.textContent = newTask.title;

  const taskDesc = document.createElement('p');
  taskDesc.classList.add('single-task__desc', 'mb-0', 'pb-2');
  taskDesc.textContent = newTask.description;

  const taskDate = document.createElement('div');
  taskDate.classList.add('single-task__date');

  taskDate.innerHTML = `<span class="fw-bold">Date: </span>${newTask.date || 'The task does not have any time bounderies'}`;

  const taskCategory = document.createElement('div');
  taskCategory.classList.add('single-task__cateogory');
  taskCategory.innerHTML = `<span class="fw-bold">Category: </span>${newTask.category}`;

  const taskStatus = document.createElement('p');
  taskStatus.classList.add('single-task__status');
  taskStatus.textContent = newTask.status ? 'complete' : 'incomplete';

  if (newTask.status) {
    taskTitle.classList.add('complete');
    taskStatus.classList.add('task-complete');
  } else {
    taskStatus.classList.add('task-incomplete');
  }

  const taskBtns = document.createElement('div');
  taskBtns.classList.add('single-task__btns');

  const removeBtn = document.createElement('btn');
  removeBtn.classList.add('btn', 'btn-danger', 'single-task__btn');
  removeBtn.textContent = 'Remove';

  removeBtn.addEventListener('click', (event) => {
    removeTask(newTask.id);
  });

  const updateBtn = document.createElement('btn');
  updateBtn.classList.add('btn', 'btn-primary', 'single-task__btn');
  updateBtn.textContent = 'Update';

  updateBtn.addEventListener('click', (event) => {
    preparationsToUpdateTask(newTask.id);
  });

  const checkDoneBtn = document.createElement('button');
  checkDoneBtn.classList.add('btn', 'btn-success', 'single-task__btn');
  checkDoneBtn.innerHTML = '&#10003;';

  checkDoneBtn.addEventListener('click', (event) => {
    toggleTaskCompleteness(newTask.id);

    newTask.status = !newTask.status;

    if (newTask.status) {
      taskTitle.classList.add('complete');

      taskStatus.classList.remove('task-incomplete');
      taskStatus.classList.add('task-complete');
    } else {
      taskTitle.classList.remove('complete');

      taskStatus.classList.add('task-incomplete');
      taskStatus.classList.remove('task-complete');
    }

    taskStatus.textContent = newTask.status ? 'complete' : 'incomplete';
  });

  taskBtns.append(removeBtn, updateBtn, checkDoneBtn);

  taskContent.append(taskTitle, taskDesc, taskDate, taskCategory, taskStatus);

  taskDiv.append(taskContent, taskBtns);

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
