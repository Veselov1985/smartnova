import { AdminService } from './../../shared/services/admin/admin.service';
import { AdminRoutingModule } from './admin-routing.modules';
import { DataTableListComponent } from './dataTable-list/dataTable-list.component';

import { CommonModule } from '@angular/common';
import { NewUserComponent } from './new-user/new-user.component';
import { AdminComponent } from './admin.component';
import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DataTableModule } from 'angular2-datatable';
import {SettingsService} from './../../shared/services/common/settings.service'
import {Ng2PageScrollModule} from 'ng2-page-scroll';



@NgModule({
declarations: [
            AdminComponent,
            NewUserComponent,
            DataTableListComponent,


   ],
imports: [  CommonModule,
            BrowserModule,
            FormsModule,
            ReactiveFormsModule,
            SharedModule,
            DataTableModule,
            Ng2PageScrollModule
    
        ],
providers: [
            AdminService,
          
],
exports: []


})


export class AdminModule {}
