import { Routes } from '@angular/router';
import { ShowTaskComponent } from 'app/show-task/show-task.component';
import { BoardComponent } from './board.component';



export const boardRoute: Routes = [
  {
    path: 'board',
    component: BoardComponent
  },
  {
    path: 'showtask/:id',
    component: ShowTaskComponent
    
  }
];
