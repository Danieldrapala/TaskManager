import { User } from "app/entities/user/user.model";

export interface ITask {
    id?: number;
    description?: string;
    createdBy?: User | null;
    created?: Date | null;
    user?: User;

  }
  
  export class Task implements ITask {
    constructor(
      id?: number,
      description?: string,
      user?: User
    ) {}
  }
  