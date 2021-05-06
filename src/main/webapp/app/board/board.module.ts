import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { BoardComponent } from './board.component';
import { boardRoute } from './board.route';
import { ShowTaskComponent } from './show-task/show-task.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { BoardService } from './board.service';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@NgModule({
  providers: [BoardService, BsModalService,BsDatepickerConfig],
  imports: [
    BsDatepickerModule.forRoot(),
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    SharedModule, 
    RouterModule.forChild(boardRoute), 
    DragDropModule,
    BrowserModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  declarations: [
    BoardComponent,
    ShowTaskComponent
  ]})
export class BoardModule {}
