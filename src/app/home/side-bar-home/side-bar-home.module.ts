import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarHomeComponent } from './side-bar-home.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [SideBarHomeComponent],
  exports: [SideBarHomeComponent]
})
export class SideBarHomeModule { }
