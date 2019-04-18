import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTableModule} from 'angular2-datatable';
import {HttpModule} from '@angular/http';
// import { START_LAYOUT_COMPONENT } from './layout/layout';
import {START_COMPONENT, StartRoutingModule} from './start';
import {
  MultiFilterCollectPipe,
  MultiFilterEventsPipe,
  MultiFilterIngredientsPipe,
  MultiFilterProductsPipe,
  MultiFilterSellsPipe
} from '../shared/shared';
import {SharedModule} from '../shared/shared.module';
import {LayoutModule} from './layout/layout.module';
import {TerminalTabsModule} from './layout/terminal-tabs/terminal-tabs.module';
import {
  ChartMainService,
  GetBarDataService,
  GetChartLineService,
  GetEventsStatsService,
  GetTerminalCollectionService,
  GetTerminalEventsService,
  GetTerminalIngridientsService,
  GetTerminalProductsService,
  GetTerminalSellsService,
  GetTerminalsService,
} from '../shared';
import {ProdictIngredientsComponent} from './terminals/terminal-item/products/prodict-ingredients/prodict-ingredients.component';
import {ReportLoggingComponent} from './report-logging/report-logging.component';
import {DateTimePickerModule} from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DndModule} from 'ng2-dnd';
import {CollectionResolver} from './../shared/resolvers/collection.resolver';
import {EventsResolver} from '../shared/resolvers/events.resolver';
import {EventsStatsResolver} from './../shared/resolvers/events-stats.resolver';
import {IngredientsResolver} from '../shared/resolvers/ingredients.resolver';
import {SettingsService} from './../shared/services/common/settings.service';
import {SignalRResolver} from '../shared/resolvers/signalR.resolver';
import {ReportLoggingResolver} from './../shared/resolvers/report-logging.resolver';
import {GetProductIngredientsService} from '../shared/services/terminals/get-product-ingredients.service';
import {AdminModule} from './admin/admin.module';
import {DialogTerminalsComponent} from './terminals/dialog-terminals/dialog-terminals.component';
import {MatDialogModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    // RouterModule,
    SharedModule,
    LayoutModule,
    DndModule.forRoot(),
    StartRoutingModule,
    TerminalTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // ChartModule.forRoot(Highcharts),
    DataTableModule,
    DateTimePickerModule,
    BrowserAnimationsModule,
    AdminModule,
    MatDialogModule,
  ],
  declarations: [
    START_COMPONENT,
    ProdictIngredientsComponent,
    ReportLoggingComponent,
    DialogTerminalsComponent,
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
    GetEventsStatsService,
    MultiFilterEventsPipe,
    MultiFilterSellsPipe,
    MultiFilterProductsPipe,
    MultiFilterCollectPipe,
    MultiFilterIngredientsPipe,
    EventsResolver,
    EventsStatsResolver,
    CollectionResolver,
    IngredientsResolver,
    SettingsService,
    SignalRResolver,
    ReportLoggingResolver,
    GetProductIngredientsService
  ],
  exports: [DataTableModule,
    START_COMPONENT,
    ProdictIngredientsComponent,
    ReportLoggingComponent,
    DialogTerminalsComponent,
  ],
  entryComponents: [
    ProdictIngredientsComponent,
    DialogTerminalsComponent],
})

export class StartModule {
}
