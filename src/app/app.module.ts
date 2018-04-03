import {enableProdMode, ErrorHandler} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { ChartModule } from 'angular-highcharts';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { SharedModule } from './shared/shared.module';
import { SHARED_PROVIDE } from './shared/shared';

import { HomeModule } from './home/home.module';
import { StartModule } from './start/start.module';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatDialogModule,
  MatSnackBarModule
} from '@angular/material';

import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';
import { urlApi } from './shared/url.api';
import { GlobalErrorHandler, LoggerService } from './shared';

export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'NotificationHub';
  c.url = urlApi.rootPath;
  c.logging = true;
  // c.executeEventsInZone = true; // optional, default is true
  // c.executeErrorsInZone = false; // optional, default is false
  // c.executeStatusChangeInZone = true; // optional, default is true
  return c;
}

@NgModule({
  exports: [
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class MaterialModule {}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HomeModule,
    SharedModule,
    StartModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SignalRModule.forRoot(createConfig),
    ChartModule,
    MaterialModule,
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }, SHARED_PROVIDE, LoggerService, {provide: ErrorHandler, useClass: GlobalErrorHandler}],
  bootstrap: [AppComponent],
})
export class AppModule { }
