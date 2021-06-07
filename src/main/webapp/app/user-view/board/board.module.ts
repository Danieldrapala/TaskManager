import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { boardRoute } from './board.route';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BoardService } from 'app/services/board.service';
import { BoardComponent } from './board.component';
import { BoardCreationComponent } from '../board-creation/board-creation.component';

@NgModule({
  providers: [BoardService, BsModalService,BsDatepickerConfig],
  imports: [
    FormsModule,
    SharedModule, 
    RouterModule.forChild(boardRoute), 
    DragDropModule,
    BrowserModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  declarations: [
    BoardComponent, BoardCreationComponent
  ]})
export class BoardModule {}
