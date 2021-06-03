import { Account } from "app/core/auth/account.model";

export class Comment implements IComment {
    id?:number;
    description?: string;
    createdOn?: Date;
    createdBy?: Account;
    taskId?: number;
    constructor( id?: number,  description?: string,  createdOn?: Date,  createdBy?: Account, taskId?: number) {}
}

export interface IComment {
    id?:number;
    description?: string;
    createdOn?: Date;
    createdBy?: Account;
    taskId?: number;
}