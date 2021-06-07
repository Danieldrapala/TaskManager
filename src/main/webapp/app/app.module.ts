import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import locale from '@angular/common/locales/pl';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { NgxWebstorageModule } from 'ngx-webstorage';
import * as dayjs from 'dayjs';
import { NgbDatepickerConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SERVER_API_URL } from './app.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import './config/dayjs';
import { SharedModule } from 'app/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { EntityRoutingModule } from './user-view/entities/entity-routing.module';
import { fontAwesomeIcons } from './config/font-awesome-icons';
import { httpInterceptorProviders } from 'app/core/interceptor/index';
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import {  MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule, MatDateSelectionModel } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { ShowTaskModule } from './user-view/show-task/showtask.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BoardManagmentComponent } from './user-view/board-managment/board-managment.component';
import { MatInputModule } from '@angular/material/input';
import { StatisticModule } from './user-view/statistics/statistic.module';
import { BoardModule } from './user-view/board/board.module';


@NgModule({
  imports: [
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    BrowserModule,
    SharedModule,
    EntityRoutingModule,
    StatisticModule,
    BoardModule,
    ShowTaskModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    FormsModule,
    NgbModule,
    MDBBootstrapModule.forRoot()

    ],
  providers: [
    Title,
    { provide: LOCALE_ID, useValue: 'pl' },
    httpInterceptorProviders,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent, BoardManagmentComponent],
  bootstrap: [MainComponent],
})
export class AppModule {
  constructor(applicationConfigService: ApplicationConfigService, iconLibrary: FaIconLibrary, dpConfig: NgbDatepickerConfig) {
    applicationConfigService.setEndpointPrefix(SERVER_API_URL);
    registerLocaleData(locale);
    iconLibrary.addIcons(...fontAwesomeIcons);
    dpConfig.minDate = { year: dayjs().subtract(100, 'year').year(), month: 1, day: 1 };
  }
}
