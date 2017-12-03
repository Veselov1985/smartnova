import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';

import { StartRoutingModule, StartComponent } from './start';

// import { START_LAYOUT_COMPONENT } from './layout/layout';
import { START_COMPONENT } from './start';
import { DataFilterPipe } from '../shared/shared';

import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from './layout/layout.module';

import { TerminalTabsModule } from './layout/terminal-tabs/terminal-tabs.module';
import {
  GetBarDataService,
  GetChartLineService,
  ChartMainService,

  GetTerminalsService,
  GetTerminalCollectionService,
  GetTerminalEventsService,
  GetTerminalIngridientsService,
  GetTerminalSellsService,
  GetTerminalProductsService,
  GetEventsStatsService,
} from '../shared';

import { ProdictIngredientsComponent } from './terminals/terminal-item/products/prodict-ingredients/prodict-ingredients.component';
import { ReportLoggingComponent } from './report-logging/report-logging.component';

import { DateTimePickerModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {DndModule} from 'ng2-dnd';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    LayoutModule,
    DndModule.forRoot(),

    StartRoutingModule,
    TerminalTabsModule,

    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    StartRoutingModule,
    // ChartModule.forRoot(Highcharts),
    DataTableModule,
    DateTimePickerModule,
    BrowserAnimationsModule
  ],
  declarations: [
    START_COMPONENT,
    ProdictIngredientsComponent,
    ReportLoggingComponent
  ],
  providers: [
    GetBarDataService,
    GetChartLineService,
    ChartMainService,

    GetTerminalsService,
    GetTerminalCollectionService,
    GetTerminalEventsService,
    GetTerminalIngridientsService,
    GetTerminalSellsService,
    GetTerminalProductsService,
    GetEventsStatsService
  ],
  exports: [DataTableModule, START_COMPONENT, ProdictIngredientsComponent, ReportLoggingComponent],
  entryComponents: [ProdictIngredientsComponent],
})

export class StartModule { }
