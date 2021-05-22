import { User } from "app/admin/user-management/user-management.model";
import { Account } from "app/core/auth/account.model";

export interface ITask {
    id?: number;
    name?: string;
    description?: string;
    date?: Date | null;
    isCompleted?: boolean | false;
    owner?: number;
    assignedTo?: number ;
    card?:number;
  }
  
  export class Task implements ITask {
      id?: number;
      name?: string;
      description?: string;
      date?: Date | null;
      isCompleted?: boolean | false;
      owner?: number;
      assignedTo?: number ;

      card?: number;
    constructor(
      id?: number,
      name?: string,
      description?: string,
      date?: Date | null,
      isCompleted?: boolean | false,
      owner?: number,
      assignedTo?: number ,
      card?: number
    ) {
      this.id = id;
      this.name = name;
      this.date = date;
      this.description = description;
      this.isCompleted = isCompleted;
      this.owner = owner;
      this.card =  card;
      this.assignedTo = assignedTo;
    }
  }
