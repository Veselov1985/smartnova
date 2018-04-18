import { Component, OnInit, Input, Output, EventEmitter,OnChanges ,SimpleChanges } from '@angular/core';
import { DataTableModule  } from 'angular2-datatable';
import { SharedModule } from '../../../shared/shared.module';
import { UserTid } from '../../../shared';
import { SettingsService } from'../../../shared//services/common/settings.service'






@Component({
  selector: 'app-datatable-list',
  templateUrl: './dataTable-list.component.html',
  styleUrls: ['./dataTable-list.component.less']
})
export class DataTableListComponent implements OnInit {

  @Input() data;
  @Output() ChangeForm= new EventEmitter();
  public rowsOnPage =10;
  public page:number;
  public sortBy: string;
  public sortOrder: string;
  public filterQuery: string = '';
  searchFields=[
    'Role.Name',
    'Email',
    'Password',
    'SurName',
    'Pk'
  ];


  constructor(private  SettingsService: SettingsService) {

  }


  ngOnInit() {
    if (this.SettingsService.settings) {
      this.sortBy = this.SettingsService.settings.admin.sortBy || 'DateTime';
      this.sortOrder = this.SettingsService.settings.admin.sortOrder || 'desc';
    }
    console.log(this.SettingsService.settings.admin.page);
    this.page=this.SettingsService.settings.admin.page; 
  }


  EditUser(user: UserTid):void {

    this.ChangeForm.emit(user);

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {  
      console.log(this.data);
    }
    if(changes.rowsOnPage){
      console.log(this.rowsOnPage)
    }
}


  RemoveItem(item):void {
   this.data = this.data.filter( x => x !== item );
  }

}
