import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'teammates',
        loadChildren: () => import('./../teamlist/teamlist.module').then(m => m.TeamListModule),
      },
      {
        path: 'tasks',
        loadChildren: () => import('./../task/task.module').then(m => m.TaskModule),
      },
      {
        path: 'boards',
        loadChildren: () => import('./../board/board.module').then(m => m.BoardModule),
      },
    ]),
  ],
})
export class EntityRoutingModule {}
