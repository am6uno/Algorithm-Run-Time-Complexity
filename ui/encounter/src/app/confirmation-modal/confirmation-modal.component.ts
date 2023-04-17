import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  constructor(public dialog: MatDialogRef<ConfirmationModalComponent>) {}

 accept() {
  this.dialog.close(true);
 } 

  cancel() {
    this.dialog.close(false);
  }
}
