import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {appSnackPrimary, appSnackWarm} from '../../../../../core/snack/app.snack';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FuseConfirmationService} from '../../../../../../@fuse/services/confirmation';
import {RegistroCompraService} from '../../service/registro-compra.service';
import {AuthService} from '../../../../../core/auth/auth.service';
import {RegistroCompraInicio} from '../../type/registro-compra-inicio.types';
import {RegistroCompra} from '../../type/registro-compra.types';
import {RegistroCompraDetalle} from '../../type/registro-compra-detalle.types';
import {RegistroCompraDetalleService} from '../../service/registro-compra-detalle.service';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-registro-compra-masivo',
    templateUrl: './registro-compra-masivo.component.html'
})
export class RegistroCompraMasivoComponent implements OnInit, AfterViewInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    inicio: RegistroCompraInicio;
    formRegistroVenta: FormGroup;
        registroCompra: RegistroCompra;

    total: number;

    displayedColumns: string[] = ['nro', 'nitProveedor', 'codigoAutorizacion', 'numeroFactura', 'numeroDui', 'fechaFactura', 'importeTotalCompra', 'importeIce', 'importeIehd', 'importeIpj', 'tasas', 'otroNoSujetoIva', 'importesExentos', 'comprasGravadasTasaCero', 'subtotal', 'descuentosBonificacionesRebajasSujetasIva', 'importeGiftCard', 'importeBaseCreditoFiscal', 'creditoFiscal', 'tipoCompra', 'codigoControl'];
    dataSourceRegistroCompraDetalle = new MatTableDataSource<RegistroCompraDetalle>();
    detalleCount: number = 0;

    formRegistroCompra: FormGroup;

    buscarActivado: number;

    disabledForm: boolean;
    constructor(
        private registroCompraService: RegistroCompraService,
        private registroCompraDetalleService: RegistroCompraDetalleService,
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
        this.registroCompraService.inicio().subscribe(
            (response) => {
                this.inicio = response;
                if (this.inicio.gestiones.length>0) {
                    this.formRegistroCompra.controls['gestionId'].setValue(this.inicio.gestiones[0].id);
                }
            }
        );
        this.iniciaFormulario();
        this.formRegistroCompra.controls['gestionId'].valueChanges.subscribe( (value) => {
            this.buscarActivado = 1;
        });
        this.formRegistroCompra.controls['periodo'].valueChanges.subscribe( (value) => {
            this.buscarActivado = 1;
        });
    }

    ngAfterViewInit(): void {
        this.dataSourceRegistroCompraDetalle.sort = this.sort;
        this.dataSourceRegistroCompraDetalle.paginator = this.paginator;
    }

    importarExcel(): void {
        if (this.formRegistroCompra.invalid) {
            this._snackBar.open('Antes seleccione un gestión y un periodo', 'Error!!!', appSnackWarm);
            this.formRegistroCompra.markAllAsTouched();
            return;
        }
        this.buscarActivado = 2;
    }
    guardar(): void {
        if (this.formRegistroCompra.invalid) {
            this._snackBar.open('Los campos marcados con (*) son obligatorios', 'Exito!!!', appSnackWarm);
            this.formRegistroCompra.markAllAsTouched();
            return;
        }
        this.disabledForm = true;
        this.mapFormularioToRegistro();
        this.registroCompraService.guardar(this.registroCompra).subscribe(
            (response) => {
                this.registroCompra = response;
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
        this.registroCompra = this.registroCompra ? this.registroCompra : this.registroCompra = {
            id: null,
            gestionId: null,
            periodo: null,
            sucursalId: null,
            detalle: []
        };

        this.formRegistroCompra = this.formBuilder.group({
            gestionId: [null, Validators.required],
            periodo: [null, Validators.required],
        });
    }

    sumarTotal(): number {
        return this.dataSourceRegistroCompraDetalle.data.map(t => t.subtotal).reduce((acc, value) => Number(acc) + Number(value), 0);
    }

    getGestion(gestionId: number): string {
        const p = this.inicio.gestiones.find(m => m.id === gestionId);
        return p?p.anio:'';
    }
    get f(): any {
        return this.formRegistroCompra.controls;
    }
    private mapRegitroToFormulario(): void {
        this.formRegistroCompra.controls['gestionId'].setValue(this.registroCompra.gestionId);
        this.formRegistroCompra.controls['periodo'].setValue(this.registroCompra.periodo);
        this.dataSourceRegistroCompraDetalle.data = this.registroCompra.detalle;
        this.detalleCount = this.dataSourceRegistroCompraDetalle.data.length;
        this.configPaginator();
    }
    private mapFormularioToRegistro(): void {
        this.registroCompra.gestionId = this.formRegistroCompra.controls['gestionId'].value;
        this.registroCompra.periodo = this.formRegistroCompra.controls['periodo'].value;
        this.registroCompra.detalle = this.dataSourceRegistroCompraDetalle.data;
    }
    private configPaginator(): void{
        setTimeout(()=>{
            this.dataSourceRegistroCompraDetalle.paginator = this.paginator;
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
            const compras  = [];
            this.dataSourceRegistroCompraDetalle.data = [];
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
                if (temfila["Tipo de Compra"] != undefined ){
                    const cuenta = {
                        tipoComprobante: temfila['Tipo de Compra'],                        
                        nro: temfila['N°'],
                        especificacion: '1',
                        nitProveedor:temfila['NIT Proveedor'],
                        razonSocial:temfila['Razón Social Proveedor'],
                        codigoAutorizacion:temfila['Código de Autorización'],
                        numeroFactura:temfila['Número Factura'],
                        numeroDui:temfila['Número DUI/DIM'],
                        fechaFactura:temfila['Fecha de Factura/DUI/DIM'],
                        importeTotalCompra:temfila['Importe Total Compra'],
                        importeIce:temfila['Importe ICE'],
                        importeIehd:temfila['Importe IEHD'],
                        importeIpj:temfila['Importe IPJ'],
                        tasas:temfila['Tasas'],
                        otroNoSujetoIva:temfila['Otro No Sujeto a Crédito Fiscal'],
                        importesExentos:temfila['Importes Exentos'],
                        comprasGravadasTasaCero:temfila['Importe Compras Gravadas a Tasa Cero'],
                        subtotal:temfila['Subtotal'],
                        descuentosBonificacionesRebajasSujetasIva:temfila['Descuentos, Bonificaciones y Rebajas Sujetas a IVA'],
                        importeGiftCard:temfila['Importe Gift Card'],
                        importeBaseCreditoFiscal:temfila['Importe Base Crédito Fiscal'],
                        creditoFiscal:temfila['Crédito Fiscal'],
                        estadoCompra:'1',
                        codigoControl:temfila['Código de Control'],
                        tipoCompra:temfila['Tipo de Compra'],

                
                    };
                    compras.push(cuenta);
                }
            }
            console.log('data excel trasformada compras ',compras);
            this.dataSourceRegistroCompraDetalle.data = compras;
            this.configPaginator();
            this.detalleCount = compras.length;
            };
            reader.readAsBinaryString(target.files[0]);
        } catch (e) {
            this._snackBar.open(e.error.message, 'Error!!!', appSnackWarm);
        }
    }

    guardarOActualizar(): void {
       //this.registroVentaDetalle = this.registroForm.getRawValue();
       this.disabledForm = true;
       this.registroCompra = this.formRegistroCompra.getRawValue();
        this.registroCompraService.obtenerCompra(this.registroCompra.gestionId, this.registroCompra.periodo).subscribe(
            (response) => {
                if (response) {
                    this.registroCompra = response;
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

        this.registroCompraDetalleService.guardarExcel(6, this.dataSourceRegistroCompraDetalle.data).subscribe(
            (response) => {
                this._snackBar.open('Se guardo el excel con exito', 'Exito!!!', appSnackPrimary);
                //this.getdolares();
            }
        );
    }
}
