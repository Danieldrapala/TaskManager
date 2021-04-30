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
      id?: number;
      name?: string;
      description?: string;
      date?: Date | null;
      isCompleted?: boolean | false;
      owner?: User;
    constructor(
      id?: number,
      name?: string,
      description?: string,
      date?: Date | null,
      isCompleted?: boolean | false,
      owner?: User,
    ) {
      this.id = id;
      this.name = name;
      this.date = date;
      this.description = description;
      this.isCompleted = isCompleted;
      this.owner = owner;
    }
  }
