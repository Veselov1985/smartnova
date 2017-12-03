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
} from '../../../../../shared'

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


  options: Object;
  dataLine: Array<any>;

  dataMain: any;

  params: string;

  private _chart: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private getEventsStatsService: GetEventsStatsService,
    public http: Http,

  ) {



    // alert(eventType);
    this.dataMain = [
      [1409138000000, 2],
      [1419135000000, 3],
      [1419136000000, 14],
      [1419137000000, 11],
      [1419138000000, 7],
      [1429138000000, 5],
      [1479139000000, 16],
      [1489139000000, 17],
      [1509139000000, 10],
      [1509239000000, 1],
      [1509249000000, 23],
      [1509340000000, 1],
      [1509350000000, 8],
      [1509441000000, 1],
      [1509442000000, 10],
      [1509542000000, 0],
      [1509543000000, 1],
      [1509643000000, 1],
      [1509644000000, 1],
      [1509744000000, 1],
      [1509745000000, 1],
      [1509845000000, 1],
      [1509846000000, 1],
      [1509946000000, 1],
      [1509947000000, 1],
      [1510047000000, 1],
      [1510048000000, 1],
      [1509148000000, 1],
      [1509149000000, 1],
      [1510147000000, 1],
      [1510157000000, 1],
      [1510247000000, 5],
      [1510248000000, 6],
      [1510347000000, 1],
      [1510357000000, 4],
      [1510447000000, 1],
      [1510467000000, 7],
      [1510547000000, 1],
      [1510577000000, 1],
      [1510647000000, 12],
      [1510657000000, 1],
      [1510747000000, 1],
      [1510757000000, 1],
      [1510847000000, 21],
      [1510947000000, 1],
      [1511047000000, 1],
      [1511147000000, 11],
      [1511247000000, 1],
      [1511347000000, 7],
      [1511447000000, 9],
      [1511547000000, 2],
      [1511647000000, 3],
      [1511747000000, 5],
      [1511844000000, 1],
      [1511845000000, 8],
      [1511846000000, 10],
      [1511847000000, 16],
    ];
  }

  ngOnInit() {
    this.params = this.route.snapshot.params['params'];
    this.getEventsStatsService
      .getTerminalEventsStats(this.params)
      .subscribe(data => {
        if (data.IsSuccess) {
          this.data = data.AllTerminalEventsByType;
        } else {
          this.data = null;
        }
      },
      err => {
        console.log(err);
      });
  }
  public ngAfterViewInit() {


    setTimeout(() => {
      // Object.keys(this.dataMain).forEach(key => {
      //   const newItem = this.dataMain[key].map(item => {
      //     const newPoint = [];
      //     newPoint.push(new Date(item.DateTime).getTime());
      //     newPoint.push(item.Value);
      //     return newPoint;
      //   });
      //   this.dataLine.push(newItem);
      // });

      const opts: any = {


        chart: {
          alignTicks: false
        },

        rangeSelector: {
          selected: 1
        },

        title: {
          text: 'AAPL Stock Volume'
        },

        series: [{
          type: 'column',
          name: 'Статистика события: Неопределённое',
          data: this.dataMain,
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

    }, 1000);

  }

  public ngOnDestroy() {
    this._chart.destroy();
  }
}
