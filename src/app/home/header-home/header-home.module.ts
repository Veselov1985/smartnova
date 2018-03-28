import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderHomeRoutingModule } from './header-home-routing.module';
import { HeaderHomeComponent } from './header-home.component';

import { SideBarHomeModule } from '../side-bar-home/side-bar-home.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderHomeRoutingModule,
    SideBarHomeModule
  ],
  declarations: [HeaderHomeComponent],
  exports: [HeaderHomeComponent]
})
export class HeaderHomeModule { }

