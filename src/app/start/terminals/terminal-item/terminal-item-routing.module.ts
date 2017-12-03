import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {} from './terminal-item'
import {
  TerminalItemComponent,
  CollectionComponent,
  EventsComponent,
  IngridientsComponent,
  ProductsComponent,
  SellsComponent
} from '../terminal-item';

const terminalItemRoutes: Routes = [
  {
      path: '',
      component: TerminalItemComponent,

  },
];

@NgModule({
  imports: [RouterModule.forChild(terminalItemRoutes)],
  exports: [RouterModule]
})
export class TerminalItemRoutingModule { }
