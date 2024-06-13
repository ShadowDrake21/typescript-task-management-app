import { ITask } from '../models/taskModel';

export function createNewTaskElement(newTask: ITask): HTMLDivElement {
  const taskDiv = document.createElement('div');
  taskDiv.innerHTML = `
  <h3>${newTask.title}</h3>
  <p>${newTask.description}</p>
  <span>${newTask.date}</span>
  <p>${newTask.category}</p>
  `;

  return taskDiv;
}
