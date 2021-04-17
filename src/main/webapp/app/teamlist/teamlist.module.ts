import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { TeamListComponent } from './teamlist.component';
import { teamListRoute } from './teamlist.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(teamListRoute)],
  declarations: [
    TeamListComponent
  ]})
export class TeamListModule {}
