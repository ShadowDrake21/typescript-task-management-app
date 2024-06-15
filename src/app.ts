import { checkTimeLegit, clearAuthData } from './components/authorization';
import { renderAuthorization, renderForm } from './components/render';
import { removeFromLS, retrieveFromLS } from './utils/localStorageUtils';

export function startApp() {
  console.log('Application started!');

  // renderForm();

  if (retrieveFromLS('user') && checkTimeLegit()) {
    globalThis.tasks = [];
    renderForm();
  } else {
    clearAuthData();
    renderAuthorization();
  }
}
