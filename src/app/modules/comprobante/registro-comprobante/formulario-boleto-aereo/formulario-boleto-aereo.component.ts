import {Component, EventEmitter, Inject, Input, OnInit, Optional, Output} from '@angular/core';
import {DatosFacturaCompra} from '../model/datos-factura-compra.model';
import {InicioDatosFacturaCom} from '../model/inicio-datos-factura-com.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RegistroComprobanteService} from '../service/registro-comprobante.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {appSnackWarm} from '../../../../core/snack/app.snack';
import {FormularioCompraComponent} from '../formulario-compra/formulario-compra.component';

@Component({
  selector: 'app-formulario-boleto-areo',
  templateUrl: './formulario-boleto-aereo.component.html',
  styleUrls: ['./formulario-boleto-aereo.component.scss']
})
export class FormularioBoletoAereoComponent implements OnInit {
    @Input() facturaComprobante: DatosFacturaCompra;
    inicio: InicioDatosFacturaCom;
    isLoading: boolean = false;
    datosComprobanteForm: FormGroup;
    tipoRegistro: string;
    constructor(
        private registroComprobanteService: RegistroComprobanteService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<FormularioCompraComponent>,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        //this.facturaComprobante = new DatosFacturaCompra();
        if (data) {
            this.inicio = data.inicio;
        }
    }
    ngOnInit(): void {
        this.datosComprobanteForm = this.formBuilder.group({
            sucursalId: [null],
            fechaFactura: [null],
            nit: [null],
            eTicket: [null],
            razonSocial: [null],
            importeTotalCompra: [null],
            importeSinCf: [null],
            descuentoBonificacionRebajaIva: [null],
            importeBaseCf: [0],
            creditoFiscal: [0],
            codigoControl: [null],
            tipoCompra: [null]
        });
    }
    get f(): any {
        if (this.datosComprobanteForm !== undefined) {
            return this.datosComprobanteForm.controls;
        }
        return Optional;
    }
    guardarDatosFormulario(): void {
        this.facturaComprobante = this.datosComprobanteForm.getRawValue();
        this.facturaComprobante.subtotal = this.facturaComprobante.importeTotalCompra;
        this.facturaComprobante.numeroDui = 0;
        this.facturaComprobante.codigoAutorizacion = '1';
        this.facturaComprobante.importeBaseCf = this.facturaComprobante.importeTotalCompra;
        //this.facturaComprobante.creditoFiscal = this.facturaComprobante.importeTotalCompra;
        console.log(this.facturaComprobante);
        this.registroComprobanteService.guardar(this.facturaComprobante).subscribe(
            (respuesta) => {
                this.facturaComprobante = respuesta;
                this.isLoading = false;
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error en la consulta!!!', appSnackWarm);
                this.isLoading = false;
            }
        );
    }
}
