import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { BoardComponent } from './board.component';
import { boardRoute } from './board.route';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { BoardService } from './board.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    FormsModule,
    SharedModule, 
    RouterModule.forChild(boardRoute), 
    DragDropModule,
    BrowserModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  declarations: [
    BoardComponent
  ]})
export class BoardModule {}
