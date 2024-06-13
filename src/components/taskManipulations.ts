import { ITask } from '../models/taskModel';
import { renderNewTask } from './render';

export function addTask(event: Event): void {
  const target = event.target as HTMLFormElement;
  const titleEl = target.querySelector('#input-title') as HTMLInputElement;
  const descriptionEl = target.querySelector('#input-desc') as HTMLInputElement;
  const dateEl = target.querySelector('#input-date') as HTMLInputElement;
  const categoryEl = target.querySelector(
    '#input-category'
  ) as HTMLInputElement;

  const newTask: ITask = {
    title: titleEl.value,
    description: descriptionEl.value,
    date: dateEl.value,
    category: categoryEl.value,
  };

  renderNewTask(newTask);
}
