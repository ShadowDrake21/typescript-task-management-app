import { renderForm } from './components/render';

export function startApp() {
  console.log('Application started!');

  globalThis.tasks = [];
  renderForm();
}
