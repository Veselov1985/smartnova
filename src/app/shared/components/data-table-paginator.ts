import { Component, Input, AfterViewInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { DataTable } from 'angular2-datatable';
import * as _ from 'lodash';
import { Paginator } from 'angular2-datatable';

import { SettingsService } from '../services/common/settings.service';

@Component({
    selector: 'app-data-table-paginator',
    template: `
    <mfPaginator #p [mfTable]="mfTable">
        <ul class="pagination" *ngIf="p.dataLength > p.rowsOnPage">
            <li class="page-item" [class.disabled]="p.activePage <= 1" (click)="setPage(1)">
                <a class="page-link" style="cursor: pointer">В начало</a>
            </li>
            <li class="page-item" (click)="p.activePage > 5 ? setPage(p.activePage - 5) : setPage(1)">
                <a class="page-link" style="cursor: pointer; -webkit-user-select: none;">&laquo;</a>
            </li>
            <li class="page-item" (click)="p.activePage > 1 ? setPage(p.activePage - 1) : setPage(1)">
                <a class="page-link" style="cursor: pointer; -webkit-user-select: none;">&lsaquo;</a>
            </li>
            <li class="page-item" *ngIf="p.activePage > 2 && p.activePage + 1 > p.lastPage" (click)="setPage(p.activePage - 2)">
                <a class="page-link" style="cursor: pointer">{{p.activePage-2}}</a>
            </li>
            <li class="page-item" *ngIf="p.activePage > 1" (click)="setPage(p.activePage - 1)">
                <a class="page-link" style="cursor: pointer">{{p.activePage-1}}</a>
            </li>
            <li class="page-item active">
                <a class="page-link" style="cursor: pointer">{{p.activePage}}</a>
            </li>
            <li class="page-item" *ngIf="p.activePage + 1 <= p.lastPage" (click)="setPage(p.activePage + 1)">
                <a class="page-link" style="cursor: pointer">{{p.activePage+1}}</a>
            </li>
            <li class="page-item" *ngIf="p.activePage + 2 <= p.lastPage && p.activePage < 2" (click)="setPage(p.activePage + 2)">
                <a class="page-link" style="cursor: pointer">{{p.activePage+2}}</a>
            </li>
            <li class="page-item" (click)="p.activePage < p.lastPage ? setPage(p.activePage + 1) : setPage(p.lastPage)">
                <a class="page-link" style="cursor: pointer; -webkit-user-select: none;">&rsaquo;</a>
            </li>
            <li class="page-item" (click)="(p.activePage < p.lastPage - 4) ? setPage(p.activePage + 5) : setPage(p.lastPage)">
                <a class="page-link" style="cursor: pointer; -webkit-user-select: none;">&raquo;</a>
            </li>
            <li class="page-item" [class.disabled]="p.activePage >= p.lastPage" (click)="setPage(p.lastPage)">
                <a class="page-link" style="cursor: pointer">В конец</a>
            </li>
        </ul>
        <ul class="pagination pull-right float-sm-right" *ngIf="p.dataLength > minRowsOnPage">
            <li class="page-item" *ngFor="let rows of rowsOnPageSet" [class.active]="p.rowsOnPage===rows" (click)="p.setRowsOnPage(rows)">
                <a class="page-link" style="cursor: pointer">{{rows}}</a>
            </li>
        </ul>
    </mfPaginator>
    `
})
export class DataTablePaginatorComponent implements AfterViewInit, OnChanges {
    @ViewChild('p') paginator: Paginator;
    @Input('rowsOnPageSet') rowsOnPageSet = [];
    @Input('mfTable') mfTable: DataTable;
    @Input('page') page: number;
    @Input('section') section: string;

    minRowsOnPage = 0;

    constructor(private settingsService: SettingsService) {}

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.page && this.paginator) {
                this.paginator.setPage(this.page);
            }
        }, 0);
    }

    ngOnChanges(changes: any): any {
        if (changes.rowsOnPageSet) {
            this.minRowsOnPage = _.min(this.rowsOnPageSet);
        }
    }

    setPage(page: number) {
        this.paginator.setPage(page);
        if (this.section !== 'eventStats') {
            this.settingsService.settings[this.section].page = page;
        }
    }
}
