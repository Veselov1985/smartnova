import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import { HeaderHomeModule } from './header-home/header-home.module';

import { HeaderHomeRoutingModule } from './header-home/header-home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    HeaderHomeModule,
    HeaderHomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
