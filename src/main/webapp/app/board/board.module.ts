import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { BoardComponent } from './board.component';
import { boardRoute } from './board.route';


@NgModule({
  imports: [SharedModule, RouterModule.forChild(boardRoute),DragDropModule],
  declarations: [
    BoardComponent
  ]})
export class BoardModule {}
