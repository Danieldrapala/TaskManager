import { Routes } from '@angular/router';
import { BoardComponent } from './board.component';
import { ShowTaskComponent } from './show-task/show-task.component';



export const boardRoute: Routes = [
  {
    path: 'board',
    component: BoardComponent
  },
  {
    path: 'showtask',
    component: ShowTaskComponent
  }
];
