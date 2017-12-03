import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-prodict-ingredients',
  templateUrl: './prodict-ingredients.component.html',
  styleUrls: ['./prodict-ingredients.component.less']
})
export class ProdictIngredientsComponent {

  public title: string;
  public message: string;

  constructor(public dialogRef: MatDialogRef<ProdictIngredientsComponent>) {

  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}
