import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  OnInit,
  Input
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { } from './stats.service';
import {
  GetEventsStatsService,
  TItemEventsStats
} from '../../../../../shared';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishLast';

const Highcharts = require('highcharts/highstock.src');

import 'highcharts/adapters/standalone-framework.src';



@Component({
  selector: 'app-eventsstats',
  templateUrl: './events-stats.component.html',
  styleUrls: ['./events-stats.component.less']
})

export class EventsStatsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('chart') public chartEl: ElementRef;

  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'Id';
  public sortOrder = 'asc';

  typeMultifilter: string;
  data: TItemEventsStats[];
  eventData: any;

  options: Object;
  dataLine: Array<any>;

  chartData: any;

  private _chart: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private getEventsStatsService: GetEventsStatsService,
    public http: Http
  ) {}

  ngOnInit() {
    this.data = this.route.snapshot.data['stats'];
    if (this.data) {
      this.chartData = this.data.map(item => [new Date(item.DateTime).getTime(), item.TotalNumber]);
      this.chartData.sort((a, b) => {
        return a[0] - b[0];
      });
      this.eventData = this.data[0];
    }
  }

  public ngAfterViewInit() {

    const opts: any = {

      chart: {
        alignTicks: false
      },

      rangeSelector: {
        selected: 1
      },

      title: {
        text: this.eventData.Name
      },

      series: [{
        type: 'column',
        name: `Статистика события: ${this.eventData.Name}`,
        data: this.chartData,
        pointInterval: 24 * 36e5,
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

  public ngOnDestroy() {
    this._chart.destroy();
  }
}
