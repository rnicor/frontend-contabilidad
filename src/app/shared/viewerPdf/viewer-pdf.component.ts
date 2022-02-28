import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'viewer-pdf-modal',
  templateUrl: './viewer-pdf.component.html',
  styles: []
})
export class ViewerPdfComponent{
    currentPdf: any = null;
    constructor(
    public dialogRef: MatDialogRef<ViewerPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (data) {
            this.currentPdf = URL.createObjectURL(data);
        }
    }
    close(): void {
        this.dialogRef.close();
    }
}
