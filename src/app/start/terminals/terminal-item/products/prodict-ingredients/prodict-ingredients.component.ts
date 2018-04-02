import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TItemIngridient } from '../../../../../shared';

@Component({
  selector: 'app-prodict-ingredients',
  templateUrl: './prodict-ingredients.component.html',
  styleUrls: ['./prodict-ingredients.component.less']
})
export class ProdictIngredientsComponent implements OnInit {

  public title: string;
  public message: string;
  ingredients: TItemIngridient[];

  constructor(
    public dialogRef: MatDialogRef<ProdictIngredientsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.ingredients = this.data.ingredients;
  }

}
