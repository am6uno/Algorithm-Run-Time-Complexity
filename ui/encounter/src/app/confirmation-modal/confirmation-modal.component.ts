import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})

/**
 * This component provides a confirmation modal when the user is potentially harming their own data.
 */
export class ConfirmationModalComponent implements OnInit {
  constructor(public dialog: MatDialogRef<ConfirmationModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
  title: string = "Confirmation";
  message: string = "Are you sure?";
  acceptText: string = "Accept";
  cancelText: string = "Cancel";

  /**
   * When the component is initialized, the title, message, accept text, and cancel text are set.
   */
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

  /**
   * This method accepts the consequences and closes the dialog.
   */
 accept() {
  this.dialog.close(true);
 } 

 /**
  * This method denies the consequences and closes the dialog.
  */
  cancel() {
    this.dialog.close(false);
  }
}
