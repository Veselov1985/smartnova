import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog-terminals.component.html',
  styleUrls: ['./dialog-terminals.component.less'],
})


export class DialogTerminalsComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogTerminalsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(st: boolean): void {
    this.dialogRef.close(st);
  }

}
