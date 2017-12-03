import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TerminalsModule } from './terminals.module';
import { TerminalsComponent } from './terminals.component';



const terminalsRoutes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(terminalsRoutes)],
  exports: [RouterModule]
})
export class TerminalsRoutingModule { }
