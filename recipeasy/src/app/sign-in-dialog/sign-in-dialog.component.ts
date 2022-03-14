import { Component, OnInit, Inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  email: string;
  password: string;
  submit: boolean;
}

@Component({
  selector: 'app-sign-in-dialog',
  templateUrl: './sign-in-dialog.component.html',
  styleUrls: ['./sign-in-dialog.component.css']
})
export class SignInDialogComponent implements OnInit {
  dat!: DialogData
  hidePassword = true;
  constructor(
    public dialogRef: MatDialogRef<SignInDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.dat = data;
    this.dat.submit = true;
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dat.submit = false;
    this.dialogRef.close();
  }

}
