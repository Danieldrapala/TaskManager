import { User } from "app/entities/user/user.model";

export interface ITask {
    id?: number;
    name?: string;
    description?: string;
    date?: Date | null;
    isCompleted?: boolean | false;
    owner?: User;

  }
  
  export class Task implements ITask {
    constructor(
      id?: number,
      name?: string,
      description?: string,
      date?: Date | null,
      isCompleted?: boolean | false,
      owner?: User,
    ) {}
  }
