import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {
  constructor(public dialog: MatDialogRef<ConfirmationModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
  title: string = "Confirmation";
  message: string = "Are you sure?";
  acceptText: string = "Accept";
  cancelText: string = "Cancel";

  ngOnInit() {
    if(this.data.title){
      this.title = this.data.title;
    }
    if(this.data.message){
      this.message = this.data.message;
    }
    if(this.data.acceptText){
      this.acceptText = this.data.acceptText;
    }
    if(this.data.cancelText){
      this.cancelText = this.data.cancelText;
    }
  }

 accept() {
  this.dialog.close(true);
 } 

  cancel() {
    this.dialog.close(false);
  }
}
