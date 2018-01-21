import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  OnInit,
  Input
} from '@angular/core';

import { HttpModule, Http } from '@angular/http';

import { MainChartModule } from './main-chart.module';
import { ChartMainService } from '../../../shared';

const Highcharts = require('highcharts/highstock.src');

import 'highcharts/adapters/standalone-framework.src';

@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.less'],
})

export class MainChartComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('chart') public chartEl: ElementRef;

  dataMain: any;
  options: Object;
  dataLine: Array<any>;


  private _chart: any;
  constructor(
    private http: Http,
    private getChartMainService: ChartMainService,
  ) {
    this.dataLine = [];
    Highcharts.setOptions({
      lang: {
        weekdays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
      }
    });
  }


  public ngOnInit() {
    this.getChartMainService.getChartMain().subscribe(data => {
        if (data.IsSuccess) {
          this.dataMain = data.LineChart;
          if (this.dataMain) {
            Object.keys(this.dataMain).forEach(key => {
              const newItem = this.dataMain[key].map((item: any) => {
                const newPoint = [];
                newPoint.push(new Date(item.DateTime).getTime());
                newPoint.push(item.Value);
                return newPoint;
              });
              this.dataLine.push(newItem);
            });
          }
        }

        const opts: any = {

          chart: {
            height: 400
          },

          title: {
            text: 'Динамика продаж'
          },

          subtitle: {
            text: 'Динамика продаж всех автоматов по месяцам'
          },

          rangeSelector: {
            selected: 0,
            enabled: true
          },

          series: [{
            name: 'Сумма продаж',
            data: this.dataLine[0],
            pointInterval: 24 * 36e5,
            type: 'area',
            threshold: null,
            tooltip: {
              valueDecimals: 2
            }
          },
          {
            name: 'Сумма инкасации',
            data: this.dataLine[1],
            type: 'area',
            threshold: null,
            tooltip: {
              valueDecimals: 2
            }
          }],
          lang: {
            weekdays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
          },
          responsive: {
            rules: [{
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                title: {
                  text: 'Динамика продаж'
                },
                chart: {
                  height: 300
                },
                subtitle: {
                  text: null
                },
                navigator: {
                  enabled: false
                }
              }
            }]
          }
        };
        if (this.chartEl && this.chartEl.nativeElement) {
          opts.chart = {
            type: 'area',
            renderTo: this.chartEl.nativeElement
          };

          this._chart = new Highcharts.stockChart(opts);
        }
    });
  }

  public ngAfterViewInit() {
  }

  public ngOnDestroy() {
    if (this._chart) {
      this._chart.destroy();
    }
  }

}
