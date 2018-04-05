import { Component, OnInit, Input, Output, EventEmitter,OnChanges ,SimpleChanges } from '@angular/core';
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
    
      console.log(this.data);
    }
}


  RemoveItem(item) {
   this.data = this.data.filter( x => x !== item );
  }

}
