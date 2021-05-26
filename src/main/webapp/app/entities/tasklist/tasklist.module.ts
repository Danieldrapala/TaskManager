import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from 'app/shared/shared.module';
import { TaskListComponent } from './tasklist.component';
import { taskListRoute } from './tasklist.route';

@NgModule({
  imports: [
    SharedModule, 
    RouterModule.forChild(taskListRoute),         
    NgbModule
  ],
  declarations: [
    TaskListComponent
  ]})
export class TaskListModule {}
