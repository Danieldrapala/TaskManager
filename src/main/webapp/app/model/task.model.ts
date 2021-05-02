import { Card } from "app/board/card.model";
import { User } from "app/entities/user/user.model";

export interface ITask {
    id?: number;
    name?: string;
    description?: string;
    date?: Date | null;
    isCompleted?: boolean | false;
    owner?: User;
    card?:Card;
  }
  
  export class Task implements ITask {
      id?: number;
      name?: string;
      description?: string;
      date?: Date | null;
      isCompleted?: boolean | false;
      owner?: User;
      card?: Card;
    constructor(
      id?: number,
      name?: string,
      description?: string,
      date?: Date | null,
      isCompleted?: boolean | false,
      owner?: User,
      card?: Card
    ) {
      this.id = id;
      this.name = name;
      this.date = date;
      this.description = description;
      this.isCompleted = isCompleted;
      this.owner = owner;
      this.card =  card;
    }
  }
