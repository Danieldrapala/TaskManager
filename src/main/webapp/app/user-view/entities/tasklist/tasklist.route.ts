import { Routes } from '@angular/router';
import { TaskListComponent } from './tasklist.component';



export const taskListRoute: Routes = [
  {
    path: '',
    component: TaskListComponent,
    data: {
      defaultSort: 'id,asc',
    },
  }
];
