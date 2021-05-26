import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ChartsComponent } from './charts.component';
import { chartRoute } from './charts.route';
import { ChartsService } from '../services/charts.service';

@NgModule({
  providers: [ChartsService, BsModalService,BsDatepickerConfig],
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
    RouterModule.forChild(chartRoute), 
    DragDropModule,
    BrowserModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  declarations: [
    ChartsComponent
  ]})
export class ChartsModule {}
