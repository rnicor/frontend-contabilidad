import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {appSnackPrimary, appSnackWarm} from '../../../../../core/snack/app.snack';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RegistroVentaDetalleComponent} from '../modal/registro-venta-detalle.component';
import {FuseConfirmationService} from '../../../../../../@fuse/services/confirmation';
import {RegistroVentaService} from '../../service/registro-venta.service';
import {AuthService} from '../../../../../core/auth/auth.service';
import {RegistroVentaInicio} from '../../type/registro-venta-inicio.types';
import {RegistroVenta} from '../../type/registro-venta.types';
import {RegistroVentaDetalle} from '../../type/registro-venta-detalle.types';
import {RegistroVentaDetalleService} from '../../service/registro-venta-detalle.service';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-registro-venta-masivo',
    templateUrl: './registro-venta-masivo.component.html'
})
export class RegistroVentaMasivoComponent implements OnInit, AfterViewInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    inicio: RegistroVentaInicio;

    registroVenta: RegistroVenta;

    total: number;

    displayedColumns: string[] = ['nro', 'fechaFactura', 'numeroFactura', 'codigoAutorizacion', 'nitCiCliente', 'complemento', 'nombreRazonSocial', 'importeTotalVenta', 'importeIce', 'importeIehd', 'importeIpj', 'tasas', 'otrosSujetosIva', 'exportacionesOperacionesExentas', 'ventasGravadasTasaCero', 'subtotal', 'descuetosBonificacionesRebajasSujetasIva', 'importeGiftCard', 'importeBaseDebitoFiscal', 'debitoFiscal', 'estadoVenta', 'codigoControl', 'tipoVenta'];
    dataSourceRegistroVentaDetalle = new MatTableDataSource<RegistroVentaDetalle>();
    detalleCount: number = 0;

    formRegistroVenta: FormGroup;

    buscarActivado: number;

    disabledForm: boolean;
    constructor(
        private registroVentaService: RegistroVentaService,
        private registroVentaDetalleService: RegistroVentaDetalleService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _fuseConfirmationService: FuseConfirmationService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.disabledForm = false;
        this.buscarActivado = 1;
        this.registroVentaService.inicio().subscribe(
            (response) => {
                this.inicio = response;
                if (this.inicio.gestiones.length>0) {
                    this.formRegistroVenta.controls['gestionId'].setValue(this.inicio.gestiones[0].id);
                }
            }
        );
        this.iniciaFormulario();
        this.formRegistroVenta.controls['gestionId'].valueChanges.subscribe( (value) => {
            this.buscarActivado = 1;
        });
        this.formRegistroVenta.controls['periodo'].valueChanges.subscribe( (value) => {
            this.buscarActivado = 1;
        });
    }

    ngAfterViewInit(): void {
        this.dataSourceRegistroVentaDetalle.sort = this.sort;
        this.dataSourceRegistroVentaDetalle.paginator = this.paginator;
    }

    importarExcel(): void {
        if (this.formRegistroVenta.invalid) {
            this._snackBar.open('Antes seleccione un gestión y un periodo', 'Error!!!', appSnackWarm);
            this.formRegistroVenta.markAllAsTouched();
            return;
        }
        this.buscarActivado = 2;
    }
    guardar(): void {
        if (this.formRegistroVenta.invalid) {
            this._snackBar.open('Los campos marcados con (*) son obligatorios', 'Exito!!!', appSnackWarm);
            this.formRegistroVenta.markAllAsTouched();
            return;
        }
        //  validar no repetidos
        //for data  for 
       console.log( this.dataSourceRegistroVentaDetalle.data);


        this.disabledForm = true;
        this.mapFormularioToRegistro();
        this.registroVentaService.guardar(this.registroVenta).subscribe(
            (response) => {
                this.registroVenta = response;
                this.mapRegitroToFormulario();
                this._snackBar.open('Registro Guardado', 'Exito!!!', appSnackPrimary);
                this.disabledForm = false;
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                this.disabledForm = false;
            }
        );
    }

    iniciaFormulario(): void {
        this.registroVenta = this.registroVenta ? this.registroVenta : this.registroVenta = {
            id: null,
            gestionId: null,
            periodo: null,
            sucursalId: null,
            detalle: []
        };

        this.formRegistroVenta = this.formBuilder.group({
            gestionId: [null, Validators.required],
            periodo: [null, Validators.required],
        });
    }

    sumarTotal(): number {
        return this.dataSourceRegistroVentaDetalle.data.map(t => t.subtotal).reduce((acc, value) => Number(acc) + Number(value), 0);
    }

    getGestion(gestionId: number): string {
        const p = this.inicio.gestiones.find(m => m.id === gestionId);
        return p?p.anio:'';
    }
    get f(): any {
        return this.formRegistroVenta.controls;
    }
    private mapRegitroToFormulario(): void {
        this.formRegistroVenta.controls['gestionId'].setValue(this.registroVenta.gestionId);
        this.formRegistroVenta.controls['periodo'].setValue(this.registroVenta.periodo);
        this.dataSourceRegistroVentaDetalle.data = this.registroVenta.detalle;
        this.detalleCount = this.dataSourceRegistroVentaDetalle.data.length;
        this.configPaginator();
    }
    private mapFormularioToRegistro(): void {
        this.registroVenta.gestionId = this.formRegistroVenta.controls['gestionId'].value;
        this.registroVenta.periodo = this.formRegistroVenta.controls['periodo'].value;
        this.registroVenta.detalle = this.dataSourceRegistroVentaDetalle.data;
    }
    private configPaginator(): void{
        setTimeout(()=>{
            this.dataSourceRegistroVentaDetalle.paginator = this.paginator;
            this.paginator._intl.itemsPerPageLabel = 'Productos por página';
            this.paginator._intl.previousPageLabel = 'Página anterior';
            this.paginator._intl.nextPageLabel = 'Página siguiente';
            this.paginator._intl.firstPageLabel = 'Primera página';
            this.paginator._intl.getRangeLabel = ( page: number, pageSize: number, length: number ) => {
                const start = page * pageSize + 1;
                const end = (page + 1) * pageSize;
                return `${start} - ${end} de ${length}`;
            };
        });
    }

    cargarExcel(event: any): void {
        try {
            const ventas = [];
            this.dataSourceRegistroVentaDetalle.data = [];
            const target : DataTransfer =  <DataTransfer>(event.target);
            if (target.files.length !== 1) throw new Error('Cannot use multiple files');
            const reader: FileReader = new FileReader();
            reader.onload = (e: any) => {
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary',
            cellDates: true,
            cellNF: false,
            cellText: false,});
            const workbookSheets = wb.SheetNames;
            const wsname : string = wb.SheetNames[0];
            const dataExcel: any[] = XLSX.utils.sheet_to_json(wb.Sheets[wsname], {
                header: 0, raw: false, dateNF: 'yyyy-mm-dd'
              });
            console.log('data excel',dataExcel);
            for (const temfila of dataExcel) {
                if (temfila["CODIGO DE AUTORIZACION"] != undefined ){
                    const cuenta = {
                        codigoAutorizacion: temfila["CODIGO DE AUTORIZACION"],
                        numeroFactura: temfila["N° DE LA FACTURA"],
                        fechaFactura: temfila["FECHA DE LA FACTURA"],
                        nitCiCliente: temfila["NIT / CI CLIENTE"],
                        complemento: 'no hay',
                        nombreRazonSocial: temfila["NOMBRE O RAZON SOCIAL"],
                        importeTotalVenta: temfila["IMPORTE TOTAL DE LA VENTA"],
                        importeIce: temfila["IMPORTE ICE"],
                        importeIehd: temfila["IMPORTE IEHD"],
                        importeIpj: temfila["IMPORTE IPJ"],
                        tasas: temfila["TASAS"],
                        otrosSujetosIva: temfila["OTROS NO SUJETOS AL IVA"],
                        exportacionesOperacionesExentas: temfila["EXPORTACIONES Y OPERACIONES EXENTAS"],
                        ventasGravadasTasaCero: temfila['VENTAS GRAVADAS A TASA CERO'],
                        subtotal: temfila["SUBTOTAL"],
                        subtodescuetosBonificacionesRebajasSujetasIvatal: ['DESCUENTOS, BONIFICACIONES Y REBAJAS SUJETAS AL IVA'],
                        importeGiftCard: 1,
                        importeBaseDebitoFiscal: temfila["IMPORTE BASE PARA DEBITO FISCAL"],
                        debitoFiscal: temfila["DEBITO FISCAL"],
                        estadoVenta: temfila["ESTADO"],
                        codigoControl: 'no hay',
                        tipoVenta: temfila["TIPO DE VENTA"],
                    };
                    ventas.push(cuenta);
                }
            }
            console.log('data excel trasformada',ventas);
            this.dataSourceRegistroVentaDetalle.data = ventas;
            this.configPaginator();
            this.detalleCount = ventas.length;
            };
            reader.readAsBinaryString(target.files[0]);
        } catch (e) {
            this._snackBar.open(e.error.message, 'Error!!!', appSnackWarm);
        }
    }

    guardarOActualizar(): void {
       //this.registroVentaDetalle = this.registroForm.getRawValue();
       this.disabledForm = true;
        this.registroVenta = this.formRegistroVenta.getRawValue();
        this.registroVentaService.obtenerVenta(this.registroVenta.gestionId, this.registroVenta.periodo).subscribe(
            (response) => {
                if (response) {
                    this.registroVenta = response;
                    this.mapRegitroToFormulario();
                } else {
                    this._snackBar.open('No se encontraron resultados de la búsqueda', 'Error!!!', appSnackWarm);
                }
                this.disabledForm = false;
                this.buscarActivado = 2;
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                this.disabledForm = false;
                this.buscarActivado = 3;
            });

        this.registroVentaDetalleService.guardarExcel(6, this.dataSourceRegistroVentaDetalle.data).subscribe(
            (response) => {
                this._snackBar.open('Se guardo el excel con exito', 'Exito!!!', appSnackPrimary);
                //this.getdolares();
            }
        );
    }


}
