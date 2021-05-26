import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowTaskComponent } from './show-task.component';
import { TaskService } from '../services/task.service';

@NgModule({
  providers: [TaskService],
  imports: [
    FormsModule,
    SharedModule, 
    DragDropModule,
    BrowserModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  declarations: [
    ShowTaskComponent
  ]})
export class ShowTaskModule {}
