import { User } from "app/admin/user-management/user-management.model";
import { Account } from "app/core/auth/account.model";
import { CardForTask } from "./card.model";
import { UserForUser } from "./user.model";

export interface ITask {
    id?: number;
    name?: string;
    description?: string;
    date?: Date | null;
    completed?: boolean;
    owner?: Account;
    assignedTo?: Account ;
    card?:CardForTask;
  }
  
  export class Task implements ITask {
      id?: number;
      name?: string;
      description?: string;
      date?: Date | null;
      completed?: boolean;
      owner?: Account;
      assignedTo?: Account ;

      card?: CardForTask;
    constructor(
      id?: number,
      name?: string,
      description?: string,
      date?: Date | null,
      completed?: boolean,
      owner?: Account,
      assignedTo?: Account ,
      card?: CardForTask
    ) {
      this.id = id;
      this.name = name;
      this.date = date;
      this.description = description;
      this.completed = completed;
      this.owner = owner;
      this.card =  card;
      this.assignedTo = assignedTo;
    }
  }
