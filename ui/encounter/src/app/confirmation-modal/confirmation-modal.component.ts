import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
