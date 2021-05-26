import { Card } from './card.model';

export class Board implements IBoard {
    constructor(public id: number, public name: string, public count: number) {}
}

export interface IBoard {
    id:number;
    name: string;
    count: number;
}