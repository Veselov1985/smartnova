import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';

import { SHARED_PIPE } from './shared';
import { urlApi } from './url.api';
import { DataTablePaginatorComponent } from './components/data-table-paginator';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    DataTableModule
  ],
  declarations: [
    SHARED_PIPE,
    DataTablePaginatorComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    SHARED_PIPE,
    DataTablePaginatorComponent
  ]
})
export class SharedModule {}
