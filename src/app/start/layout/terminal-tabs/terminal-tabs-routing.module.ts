import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLinkActive } from '@angular/router';

import { TerminalTabsComponent } from './terminal-tabs.component';

const terminalTabsRoutes: Routes = [
  {
    path: '',
    component: TerminalTabsComponent,
   },
];

@NgModule({
  imports: [RouterModule.forChild(terminalTabsRoutes)],
  exports: [RouterModule]
})
export class TerminalTabsRoutingModule { }
