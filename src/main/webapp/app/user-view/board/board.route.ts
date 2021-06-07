import { Routes } from '@angular/router';
import { BoardCreationComponent } from '../board-creation/board-creation.component';
import { ShowTaskComponent } from '../show-task/show-task.component';
import { BoardComponent } from './board.component';


export const boardRoute: Routes = [
  {
    path: 'board',
    component: BoardComponent
  },
  {
    path: 'showtask/:id',
    component: ShowTaskComponent
    
  },
  {
    path: 'addboard',
    component: BoardCreationComponent
  },
];
