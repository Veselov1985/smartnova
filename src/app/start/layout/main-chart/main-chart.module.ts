import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainChartComponent } from './main-chart.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,

  ],
  declarations: [MainChartComponent],
  exports: [MainChartComponent]
})
export class MainChartModule { }
