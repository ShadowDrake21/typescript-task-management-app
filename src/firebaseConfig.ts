import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDwSvXdlo8YGrq4bLnFu5uI-I2ULS8p2g8',
  authDomain: 'ts-task-management-app.firebaseapp.com',
  projectId: 'ts-task-management-app',
  storageBucket: 'ts-task-management-app.appspot.com',
  messagingSenderId: '348961063146',
  appId: '1:348961063146:web:304320d2759438eb7bd793',
};

const app = initializeApp(firebaseConfig);

export default app;
