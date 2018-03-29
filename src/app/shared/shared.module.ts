import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';

import { SHARED_PIPE } from './shared';
import { DataTablePaginatorComponent } from './components/data-table-paginator';
import { ForbidNegativeNumbersDirective } from './directives/forbid-negative-numbers.directive';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    DataTableModule
  ],
  declarations: [
    SHARED_PIPE,
    DataTablePaginatorComponent,
    ForbidNegativeNumbersDirective
  ],
  exports: [
    CommonModule,
    HttpModule,
    SHARED_PIPE,
    DataTablePaginatorComponent,
    ForbidNegativeNumbersDirective
  ]
})
export class SharedModule {}
