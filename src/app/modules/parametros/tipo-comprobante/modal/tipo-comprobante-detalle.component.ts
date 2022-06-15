import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {appSnackPrimary, appSnackWarm} from '../../../../core/snack/app.snack';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TipoComprobante} from '../type/tipo-comprobante.types';
import {TipoComprobanteService} from '../service/tipo-comprobante.service';

@Component({
    selector: 'tipo-comprobante-detalle',
    templateUrl: './tipo-comprobante-detalle.component.html',
    styles: []
})
export class TipoComprobanteDetalleComponent{
    @Input() action: string;
    @Input() tipoComprobante: TipoComprobante;
    @Output() tipoComprobanteEvento: EventEmitter<any> = new EventEmitter();
    formGroup: FormGroup;
    disabledForm: boolean;
    constructor(
        private _snackBar: MatSnackBar,
        private tipoComprobanteService: TipoComprobanteService,
        public dialogRef: MatDialogRef<TipoComprobanteDetalleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.disabledForm = false;
        this.tipoComprobante = {id: null, nombre: null, numero: null};
        if (data) {
            if (data.tipoComprobante) {
                this.tipoComprobante = data.tipoComprobante;
            }
        }
        this.buildForm();
    }
    buildForm(): void {
        this.formGroup = new FormGroup({
            id: new FormControl(this.tipoComprobante.id),
            nombre: new FormControl(this.tipoComprobante.nombre, [Validators.required, Validators.max(500)]),
            numero: new FormControl(this.tipoComprobante.numero, [Validators.required]),
        });
    }
    save(): void {
        if (this.formGroup.valid) {
            if (!this.tipoComprobante.id) {
                this.disabledForm = true;
                this.tipoComprobanteService.guardar(this.formGroup.value).subscribe(
                    (response) => {
                        this._snackBar.open('Tipo comprobante creado', 'Exito!!!', appSnackPrimary);
                        this.dialogRef.close(response);
                        this.disabledForm = false;
                    },
                    (err) => {
                        this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                        this.disabledForm = false;
                    }
                );
            } else {
                this.disabledForm = true;
                this.tipoComprobanteService.editar(this.formGroup.value).subscribe(
                    (response) => {
                        this._snackBar.open('Tipo comprobante actualizado', 'Exito!!!', appSnackPrimary);
                        this.dialogRef.close(response);
                        this.disabledForm = false;
                    },
                    (err) => {
                        this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                        this.disabledForm = false;
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
    get f(): any{
        return this.formGroup.controls;
    }
}
