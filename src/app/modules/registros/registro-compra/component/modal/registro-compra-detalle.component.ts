import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RegistroCompraService} from '../../service/registro-compra.service';
import {RegistroCompraDetalleService} from '../../service/registro-compra-detalle.service';
import {RegistroCompra} from '../../type/registro-compra.types';
import {RegistroCompraInicio} from '../../type/registro-compra-inicio.types';
import {RegistroCompraDetalle} from '../../type/registro-compra-detalle.types';
import {appSnackPrimary, appSnackWarm} from '../../../../../core/snack/app.snack';

@Component({
    selector       : 'registro-compra-detalle',
    templateUrl    : './registro-compra-detalle.component.html'
})
export class RegistroCompraDetalleComponent implements OnInit {
    registroForm: FormGroup;
    registroCompraInicio: RegistroCompraInicio;
    registroCompra: RegistroCompra;
    registroCompraDetalle: RegistroCompraDetalle;
    disabledForm: boolean;

    constructor(
        private _snackBar: MatSnackBar,
        public dialog: MatDialog,
        private registroCompraService: RegistroCompraService,
        private registroCompraDetalleService: RegistroCompraDetalleService,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<RegistroCompraDetalleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (data) {
            this.registroCompraInicio = data.registroCompraInicio;
            this.registroCompra = data.registroCompra;
            this.registroCompraDetalle = data.registroCompraDetalle;
        }
    }

    ngOnInit(): void {
        this.registroCompraDetalle = this.registroCompraDetalle ? this.registroCompraDetalle : {
            id: null,
            tipoComprobante: null,
            nro: null,
            especificacion: null,
            nitProveedor: null,
            razonSocial: null,
            codigoAutorizacion: null,
            numeroFactura: null,
            numeroDui: null,
            fechaFactura: null,
            importeTotalCompra: 0,
            importeIce: 0,
            importeIehd: 0,
            importeIpj: 0,
            tasas: 0,
            otroNoSujetoIva: 0,
            importesExentos: 0,
            comprasGravadasTasaCero: 0,
            subtotal: 0,
            descuentosBonificacionesRebajasSujetasIva: 0,
            importeGiftCard: 0,
            importeBaseCreditoFiscal: 0,
            creditoFiscal: 0,
            estadoCompra: null,
            codigoControl: null,
            tipoCompra: 1
        };
        this.registroForm = this._formBuilder.group({
            id:  [this.registroCompraDetalle.id],
            tipoComprobante:  [this.registroCompraDetalle.tipoComprobante],
            nro:  [this.registroCompraDetalle.nro],
            especificacion:  [this.registroCompraDetalle.especificacion],
            nitProveedor:  [this.registroCompraDetalle.nitProveedor, [Validators.required]],
            razonSocial:  [this.registroCompraDetalle.razonSocial],
            codigoAutorizacion:  [this.registroCompraDetalle.codigoAutorizacion, [Validators.required]],
            numeroFactura:  [this.registroCompraDetalle.numeroFactura, [Validators.required]],
            numeroDui:  [this.registroCompraDetalle.numeroDui, [Validators.required]],
            fechaFactura:  [this.registroCompraDetalle.fechaFactura, [Validators.required]],
            importeTotalCompra:  [this.registroCompraDetalle.importeTotalCompra, [Validators.required]],
            importeIce:  [this.registroCompraDetalle.importeIce, [Validators.required]],
            importeIehd:  [this.registroCompraDetalle.importeIehd, [Validators.required]],
            importeIpj:  [this.registroCompraDetalle.importeIpj, [Validators.required]],
            tasas:  [this.registroCompraDetalle.tasas, [Validators.required]],
            otroNoSujetoIva:  [this.registroCompraDetalle.otroNoSujetoIva, [Validators.required]],
            importesExentos:  [this.registroCompraDetalle.importesExentos, [Validators.required]],
            comprasGravadasTasaCero:  [this.registroCompraDetalle.comprasGravadasTasaCero, [Validators.required]],
            subtotal:  [this.registroCompraDetalle.subtotal, [Validators.required]],
            descuentosBonificacionesRebajasSujetasIva:  [this.registroCompraDetalle.descuentosBonificacionesRebajasSujetasIva, [Validators.required]],
            importeGiftCard:  [this.registroCompraDetalle.importeGiftCard, [Validators.required]],
            importeBaseCreditoFiscal:  [this.registroCompraDetalle.importeBaseCreditoFiscal, [Validators.required]],
            creditoFiscal:  [this.registroCompraDetalle.creditoFiscal, [Validators.required]],
            estadoCompra:  [this.registroCompraDetalle.estadoCompra],
            codigoControl:  [this.registroCompraDetalle.codigoControl, [Validators.required]],
            tipoCompra:  [this.registroCompraDetalle.tipoCompra, [Validators.required]],
        });
    }

    guardar(): void {
        if (this.registroForm.invalid) {
            this._snackBar.open('Los campos marcados con (*) son obligatorios', 'Exito!!!', appSnackWarm);
            this.registroForm.markAllAsTouched();
            return;
        }
        this.registroCompraDetalle = this.registroForm.getRawValue();

        this.disabledForm = true;
        if (this.registroCompra.id){
            this.registroCompraDetalleService.guardar(this.registroCompra.id, this.registroCompraDetalle).subscribe(
                (response) => {
                    this.dialogRef.close(response);
                    this._snackBar.open('Registro Guardado', 'Exito!!!', appSnackPrimary);
                    this.disabledForm = false;
                },
                (err) => {
                    this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                    this.disabledForm = false;
                }
            );
        } else {
            this.registroCompra.detalle = [];
            this.registroCompra.detalle.push(this.registroCompraDetalle);
            this.registroCompraService.guardar(this.registroCompra).subscribe(
                (response) => {
                    this.dialogRef.close(response.detalle[0]);
                    this._snackBar.open('Registro completo Guardado', 'Exito!!!', appSnackPrimary);
                    this.disabledForm = false;
                },
                (err) => {
                    this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                    this.disabledForm = false;
                }
            );
        }
    }

    modificar(): void {
        if (this.registroForm.invalid) {
            this._snackBar.open('Los campos marcados con (*) son obligatorios', 'Exito!!!', appSnackWarm);
            this.registroForm.markAllAsTouched();
            return;
        }
        this.registroCompraDetalle = this.registroForm.getRawValue();

        this.disabledForm = true;
        this.registroCompraDetalleService.editar(this.registroCompraDetalle).subscribe(
            (response) => {
                this.dialogRef.close(response);
                this._snackBar.open('Registro Guardado', 'Exito!!!', appSnackPrimary);
                this.disabledForm = false;
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                this.disabledForm = false;
            }
        );
    }

    close(): void {
        this.dialogRef.close();
    }

    get f(): any {
        return this.registroForm.controls;
    }
}

