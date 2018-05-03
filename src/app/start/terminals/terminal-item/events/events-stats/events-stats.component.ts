import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  OnInit,
  Input
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { } from './stats.service';
import {
  GetEventsStatsService,
  TItemEventsStats,
} from '../../../../../shared';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishLast';

const Highcharts = require('highcharts/highstock.src');

import 'highcharts/adapters/standalone-framework.src';
import { SettingsService } from './../../../../../shared/services/common/settings.service';
import { SignalRService } from '../../../../../shared/services/auth/signalr.service';

@Component({
  selector: 'app-eventsstats',
  templateUrl: './events-stats.component.html',
  styleUrls: ['./events-stats.component.less']
})

export class EventsStatsComponent implements OnInit, OnDestroy {

  @ViewChild('chart') public chartEl: ElementRef;

  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'Id';
  public sortOrder = 'asc';
  page: number;

  typeMultifilter: string;
  data: TItemEventsStats[];
  eventData: any;

  options: Object;
  dataLine: Array<any>;

  chartData: any;

  private eventSubscription: Subscription;

  private _chart: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private getEventsStatsService: GetEventsStatsService,
    private settingsService: SettingsService,
    private signalRService: SignalRService,
  ) {
    Highcharts.setOptions({
      lang: {
        weekdays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        rangeSelectorZoom: '',
        rangeSelectorFrom: 'С',
        rangeSelectorTo: 'по'
      }
    });
  }

  ngOnInit() {
    this.data = this.route.snapshot.data['stats'];

    this.page = this.settingsService.settings.eventStats.page;
    this.rowsOnPage = this.settingsService.settings.eventStats.rowsOnPage;

    this.renderCharts();

    this.eventSubscription = this.signalRService.onEventSent$.subscribe(resp => {
      this.getEventsStatsService.getTerminalEventsStats(this.route.snapshot.queryParams).subscribe(response => {
          if (response.IsSuccess) {
            this.data = response.AllTerminalEventsByType || response.TerminalEvents;
            this.renderCharts();
          }
      });
    });
  }

  setRowsOnPage() {
    this.settingsService.settings.eventStats.rowsOnPage = this.rowsOnPage;
  }

  ngOnDestroy() {
    if (this._chart) {
      this._chart.destroy();
    }
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  dateCreate(dateString) {
    const date = new Date(dateString);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), -(date.getTimezoneOffset() / 60), 0).getTime();
  }

  renderCharts() {
    const tempData = {};
    this.data.forEach(item => {
      const date = this.dateCreate(item.DateTime);
      tempData[date] = (tempData[date] || 0) + 1;
    });
    if (this.data) {
      // this.chartData = this.data.map(item => [new Date(item.DateTime).getTime(), item.TotalNumber]);
      this.chartData = [];
      for (const key in tempData) {
        if (tempData.hasOwnProperty(key)) {
          this.chartData.push([+key, tempData[key]]);
        }
      }
      this.chartData.sort((a, b) => {
        return a[0] - b[0];
      });
      this.eventData = this.data[0];
    }

    if (this.data) {
      const opts: any = {

        chart: {
          alignTicks: false
        },

        rangeSelector: {
          inputDateFormat: '%e %b, %Y',
          selected: 1,
          buttons: [
            {
              type: 'month',
              count: 1,
              text: '1 мес'
            },
            {
              type: 'month',
              count: 3,
              text: '3 мес'
            },
            {
              type: 'month',
              count: 6,
              text: '6 мес'
            },
            {
              type: 'ytd',
              text: 'С 1 янв'
            },
            {
              type: 'year',
              count: 1,
              text: '1 год'
            },
            {
              type: 'all',
              text: 'Все'
            }
          ],
          buttonSpacing: 4,
          buttonTheme: {
            width: 50
          }
        },

        title: {
          text: this.eventData.Name
        },

        credits: {
          text: ''
        },

        lang: {
          weekdays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
          months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
          shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
        },

        series: [{
          type: 'column',
          name: `Статистика события: ${this.eventData.Name}`,
          data: this.chartData,
          pointInterval: 24 * 3600 * 1000,
          dataGrouping: {
            units: [[
              'week', // unit name
              [1] // allowed multiples
            ], [
              'month',
              [1, 2, 3, 4, 6]
            ]]
          }
        }]
      };
      if (this.chartEl && this.chartEl.nativeElement) {
        opts.chart = {
          type: 'area',
          renderTo: this.chartEl.nativeElement
        };

        this._chart = new Highcharts.stockChart(opts);
      }
    }
  }
}
