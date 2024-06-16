import { ITask } from '../models/taskModel';

declare global {
  var tasks: ITask[];
}

export {};
