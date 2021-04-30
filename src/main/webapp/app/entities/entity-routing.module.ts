import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'teammates',
        loadChildren: () => import('./teamlist/teamlist.module').then(m => m.TeamListModule),
      },
      {
        path: 'tasks',
        loadChildren: () => import('./tasklist/tasklist.module').then(m => m.TaskListModule),
      },
      {
        path: '',
        loadChildren: () => import('./../home/home.module').then(m => m.HomeModule),
      },
    ]),
  ],
})
export class EntityRoutingModule {}
