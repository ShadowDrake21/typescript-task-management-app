import { FirebaseError } from 'firebase/app';
import { ITask } from '../models/taskModel';
import { setRecord, removeRecord } from '../services/tasksService';
import {
  formReset,
  patchFormToUpdate,
  selectFormParts,
} from '../utils/formUtils';
import { getEmail } from './authorization';
import {
  clearTaskTable,
  toggledisableForm,
  handleEmptyRoot,
  renderNewTask,
  renderTemporaryError,
  renderTableInfo,
  rerenderTableInfo,
} from './render';
import { v4 as uuidv4 } from 'uuid';

export async function addTask(event: Event): Promise<void> {
  const { titleEl, descEl, dateEl, categoryEl } = selectFormParts();

  const newTask: ITask = {
    id: uuidv4(),
    title: titleEl.value,
    description:
      descEl.value.length > 200
        ? descEl.value.slice(0, 200) + '...'
        : descEl.value,
    category: categoryEl.value,
    status: false,
  };

  if (dateEl && dateEl.value) {
    newTask.date = dateEl.value;
  }

  globalThis.tasks.push(newTask);

  if (globalThis.tasks.length === 9) {
    toggledisableForm(true);
  }

  formReset();

  await setRecord(getEmail(), newTask)
    .then(() => {
      rerenderTableInfo();
      renderNewTask(newTask);
    })
    .catch((err: FirebaseError) => {
      renderTemporaryError(err.message);
    });
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
  const { idEl, titleEl, descEl, dateEl, categoryEl } = selectFormParts();

  if (!idEl || !titleEl || !descEl || !categoryEl) {
    renderTemporaryError('Form elements not found');
    return;
  }

  const idx = globalThis.tasks.findIndex((task) => task.id === idEl.value);

  if (idx !== -1) {
    const previusTask = globalThis.tasks[idx];

    const updatedTask: ITask = {
      id: idEl.value,
      title: titleEl.value,
      description: descEl.value,
      date: dateEl.value,
      category: categoryEl.value,
      status: previusTask.status,
    };

    if (dateEl && dateEl.value) {
      updatedTask.date = dateEl.value;
    }

    globalThis.tasks[idx] = updatedTask;

    clearTaskTable();
    setRecord(getEmail(), updatedTask);
    formReset();

    globalThis.tasks.forEach((task) => {
      renderNewTask(task);
    });
  } else {
    renderTemporaryError('Task not found');
  }
}

export function removeTask(id: string) {
  if (globalThis.tasks.length === 9) {
    toggledisableForm(false);
  }

  globalThis.tasks = globalThis.tasks.filter((task) => task.id !== id);

  removeRecord(getEmail(), id);

  clearTaskTable();
  rerenderTableInfo();
  globalThis.tasks.forEach((task) => {
    renderNewTask(task);
  });
  if (globalThis.tasks.length === 0) {
    handleEmptyRoot();
  }
}

export function toggleTaskCompleteness(id: string) {
  const idx = globalThis.tasks.findIndex((task) => task.id === id);

  if (idx !== -1) {
    let doneTask = globalThis.tasks[idx];
    doneTask = { ...doneTask, status: !doneTask.status };
    globalThis.tasks[idx] = doneTask;
    setRecord(getEmail(), doneTask);
  }
}
