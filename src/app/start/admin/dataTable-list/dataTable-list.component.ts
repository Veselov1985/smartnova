import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataTableModule  } from 'angular2-datatable';
import { SharedModule } from '../../../shared/shared.module';
import { UserTid } from '../../../shared';








@Component({
  selector: 'app-datatable-list',
  templateUrl: './dataTable-list.component.html',
  styleUrls: ['./dataTable-list.component.less']
})
export class DataTableListComponent implements OnInit {

  @Input() data;
  @Output() ChangeForm= new EventEmitter();

  constructor() {}


  ngOnInit() {
  }


  EditUser(user: UserTid) {

    this.ChangeForm.emit(user);

  }

  RemoveItem(item) {
   this.data = this.data.filter( x => x !== item );
  }

}
