import { User } from 'firebase/auth';
import { authorize, signOut } from '../services/authService';
import {
  removeFromLS,
  retrieveFromLS,
  saveToLS,
} from '../utils/localStorageUtils';
import { clearRoot, renderAuthorization, renderForm } from './render';

export function checkTimeLegit() {
  const expireTime = retrieveFromLS('expireTime') as string;
  return new Date() < new Date(expireTime);
}

export async function handleAuthorization() {
  const root = document.querySelector('#root');

  if (root) {
    const googleBtn = root.querySelector('.google-btn');
    googleBtn?.classList.add('d-none');

    const loader = document.createElement('div');
    loader.classList.add('loader', 'auth-loader');
    root.appendChild(loader);

    try {
      const user = await authorize();
      saveToLS('user', user);

      const lastSignInTime = new Date(user.metadata.lastSignInTime!);
      const expireSignInTime = new Date(
        lastSignInTime.getTime() + 3600000
      ).toUTCString();

      loader.remove();
      saveToLS('expireTime', expireSignInTime);

      clearRoot();
      renderForm();
    } catch (error: any) {
      loader.remove();

      const errorMessageElement = document.createElement('p');
      errorMessageElement.classList.add('auth-error__message');

      errorMessageElement.textContent = error.message;
      root.append(errorMessageElement);

      setTimeout(() => {
        googleBtn?.classList.remove('d-none');
        errorMessageElement.remove();
      }, 5000);
    }
  }
}

export function getEmail() {
  const user = retrieveFromLS('user') as User;

  return user.email ?? 'unknown';
}

export function clearAuthData() {
  removeFromLS('user');
  removeFromLS('expireTime');
}

export function handleSignOut() {
  signOut();
  clearRoot();
  clearAuthData();
  renderAuthorization();
}
