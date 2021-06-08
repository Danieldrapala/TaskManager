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
import { statisticRoute } from '../../user-view/statistics/statistic.route';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md'
import { LineChartComponent } from './linecharttask/line-chart.component';
import { StatisticComponent } from './statistic.component';
import { PieChartComponent } from './piechartStatus/pie-chart.component';
import { PieChartColumnComponent } from './piechartColumns/pie-chart.component';
import { PieChartUsersComponent } from './piechartUsers/pie-chart.component';
import { MatSelectModule } from '@angular/material/select';
import { ChartsService } from 'app/services/charts.service';
import { LineChartUserComponent } from './linechartusers/line-chart-user.component';

@NgModule({
  providers: [ ChartsService, BsModalService, BsDatepickerConfig],
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
    RouterModule.forChild(statisticRoute), 
    DragDropModule,
    BrowserModule,
    ReactiveFormsModule,
    MatSelectModule,
    ChartsModule,
    WavesModule,
    ModalModule.forRoot()
  ],
  declarations: [
    StatisticComponent, LineChartComponent, PieChartComponent,PieChartColumnComponent, PieChartUsersComponent, LineChartUserComponent
  ]})
export class StatisticModule {}
