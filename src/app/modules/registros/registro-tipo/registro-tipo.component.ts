import {AfterViewInit, Component, OnInit} from '@angular/core';
import {appSnackPrimary, appSnackWarm} from '../../../core/snack/app.snack';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FuseConfirmationService} from '../../../../@fuse/services/confirmation';
import {RegistroTipoService} from './service/registro-tipo.service';
import {AuthService} from '../../../core/auth/auth.service';
import {RegistroTipoInicio} from './type/registro-tipo-inicio.types';
import {RegistroTipo} from './type/registro-tipo.types';
import {BuscarTipoComponent} from "./modal/buscar-tipo.component";

@Component({
    selector: 'app-registro-tipo',
    templateUrl: './registro-tipo.component.html'
})
export class RegistroTipoComponent implements OnInit, AfterViewInit {
    inicio: RegistroTipoInicio;
    tipo: RegistroTipo;
    formTipo: FormGroup;

    disabledForm: boolean;
    constructor(
        private tipoService: RegistroTipoService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _fuseConfirmationService: FuseConfirmationService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.disabledForm = false;
        this.tipoService.inicio().subscribe(
            (response) => {
                this.inicio = response;
            }
        );
        this.iniciaFormulario();
    }

    ngAfterViewInit(): void {}

    iniciaFormulario(): void {
        this.tipo = this.tipo ? this.tipo : this.tipo = {
            id: null,
            tipoComprobanteId: null,
            nombre: null,
            glosa: null,
            detalle: []
        };
        this.formTipo = this.formBuilder.group({
            id:                         [null],
            tipoComprobanteId:          [null, [Validators.required]],
            nombre:                     [null, [Validators.required]],
            glosa:                      [null, [Validators.required]],
            detalle:                    this.formBuilder.array([])
        });
    }

    add(): void {
        this.detalles.push(this.createDetallesField());
    }

    deleteDetalle(i): void {
        this.detalles.removeAt(i);
    }

    createDetallesField(): any {
        return this.formBuilder.group({
            id: [null],
            cuentaId: [null, Validators.required],
            codigoCuenta: [null, Validators.required],
            nombreCuenta: [null, Validators.required],
            porcentaje: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
        });
    }

    get detalles(): FormArray {
        return this.formTipo.get('detalle') as FormArray;
    }

    actualizarCuenta(index: number, event: any): void {
        this.detalles.at(index).patchValue({cuentaId: event.value.id, codigoCuenta: event.value.codigo , nombreCuenta: event.value.nombre});
    }

    guardar(): void {
        if (!this.validarTipo()) {
            return;
        }
        this.mapFormularioToTipo();
        this.disabledForm = true;
        this.tipoService.guardar(this.tipo).subscribe(
            (response) => {
                this.tipo = response;
                this.mapTipoToFormulario();
                this._snackBar.open('Registro tipo guardado', 'Exito!!!', appSnackPrimary);
                this.disabledForm = false;
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                this.disabledForm = false;
            }
        );
    }
    modificar(): void {
        if (!this.validarTipo()) {
            return;
        }
        this.mapFormularioToTipo();
        this.disabledForm = true;
        this.tipoService.modificar(this.tipo).subscribe(
            (response) => {
                this.tipo = response;
                this.mapTipoToFormulario();
                this._snackBar.open('Registro tipo actualizado', 'Exito!!!', appSnackPrimary);
                this.disabledForm = false;
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                this.disabledForm = false;
            }
        );
    }
    eliminar(): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar tipo',
            message: '¿Esta seguro(a) de eliminar el registro tipo: ' + this.formTipo.get('nombre').value + ' ?',
            actions: {
                confirm: {label: 'Eliminar'},
                cancel: {label: 'Cancelar'}
            },
            icon: {color: 'warning'}
        });
        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this.disabledForm = true;
                this.tipoService.eliminar(this.tipo.id).subscribe(
                    (response) => {
                        this.nuevo();
                        this._snackBar.open('Se eliminó el registro tipo', 'Exito!!!', appSnackPrimary);
                        this.disabledForm = false;
                    },
                    (err) => {
                        this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                        this.disabledForm = false;
                    }
                );
            }
        });
    }
    nuevo(): void {
        this.tipo = {
            id: null,
            tipoComprobanteId: null,
            nombre: null,
            glosa: null,
            detalle: []
        };
        this.formTipo.reset();
    }
    obtenerTipo(): void {
        this.nuevo();
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '50%';
        const dialogRef = this.dialog.open(BuscarTipoComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.disabledForm = true;
                this.tipoService.obtener(data.id).subscribe(
                    (response) => {
                        this.tipo = response;
                        this.mapTipoToFormulario();
                        this.disabledForm = false;
                    } ,
                    (err) => {
                        this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                        this.disabledForm = false;
                    });
            }
        });
    }
    get f(): any {
        return this.formTipo.controls;
    }
    private mapTipoToFormulario(): void {
        this.formTipo.controls['id'].setValue(this.tipo.id);
        this.formTipo.controls['tipoComprobanteId'].setValue(this.tipo.tipoComprobanteId);
        this.formTipo.controls['nombre'].setValue(this.tipo.nombre);
        this.formTipo.controls['glosa'].setValue(this.tipo.glosa);
        this.detalles.clear();
        this.tipo.detalle.forEach((e, index) => {
            const cuenta = this.inicio.cuentas.find(x => e.cuentaId===x.id);
            this.detalles.push(this.formBuilder.group({
                id: [e.id],
                cuentaId: [e.cuentaId, Validators.required],
                codigoCuenta: [cuenta.codigo, Validators.required],
                nombreCuenta: [cuenta.nombre, Validators.required],
                porcentaje: [e.porcentaje],
            }));
        });
    }
    private mapFormularioToTipo(): void {
        this.tipo.id = this.formTipo.controls['id'].value;
        this.tipo.tipoComprobanteId = this.formTipo.controls['tipoComprobanteId'].value;
        this.tipo.nombre = this.formTipo.controls['nombre'].value;
        this.tipo.glosa = this.formTipo.controls['glosa'].value;
        this.tipo.detalle = this.formTipo.controls['detalle'].value;
    }
    private validarTipo(): boolean {
        if(this.formTipo.invalid) {
            this.formTipo.markAllAsTouched();
            this._snackBar.open('Complete los datos requeridos', 'Error!!!', appSnackWarm);
            return false;
        }
        return true;
    }
}
