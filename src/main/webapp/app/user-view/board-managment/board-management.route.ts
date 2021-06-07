import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { BoardManagmentComponent } from './board-managment.component';


@Injectable({ providedIn: 'root' })
export class BoardManagementResolve {
  constructor() {}


}

export const boardManagementRoute: Routes = [
  {
    path: '',
    component: BoardManagmentComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },
 
];
