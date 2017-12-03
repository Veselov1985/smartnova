import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, RouterLinkActive } from '@angular/router';

 import {
    HeaderStartComponent,
    PieChartComponent,
    TerminalIndicatorComponent,
 } from '../layout';

import { SidebarStartModule } from './sidebar-start/sidebar-start.module';
import { TerminalTabsModule } from './terminal-tabs/terminal-tabs.module';
import { MainChartModule } from './main-chart/main-chart.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TerminalTabsModule,
    SidebarStartModule,
    MainChartModule

  ],
  declarations: [
    HeaderStartComponent,
    PieChartComponent,
    TerminalIndicatorComponent,
  ],
  exports: [
    HeaderStartComponent,
    PieChartComponent,
    TerminalIndicatorComponent,
    TerminalTabsModule,
    SidebarStartModule,
    TerminalTabsModule,
    MainChartModule,
  ]
})
export class LayoutModule { }
