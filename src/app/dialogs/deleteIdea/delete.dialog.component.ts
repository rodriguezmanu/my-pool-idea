
import { MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-delete.dialog',
  templateUrl: './delete.dialog.component.html',
  styleUrls: ['./delete.dialog.component.scss']
})
export class DeleteDialogComponent {
  constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>) {}

  /**
   * Cancel Modal
   *
   * @memberof DeleteDialogComponent
   */
  onNoClick(): void {
    this.dialogRef.close('cancel');
  }

  /**
   * Confirm Modal
   *
   * @memberof DeleteDialogComponent
   */
  confirmDelete(): void {
    this.dialogRef.close('confirm');
  }
}
