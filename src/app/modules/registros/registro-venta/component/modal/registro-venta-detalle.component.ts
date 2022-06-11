import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RegistroVentaService} from '../../service/registro-venta.service';
import {RegistroVentaDetalleService} from '../../service/registro-venta-detalle.service';
import {RegistroVenta} from '../../type/registro-venta.types';
import {RegistroVentaInicio} from '../../type/registro-venta-inicio.types';
import {RegistroVentaDetalle} from '../../type/registro-venta-detalle.types';
import {appSnackPrimary, appSnackWarm} from '../../../../../core/snack/app.snack';

@Component({
    selector       : 'registro-venta-detalle',
    templateUrl    : './registro-venta-detalle.component.html'
})
export class RegistroVentaDetalleComponent implements OnInit {
    registroForm: FormGroup;
    registroVentaInicio: RegistroVentaInicio;
    registroVenta: RegistroVenta;
    registroVentaDetalle: RegistroVentaDetalle;
    disabledForm: boolean;

    constructor(
        private _snackBar: MatSnackBar,
        public dialog: MatDialog,
        private registroVentaService: RegistroVentaService,
        private registroVentaDetalleService: RegistroVentaDetalleService,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<RegistroVentaDetalleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (data) {
            this.registroVentaInicio = data.registroVentaInicio;
            this.registroVenta = data.registroVenta;
            this.registroVentaDetalle = data.registroVentaDetalle;
        }
    }

    ngOnInit(): void {
        this.registroVentaDetalle = this.registroVentaDetalle ? this.registroVentaDetalle : {
            id: null,
            tipoComprobante: null,
            nro: null,
            especificacion: null,
            fechaFactura: null,
            numeroFactura: null,
            codigoAutorizacion: null,
            nitCiCliente: null,
            complemento: null,
            nombreRazonSocial: null,
            importeTotalVenta: 0.0,
            importeIce: 0.0,
            importeIehd: 0.0,
            importeIpj: 0.0,
            tasas: 0.0,
            otrosSujetosIva: 0.0,
            exportacionesOperacionesExentas: 0.0,
            ventasGravadasTasaCero: 0.0,
            subtotal: 0.0,
            descuetosBonificacionesRebajasSujetasIva: 0.0,
            importeGiftCard: 0.0,
            importeBaseDebitoFiscal: 0.0,
            debitoFiscal: 0.0,
            estadoVenta: 'V',
            codigoControl: null,
            tipoVenta: 1,
        };
        this.registroForm = this._formBuilder.group({
            id:                                         [this.registroVentaDetalle.id],
            tipoComprobante:                            [this.registroVentaDetalle.tipoComprobante],
            nro:                                        [this.registroVentaDetalle.nro],
            especificacion:                             [this.registroVentaDetalle.especificacion],
            fechaFactura:                               [this.registroVentaDetalle.fechaFactura, [Validators.required]],
            numeroFactura:                              [this.registroVentaDetalle.numeroFactura, [Validators.required]],
            codigoAutorizacion:                         [this.registroVentaDetalle.codigoAutorizacion, [Validators.required]],
            nitCiCliente:                               [this.registroVentaDetalle.nitCiCliente, [Validators.required]],
            complemento:                                [this.registroVentaDetalle.complemento, [Validators.required]],
            nombreRazonSocial:                          [this.registroVentaDetalle.nombreRazonSocial, [Validators.required]],
            importeTotalVenta:                          [this.registroVentaDetalle.importeTotalVenta, [Validators.required]],
            importeIce:                                 [this.registroVentaDetalle.importeIce, [Validators.required]],
            importeIehd:                                [this.registroVentaDetalle.importeIehd, [Validators.required]],
            importeIpj:                                 [this.registroVentaDetalle.importeIpj, [Validators.required]],
            tasas:                                      [this.registroVentaDetalle.tasas, [Validators.required]],
            otrosSujetosIva:                            [this.registroVentaDetalle.otrosSujetosIva, [Validators.required]],
            exportacionesOperacionesExentas:            [this.registroVentaDetalle.exportacionesOperacionesExentas, [Validators.required]],
            ventasGravadasTasaCero:                     [this.registroVentaDetalle.ventasGravadasTasaCero, [Validators.required]],
            subtotal:                                   [this.registroVentaDetalle.subtotal, [Validators.required]],
            descuetosBonificacionesRebajasSujetasIva:   [this.registroVentaDetalle.descuetosBonificacionesRebajasSujetasIva, [Validators.required]],
            importeGiftCard:                            [this.registroVentaDetalle.importeGiftCard, [Validators.required]],
            importeBaseDebitoFiscal:                    [this.registroVentaDetalle.importeBaseDebitoFiscal, [Validators.required]],
            debitoFiscal:                               [ { value:this.registroVentaDetalle.debitoFiscal, disabled:true }, [Validators.required]],
            estadoVenta:                                [this.registroVentaDetalle.estadoVenta, [Validators.required]],
            codigoControl:                              [this.registroVentaDetalle.codigoControl, [Validators.required]],
            tipoVenta:                                  [this.registroVentaDetalle.tipoVenta, [Validators.required]],
        });

        this.registroForm.controls['debitoFiscal'].enable();
        let suma = 9;
        this.registroForm.valueChanges.subscribe( x => { 
            
             suma = x.debitoFiscal + x.importeBaseDebitoFiscal; 
            console.log(this.registroForm.get("debitoFiscal").value); 

            console.log(suma); 
            /*if(){
                
            }*/
            this.registroForm.controls.subtotal.setValue(suma);
          //  this.registroForm.controls['subtotal'].setValue(suma);
    });
    this.registroForm.controls.subtotal.setValue(suma);

        /*
        this.registroForm.controls.subtotal.valueChanges.subscribe(x => {
            console.log(x.debitoFiscal + x.importeBaseDebitoFiscal);
      });*/
        /*this.registroForm.get('subtotal').valueChanges.subscribe(x => {
            console.log('name has changed:',             x.debitoFiscal + x.importeBaseDebitoFiscal)
            
      });*/
            

    }

    guardar(): void {
        if (this.registroForm.invalid) {
            this._snackBar.open('Los campos marcados con (*) son obligatorios', 'Exito!!!', appSnackWarm);
            this.registroForm.markAllAsTouched();
            return;
        }
        this.registroVentaDetalle = this.registroForm.getRawValue();

        this.disabledForm = true;
        if (this.registroVenta.id){
            this.registroVentaDetalleService.guardar(this.registroVenta.id, this.registroVentaDetalle).subscribe(
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
            this.registroVenta.detalle = [];
            this.registroVenta.detalle.push(this.registroVentaDetalle);
            this.registroVentaService.guardar(this.registroVenta).subscribe(
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
        this.registroVentaDetalle = this.registroForm.getRawValue();

        this.disabledForm = true;
        this.registroVentaDetalleService.editar(this.registroVentaDetalle).subscribe(
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

