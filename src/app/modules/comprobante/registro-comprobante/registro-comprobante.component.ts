import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnInit,
    Renderer2,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {InicioDatosFacturaCom} from './model/inicio-datos-factura-com.model';
import {DatosFacturaCompra} from './model/datos-factura-compra.model';
import {RegistroComprobanteService} from './service/registro-comprobante.service';
import {ComprobanteComponent} from './comprobante/comprobante.component';
import {appSnackWarm} from '../../../core/snack/app.snack';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Dominio} from '../../../core/user/dominio.types';
import {TipoComprobante} from '../../parametros/tipo-comprobante/type/tipo-comprobante.types';
import {RegistroComprobante} from './model/registro-comprobante.model';
import {MatTableDataSource} from '@angular/material/table';
import {RegistroComprobanteDetalle} from './model/registro-comprobante-detalle.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-registro-comprobante',
  templateUrl: './registro-comprobante.component.html',
  styleUrls: ['./registro-comprobante.component.scss']
})
export class RegistroComprobanteComponent implements OnInit, AfterViewInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild('comprobante', {static: false}) comprobante: ComprobanteComponent;
    inicio: InicioDatosFacturaCom;
    datosFactura: DatosFacturaCompra;
    isLoading: boolean = false;
    tipoMoneda: Dominio[];
    tipoComprobante: TipoComprobante[];
    validarPeticion: boolean;

    formRegistroComprobante: FormGroup;
    registroComprobante: RegistroComprobante;

    //Tabla de ComprobanteDetalle
    dataSourceComprobanteDetalle = new MatTableDataSource<RegistroComprobanteDetalle>();
    displayedColumns: string[] = ['nro', 'codigoPlanCuenta', 'nombrePlanCuenta', 'referencia', 'cc', 'debeBoliviano', 'haberBoliviano', 'debeDolar', 'haberDolar', 'banco', 'nroCheque', 'iva', 'actions'];
    listaTotalComprobanteDetalle: RegistroComprobanteDetalle[];

    constructor(
        private registroComprobanteService: RegistroComprobanteService,
        private formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        public dialog: MatDialog
    ) {
        this.buildForm();
    }

    ngOnInit(): void {
        this.obtenerDatosIniciales();



        this.registroComprobanteService.inicio().subscribe(
            (response) => {
                this.formRegistroComprobante.controls['nroComprobante'].setValue(response.nroComprobante);
                this.formRegistroComprobante.controls['nroRecibo'].setValue(response.nroRecibo);
                this.formRegistroComprobante.controls['fecha'].setValue(response.fecha);
                this.tipoComprobante = response.tipoComprobanteDTO;
                this.tipoMoneda = response.tipoMoneda;
            }
        );

    }

    ngAfterViewInit(): void {
        this.dataSourceComprobanteDetalle.sort = this.sort;
        this.dataSourceComprobanteDetalle.paginator = this.paginator;
    }

    private buildForm(): void{
        /*
    private Long tipoComprobanteId;
        *
        */


        this.formRegistroComprobante = this.formBuilder.group({
            tipoComprobanteId: ['', [Validators.required]],
            fecha: [''],
            tipoMoneda: ['',[Validators.required]],
            valorCambio: ['', [Validators.required]],
            pagadoA: ['', [Validators.required]],
            valorNitCi: ['', [Validators.required]],
            nroRecibo: [''],
            nroComprobante: [''],
            glosa: ['', [Validators.required]],
            totalDebeBoliviano: [''],
            totalHaberBoliviano: [''],
            totalHaberDolar: [''],
            totalDebeDolar: [''],
            diferenciaDebeBoliviano: [''],
            diferenciaHaberBoliviano: [''],
            diferenciaDebeDolar: [''],
            diferenciaHaberDolar: ['']

        });
    }

    public guardarOActualizar(): void{

        this.validarPeticion = true;
        if (this.formRegistroComprobante.valid){

            this.registroComprobanteService.guardarRegistroComprobante(this.formRegistroComprobante.value).subscribe(
                (response) => {
                    this.registroComprobante = response;
                }
            );



            this.validarPeticion = false;
        }else{
            this.formRegistroComprobante.markAllAsTouched();
            this._snackBar.open('Revisar los campos ingresados', 'Error!!!', appSnackWarm);
            this.validarPeticion = false;
        }


    }

    get getTipoComprobanteId(){
        return this.formRegistroComprobante.get('tipoComprobanteId');
    }

    get getTipoMoneda(){
        return this.formRegistroComprobante.get('tipoMoneda');
    }

    get getValorCambio(){
        return this.formRegistroComprobante.get('valorCambio');
    }

    get getPagadoA(){
        return this.formRegistroComprobante.get('pagadoA');
    }

    get getValorNitCi(){
        return this.formRegistroComprobante.get('valorNitCi');
    }


    get getGlosa(){
        return this.formRegistroComprobante.get('glosa');
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
