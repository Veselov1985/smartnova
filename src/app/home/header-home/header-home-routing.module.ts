import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const headerHomeRoutes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(headerHomeRoutes)],
  exports: [RouterModule]
})
export class HeaderHomeRoutingModule { }
