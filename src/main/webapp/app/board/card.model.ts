import { Task } from "app/model/task.model";

export class Card implements ICard{

    id?:number;
    name?: string;
    tasks: Task[];

    constructor(  tasks: Task[],id?: number ,  name?: string ) {
            this.id = id;
            this.name = name;
            this.tasks = tasks;
    }
}


export interface ICard {
    id?: number;
    name?:string;
    tasks: Task[];


}