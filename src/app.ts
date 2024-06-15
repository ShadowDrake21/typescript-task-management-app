import { checkTimeLegit, clearAuthData } from './components/authorization';
import { renderAuthorization, renderForm } from './components/render';
import { removeFromLS, retrieveFromLS } from './utils/localStorageUtils';

export function startApp() {
  console.log('Application started!');

  // globalThis.tasks = [];
  // renderForm();

  if (retrieveFromLS('user') && checkTimeLegit()) {
    renderForm();
  } else {
    clearAuthData();
    renderAuthorization();
  }
}
