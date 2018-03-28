import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';

import { TerminalTabsComponent } from './terminal-tabs.component';
import { TerminalTabsRoutingModule } from './terminal-tabs-routing.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TerminalTabsRoutingModule,
  ],
  declarations: [TerminalTabsComponent],
  exports: [TerminalTabsComponent]
})
export class TerminalTabsModule { }
