import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TerminalsComponent } from './terminals/terminals.component';
import { TerminalsReportComponent } from './terminals/terminals-report/terminals-report.component';

import { ReportLoggingComponent } from './report-logging/report-logging.component';


import { StartComponent } from './start.component';
import {
  TerminalItemComponent,

  CollectionComponent,
  CollectionReportComponent,

  EventsComponent,
  EventsStatsComponent,
  EventsReportComponent,

  IngridientsComponent,
  IngridientsReportComponent,

  ProductsComponent,
  ProductsReportComponent,

  SellsComponent,
  SellsReportComponent

} from './terminals/terminal-item';

const startRoutes: Routes = [
    {
      path: 'start',
      component: StartComponent,
      children: [
        {
          path: '',
          component: TerminalsComponent
        },
        {
          path: 'terminals',
          component: TerminalsComponent,
        },
        {
          path: 'terminal-item',
          component: TerminalItemComponent,
          children: [
            {
              path: '',
              component: SellsComponent,
            },
            {
              path: 'collection',
              component: CollectionComponent,
            },

            {
              path: 'events',
              component: EventsComponent,
            },

            {
              path: 'events/stats',
              component: EventsStatsComponent,
            },
            {
              path: 'ingridients',
              component: IngridientsComponent,
            },

            {
              path: 'products',
              component: ProductsComponent,
            },

            {
              path: 'sells',
              component: SellsComponent,
            },

          ]
        }
      ],
    },
    {
      path: 'start/terminals/report',
      component: TerminalsReportComponent,
    },
    {
      path: 'start/terminal-item/products/report/:Pk',
      component: ProductsReportComponent,
    },
    {
      path: 'start/terminal-item/ingridients/report',
      component: IngridientsReportComponent,
    },
    {
      path: 'start/terminal-item/events/report',
      component: EventsReportComponent,
    },
    {
      path: 'start/terminal-item/collection/report',
      component: CollectionReportComponent,
    },
    {
      path: 'start/terminal-item/sells/report',
      component: SellsReportComponent,
    },
    {
      path: 'start/logging',
      component: ReportLoggingComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(startRoutes)],
  exports: [RouterModule]
})
export class StartRoutingModule { }
