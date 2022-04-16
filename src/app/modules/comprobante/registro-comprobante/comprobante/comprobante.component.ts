import {Component, EventEmitter, Inject, Input, OnInit, Optional, Output} from '@angular/core';
import {DatosFacturaCompra} from '../model/datos-factura-compra.model';
import {appSnackWarm} from '../../../../core/snack/app.snack';
import {InicioDatosFacturaCom} from '../model/inicio-datos-factura-com.model';
import {RegistroComprobanteService} from '../service/registro-comprobante.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.scss']
})
export class ComprobanteComponent implements OnInit {
    @Input() facturaComprobante: any;
    @Output() solicitantesEmitter: EventEmitter<any> = new EventEmitter();
    inicio: InicioDatosFacturaCom;
    isLoading: boolean = false;
    datosComprobanteForm: FormGroup;
    constructor(
        private registroComprobanteService: RegistroComprobanteService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ComprobanteComponent>,
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
            numeroComprobante: [null],
            tipoFormulario: [null],
            tipoCompra: [null],
            fechaFactura: [null],
            nit: [null],
            razonSocial: [null],
            eTicket: [null],
            numeroFactura: [null],
            numeroDui: [null],
            codigoAutorizacion: [null],
            fechaComprobante: [null],
            importeTotalCompra: [null],
            importeSinCf: [null],
            subtotal: [null],
            creditoFiscal: [null],
            codigoControl: [null],
            importeNeto: [null],
            totalIva: [null],
            importeComprasGravadasTasaCero: [null],
            importeIcei: [null],
            importeIehd: [null],
            importeIpj: [null],
            tasa: [null],
            otrosNscf: [null],
            importeExentos: [null],
            descuentoBonificacionRebajaIva: [null],
            importeGiftCard: [null],
            importeBaseCf: [null],
            sinDerCredFiscal: [null],
            gasolina: [null],
            fechaOperacion: [null]
        });
    }
    guardarDatosFormulario(): void {
        this.facturaComprobante = this.facturaComprobante ? this.facturaComprobante : this.facturaComprobante = {
            sucursalId: null,
            tipoFormulario: null,
            tipoCompra: null,
            fechaFactura: null,
            nit: null,
            razonSocial: null,
            eTicket: null,
            numeroFactura: null,
            numeroDui: null,
            codigoAutorizacion: null,
            fechaComprobante: null,
            importeTotalCompra: null,
            importeSinCf: null,
            subtotal: null,
            creditoFiscal: null,
            codigoControl: null,
            importeNeto: null,
            totalIva: null,
            importeComprasGravadasTasaCero: null,
            importeIcei: null,
            importeIehd: null,
            importeIpj: null,
            tasa: null,
            otrosNscf: null,
            importeExentos: null,
            descuentoBonificacionRebajaIva: null,
            importeGiftCard: null,
            importeBaseCf: null,
            sinDerCredFiscal: null,
            gasolina: null,
            fechaOperacion: null
        };
        //this.facturaComprobante = this.datosComprobanteForm.getRawValue();
/*        this.facturaComprobante.fechaFactura = null;
        this.facturaComprobante.fechaOperacion = null;
        this.facturaComprobante.fechaComprobante = null;*/
        //this.isLoading = true;
        this.facturaComprobante.sucursalId = this.datosComprobanteForm.value.sucursalId;
        this.facturaComprobante.tipoFormulario = this.datosComprobanteForm.value.tipoFormulario;
        this.facturaComprobante.tipoCompra = this.datosComprobanteForm.value.tipoCompra;
        this.facturaComprobante.fechaFactura = this.datosComprobanteForm.value.fechaFactura;
        this.facturaComprobante.nit = this.datosComprobanteForm.value.nit;
        this.facturaComprobante.razonSocial = this.datosComprobanteForm.value.razonSocial;
        this.facturaComprobante.eTicket = this.datosComprobanteForm.value.eTicket;
        this.facturaComprobante.numeroFactura = this.datosComprobanteForm.value.numeroFactura;
        this.facturaComprobante.numeroDui = this.datosComprobanteForm.value.numeroDui;
        this.facturaComprobante.codigoAutorizacion = this.datosComprobanteForm.value.codigoAutorizacion;
        this.facturaComprobante.fechaComprobante = this.datosComprobanteForm.value.fechaComprobante;
        this.facturaComprobante.importeTotalCompra = this.datosComprobanteForm.value.importeTotalCompra;
        this.facturaComprobante.importeSinCf = this.datosComprobanteForm.value.importeSinCf;
        this.facturaComprobante.subtotal = this.datosComprobanteForm.value.subtotal;
        this.facturaComprobante.creditoFiscal = this.datosComprobanteForm.value.creditoFiscal;
        this.facturaComprobante.codigoControl = this.datosComprobanteForm.value.codigoControl;
        this.facturaComprobante.importeNeto = this.datosComprobanteForm.value.importeNeto;
        this.facturaComprobante.totalIva = this.datosComprobanteForm.value.totalIva;
        this.facturaComprobante.importeComprasGravadasTasaCero = this.datosComprobanteForm.value.importeComprasGravadasTasaCero;
        this.facturaComprobante.importeIcei = this.datosComprobanteForm.value.importeIcei;
        this.facturaComprobante.importeIehd = this.datosComprobanteForm.value.importeIehd;
        this.facturaComprobante.importeIpj = this.datosComprobanteForm.value.importeIpj;
        this.facturaComprobante.tasa = this.datosComprobanteForm.value.tasa;
        this.facturaComprobante.otrosNscf = this.datosComprobanteForm.value.otrosNscf;
        this.facturaComprobante.importeExentos = this.datosComprobanteForm.value.importeExentos;
        this.facturaComprobante.descuentoBonificacionRebajaIva = this.datosComprobanteForm.value.descuentoBonificacionRebajaIva;
        this.facturaComprobante.importeGiftCard = this.datosComprobanteForm.value.importeGiftCard;
        this.facturaComprobante.importeBaseCf = this.datosComprobanteForm.value.importeBaseCf;
        this.facturaComprobante.sinDerCredFiscal = this.datosComprobanteForm.value.sinDerCredFiscal;
        this.facturaComprobante.gasolina = this.datosComprobanteForm.value.gasolina;
        console.log(this.facturaComprobante);
        this.registroComprobanteService.guardar(this.facturaComprobante).subscribe(
            (respuesta) => {
                this.inicio = respuesta;
                this.isLoading = false;
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error en la consulta!!!', appSnackWarm);
                this.isLoading = false;
            }
        );
    }
    editarDatosFormulario(): void {
        this.isLoading = true;
        this.registroComprobanteService.editar(this.facturaComprobante).subscribe(
            (respuesta) => {
                this.inicio = respuesta;
                this.isLoading = false;
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error en la consulta!!!', appSnackWarm);
                this.isLoading = false;
            }
        );
    }
    get f(): any {
        if (this.datosComprobanteForm !== undefined) {
            return this.datosComprobanteForm.controls;
        }
        return Optional;
    }
}
