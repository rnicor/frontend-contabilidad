import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LineaService} from '../linea.service';
import {appSnackPrimary, appSnackWarm} from '../../../../core/snack/app.snack';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Linea} from '../linea.types';

@Component({
    selector: 'linea-detalle',
    templateUrl: './linea-detalle.component.html',
    styles: []
})
export class LineaDetalleComponent{
    @Input() action: string;
    @Input() linea: Linea;
    @Output() lineaEvento: EventEmitter<any> = new EventEmitter();
    formGroup: FormGroup;
    constructor(
        private _snackBar: MatSnackBar,
        private lineaService: LineaService,
        public dialogRef: MatDialogRef<LineaDetalleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.linea = {id: null, nombre: null};
        if (data) {
            if (data.linea) {
                this.linea = data.linea;
            }
        }
        this.buildForm();
    }
    buildForm(): void {
        this.formGroup = new FormGroup({
            id: new FormControl(this.linea.id),
            nombre: new FormControl(this.linea.nombre, [Validators.required, Validators.max(500)]),
        });
    }
    save(): void {
        if (this.formGroup.valid) {
            if (!this.linea.id) {
            this.lineaService.guardar(this.formGroup.value).subscribe(
                (response) => {
                    this._snackBar.open(response.mensaje, 'Exito!!!', appSnackPrimary);
                this.dialogRef.close(response);
                },
                (err) => {
                    this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                }
            );
            } else {
            this.lineaService.editar(this.formGroup.value).subscribe(
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
    get f(): any{
        return this.formGroup.controls;
    }
}
