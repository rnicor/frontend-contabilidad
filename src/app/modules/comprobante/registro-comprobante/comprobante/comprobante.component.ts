import {Component, EventEmitter, Inject, Input, OnInit, Optional, Output} from '@angular/core';
import {appSnackWarm} from '../../../../core/snack/app.snack';
import {InicioDatosFacturaCom} from '../model/inicio-datos-factura-com.model';
import {RegistroComprobanteService} from '../service/registro-comprobante.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup} from '@angular/forms';
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
    tipoRegistro: string;
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
            tipoRegistro:[null],
            sucursalId: [null],
            numeroComprobante: [null],
            fechaComprobante: [null],
            tipoFormulario: [null]
        });
    }

    get f(): any {
        if (this.datosComprobanteForm !== undefined) {
            return this.datosComprobanteForm.controls;
        }
        return Optional;
    }
    seleccionarTipoRegistro(evento: any): void {
        this.tipoRegistro = evento;
    }
}
