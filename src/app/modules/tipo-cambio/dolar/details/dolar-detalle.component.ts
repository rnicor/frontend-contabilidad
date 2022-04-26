import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DolarService } from '../dolar.service';
import { appSnackPrimary, appSnackWarm } from '../../../../core/snack/app.snack';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dolar } from '../dolar.types';

@Component({
    selector: 'dolar-detalle',
    templateUrl: './dolar-detalle.component.html',
    styles: []
})
export class LineaDetalleComponent {
    @Input() action: string;
    @Input() dolar: Dolar;
    @Output() lineaEvento: EventEmitter<any> = new EventEmitter();
    formGroup: FormGroup;
    constructor(
        private _snackBar: MatSnackBar,
        private dolarService: DolarService,
        public dialogRef: MatDialogRef<LineaDetalleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.dolar = { id: null, fecha: null, monto: null, descripcion: null };
        if (data) {
            if (data.linea) {
                this.dolar = data.linea;
            }
        }
        this.buildForm();
    }
    buildForm(): void {
        this.formGroup = new FormGroup({
            id: new FormControl(this.dolar.id),
            fecha: new FormControl(this.dolar.fecha, [Validators.required, Validators.maxLength(20)]),
            monto: new FormControl(this.dolar.monto, [Validators.required, Validators.maxLength(20)]),
            descripcion: new FormControl(this.dolar.descripcion, [Validators.required, Validators.max(500)]),

        });
    }
    save(): void {
        if (this.formGroup.valid) {
            if (!this.dolar.id) {
                this.dolarService.guardar(this.formGroup.value).subscribe(
                    (response) => {
                        this._snackBar.open(response.mensaje, 'Exito!!!', appSnackPrimary);
                        this.dialogRef.close(response);
                    },
                    (err) => {
                        this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                    }
                );
            } else {
                this.dolarService.editar(this.formGroup.value).subscribe(
                    (response) => {
                        this._snackBar.open(response.mensaje, 'Exito!!!', appSnackPrimary);
                        this.dialogRef.close(response);
                    },
                    (err) => {
                        this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                    }
                );
            }
        } else {
            this.formGroup.markAllAsTouched();
        }
    }
    close(): void {
        this.dialogRef.close();
    }
    get f(): any {
        return this.formGroup.controls;
    }
}
