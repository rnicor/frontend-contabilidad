import {ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {InicioDatosFacturaCom} from './model/inicio-datos-factura-com.model';
import {DatosFacturaCompra} from './model/datos-factura-compra.model';
import {RegistroComprobanteService} from './service/registro-comprobante.service';
import {ComprobanteComponent} from './comprobante/comprobante.component';
import {appSnackWarm} from '../../../core/snack/app.snack';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-registro-comprobante',
  templateUrl: './registro-comprobante.component.html',
  styleUrls: ['./registro-comprobante.component.scss']
})
export class RegistroComprobanteComponent implements OnInit {
    @ViewChild('comprobante', {static: false}) comprobante: ComprobanteComponent;
    inicio: InicioDatosFacturaCom;
    datosFactura: DatosFacturaCompra;
    isLoading: boolean = false;
    constructor(
        private registroComprobanteService: RegistroComprobanteService,
        private _snackBar: MatSnackBar,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.obtenerDatosIniciales();
    }
    obtenerDatosIniciales(): void {
        this.isLoading = true;
        this.registroComprobanteService.obtenerDatosIniciales().subscribe(
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
    eliminarDatosFormulario(): void {
        this.isLoading = true;
        this.registroComprobanteService.obtenerDatosIniciales().subscribe(
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
    registrarComprobante(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            inicio: this.inicio,
            datosFactura: this.datosFactura
            //codCuenta: cuenta,
        };
        dialogConfig.width = '50%';
        const dialogRef = this.dialog.open(ComprobanteComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data)=>{
            //this.formGroupCodigoFijoContable.controls[codigoCuenta].setValue(data.codigo.toString());
            //this.formGroupCodigoFijoContable.controls[nombreControl].setValue(data.nombre.toString());
        });
    }
}
