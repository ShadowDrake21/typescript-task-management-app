import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import app from '../firebaseConfig';
import { ITask } from '../models/taskModel';

const db = getFirestore(app);

export async function retrieveRecords(email: string): Promise<ITask[]> {
  const querySnapshot = await getDocs(collection(db, `${email}`));
  let tasksArray: ITask[] = [];
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);

    const newTask: ITask = doc.data() as ITask;
    tasksArray.push(newTask);
  });

  return tasksArray;
}

export async function setRecord(email: string, data: ITask) {
  try {
    await setDoc(doc(collection(db, `${email}/`), data.id), data);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function removeRecord(email: string, id: string) {
  await deleteDoc(doc(db, `${email}/`, id));
}
