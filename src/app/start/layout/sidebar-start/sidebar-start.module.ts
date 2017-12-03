import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarStartComponent } from './sidebar-start.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [SidebarStartComponent],
  exports: [SidebarStartComponent]
})
export class SidebarStartModule { }
