import { Card } from './card.model';

export class Board implements IBoard {
    constructor(public id: number, public name: string, public count: number, public defaultCard: number, public closingCard: number) {}
}

export interface IBoard {
    id:number;
    name: string;
    count: number;
    defaultCard: number;
    closingCard: number
}