import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terminal-item',
  templateUrl: './terminal-item.component.html',
  styleUrls: ['./terminal-item.component.less']
})

export class TerminalItemComponent implements OnInit {

  configMode: boolean;

  constructor() {
    this.configMode = false;
  }

  ngOnInit() {
  }

  onConfigMode(mode: any) {
    this.configMode = mode;
    console.log('items:' + this.configMode);
  }
}
