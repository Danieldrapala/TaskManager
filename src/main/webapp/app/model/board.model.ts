import { ThrowStmt } from '@angular/compiler';
import { Card } from './card.model';

export class Board implements IBoard {
    id?: number;
    name?: string;
    count?: number;
    defaultCard?: number;
    closingCard?: number;
    constructor( id?: number,  name?: string,  count?: number,  defaultCard?: number,  closingCard?: number) {
        this.id = id;
        this.name = name;
        this.count = count;
        this.defaultCard = defaultCard;
        this.closingCard = closingCard;
    }

    
}

export interface IBoard {
    id?:number;
    name?: string;
    count?: number;
    defaultCard?: number;
    closingCard?: number
}