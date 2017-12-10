import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { StartComponent } from './start/start.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TerminalsComponent } from './start/terminals/terminals.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: '',
    redirectTo: 'home',
    pathMatch : 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports:    [RouterModule.forRoot(routes, { useHash: true })],
  exports:    [RouterModule],
  providers:  []
})
export class AppRoutingModule {}
