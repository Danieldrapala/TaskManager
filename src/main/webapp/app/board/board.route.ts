import { Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { BoardComponent } from './board.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { ShowTaskComponent } from './show-task/show-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';



export const boardRoute: Routes = [
  {
    path: 'board',
    component: BoardComponent
  },
  {
    path: 'addtask',
    component: AddTaskComponent
  },
  {
    path: 'deletetask',
    component: DeleteTaskComponent
  },
  {
    path: 'updatetask',
    component: UpdateTaskComponent
  },
  {
    path: 'showtask',
    component: ShowTaskComponent
  }
];
