import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { TaskComponent } from './task.component';
import { taskRoute } from './task.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(taskRoute)],
  declarations: [
    TaskComponent
  ]})
export class TaskModule {}
