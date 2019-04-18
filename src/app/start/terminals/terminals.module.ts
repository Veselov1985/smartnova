import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { TerminalsComponent } from './terminals.component';
import { TerminalItemModule } from './terminal-item/terminal-item.module';
import { TerminalsRoutingModule } from './terminals-routing.module';
import { TerminalsReportComponent } from './terminals-report/terminals-report.component';
import {DialogTerminalsComponent} from './dialog-terminals/dialog-terminals.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    SharedModule,
    TerminalItemModule,
    TerminalsRoutingModule,
  ],
  declarations: [DialogTerminalsComponent],
  exports: [DialogTerminalsComponent],
  entryComponents: [DialogTerminalsComponent]
})
export class TerminalsModule { }
