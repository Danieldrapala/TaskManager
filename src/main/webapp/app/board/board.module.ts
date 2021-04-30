import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { BoardComponent } from './board.component';
import { boardRoute } from './board.route';
import { AddTaskComponent } from './add-task/add-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { ShowTaskComponent } from './show-task/show-task.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { BoardService } from './board.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  providers: [BoardService, BsModalService],
  imports: [
    SharedModule, 
    RouterModule.forChild(boardRoute), 
    DragDropModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  declarations: [
    BoardComponent,
    AddTaskComponent,
    DeleteTaskComponent,
    ShowTaskComponent
  ]})
export class BoardModule {}
