import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';
import { LayoutModule } from '../../layout/layout.module'

import { TerminalItemComponent } from '../terminal-item';

import { TerminalTabsModule } from '../../layout/terminal-tabs/terminal-tabs.module';

import { TerminalItemRoutingModule } from './terminal-item-routing.module';

import { DialogsService } from './products/prodict-ingredients/terminal-product-ingredients.service';

import { MatButtonModule, MatDialogModule,  } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    LayoutModule,
    TerminalTabsModule,
    TerminalItemRoutingModule,
    MatButtonModule,
    MatDialogModule
  ],

  providers: [ DialogsService ],
})
export class TerminalItemModule { }
