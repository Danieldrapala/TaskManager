import { Task } from "app/model/task.model";

export class Card implements ICard{
    constructor(public id: number, public name: string, public tasks: Task[]) {}
}


export interface ICard {
    id: number;
    name:string;
    tasks: Task[];


}