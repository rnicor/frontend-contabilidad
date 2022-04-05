import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Gestion} from '../gestion.types';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {appSnackPrimary, appSnackWarm} from '../../../../core/snack/app.snack';
import {GestionService} from '../gestion.service';
import {Dominio} from '../../../../core/user/dominio.types';

@Component({
    selector: 'app-gestion-detalle',
    templateUrl: './gestion-detalle.component.html',
    styleUrls: ['./gestion-detalle.component.scss']
})
export class GestionDetalleComponent {
    @Input() action: string;
    @Input() gestion: Gestion;
    @Input() dominioGestionPeriodo: Dominio[];
    @Output() gestionEvento: EventEmitter<any> = new EventEmitter();
    formGroup: FormGroup;

// Para lista con desc
    //periodoControl = new FormControl('', Validators.required);
    //periodoForm :FormControl;

    constructor(
        private _snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        private gestionService: GestionService,
        public dialogRef: MatDialogRef<GestionDetalleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.gestion = {id: null, anio: null, periodo: null, empresaId: null};
        if (data) {
            if (data.gestion) {
                this.gestion = data.gestion;
                //Agregando extra lista con desc
                //this.formGroup.controls['periodoForm'].setValue(this.gestion.periodo);
                console.log(data);
            }
            this.dominioGestionPeriodo = data.dominioGestionPeriodo;
            console.log(this.dominioGestionPeriodo);
        }
        this.buildForm();
        console.log(this.dominioGestionPeriodo);
    }

    buildForm(): void {
        //extra lista con desc
        /*
        this.formGroup = this.formBuilder.group({
            id: [],
            anio: ['', [Validators.required, Validators.min(1900), Validators.max(2100)]],
            periodo: ['NO'],
        });
       */

        this.formGroup = new FormGroup({
            id: new FormControl(this.gestion.id),
            anio: new FormControl(this.gestion.anio, [Validators.required, Validators.min(1900), Validators.max(2100)]),
            periodo: new FormControl(this.gestion.periodo, [Validators.required, Validators.maxLength(25)]),
        });
    }

    close(): void {
        this.dialogRef.close();
    }

    get f(): any {
        return this.formGroup.controls;
    }

    save(): void {
        if (this.formGroup.valid) {
            if (!this.gestion.id) {
                this.gestionService.guardar(this.formGroup.value).subscribe(
                    (response) => {
                        this._snackBar.open(response.mensaje, 'Exito!!!', appSnackPrimary);
                        this.dialogRef.close(response);
                    },
                    (err) => {
                        this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                    }
                );
                console.log(this.formGroup.value);
            } else {
                console.log('ingresar a editar');
                console.log(this.formGroup.value);
                this.gestionService.editar(this.formGroup.value).subscribe(
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
            console.log(this.formGroup.value);
            this.formGroup.markAllAsTouched();
        }
    }
}
