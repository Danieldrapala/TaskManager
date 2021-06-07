import { Task } from "app/model/task.model";

export class Card implements ICard{

    id?:number;
    name?: string;
    priority?: number;
    board?:number
    tasks: Task[];

    constructor(  tasks: Task[],id?: number , priority?: number, board?:number, name?: string ) {
            this.id = id;
            this.priority = priority;
            this.name = name;
            this.tasks = tasks;
            this.board = board;
    }
}

export class CardForTask{

    id?:number;
    name?: string;

    constructor(  id?: number ,  name?: string ) {
            this.id = id;
            this.name = name;
    }
}


export interface ICard {
    id?: number;
    name?:string;
    tasks: Task[];
    priority?: number;


}