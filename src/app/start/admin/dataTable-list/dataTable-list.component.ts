import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-dataTable-list',
  templateUrl: './dataTable-list.component.html',
  styleUrls: ['./dataTable-list.component.less']
})
export class DataTableListComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() {
    console.log(this.data)
  }

}
