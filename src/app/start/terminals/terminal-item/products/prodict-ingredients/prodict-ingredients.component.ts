import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GetProductIngredientsService } from '../../../../../shared/services/terminals/get-product-ingredients.service';
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
    private ingrService: GetProductIngredientsService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this.ingrService.getIngredients(this.data.Pk).subscribe(resp => {
        this.ingredients = resp.IsSuccess ? resp.GoodsIngredients : [];
    }, error => console.log(error));
  }

}
