import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { boardManagementRoute } from './board-management.route';


@NgModule({
  imports: [SharedModule, RouterModule.forChild(boardManagementRoute)],
  declarations: [
  ],
  entryComponents: [BoardManagementModule],
})
export class BoardManagementModule {}
