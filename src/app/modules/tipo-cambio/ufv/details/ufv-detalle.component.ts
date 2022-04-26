import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UfvService } from '../ufv.service';
import { appSnackPrimary, appSnackWarm } from '../../../../core/snack/app.snack';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ufv } from '../ufv.types';

@Component({
    selector: 'ufv-detalle',
    templateUrl: './ufv-detalle.component.html',
    styles: []
})
export class LineaDetalleComponent {
    @Input() action: string;
    @Input() ufv: Ufv;
    @Output() lineaEvento: EventEmitter<any> = new EventEmitter();
    formGroup: FormGroup;
    constructor(
        private _snackBar: MatSnackBar,
        private ufvService: UfvService,
        public dialogRef: MatDialogRef<LineaDetalleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.ufv = { id: null, fecha: null, monto: null, descripcion: null };
        if (data) {
            if (data.ufv) {
                this.ufv = data.ufv;
            }
        }
        this.buildForm();
    }
    buildForm(): void {
        this.formGroup = new FormGroup({
            id: new FormControl(this.ufv.id),
            fecha: new FormControl(this.ufv.fecha),
            monto: new FormControl(this.ufv.monto, [Validators.required, Validators.maxLength(20)]),
            descripcion: new FormControl(this.ufv.descripcion, [Validators.required, Validators.maxLength(20)]),

        });
    }
    save(): void {

        if (this.formGroup.valid) {
            if (!this.ufv.id) {
                console.log(this.formGroup.value);
                this.ufvService.guardar(this.formGroup.value).subscribe(
                    (response) => {
                        this._snackBar.open(response.mensaje, 'Exito!!!', appSnackPrimary);
                        this.dialogRef.close(response);
                    },
                    (err) => {
                        this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                    }
                );
            } else {
                console.log('eduitar', this.formGroup.value);
                this.ufvService.editar(this.formGroup.value).subscribe(
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
