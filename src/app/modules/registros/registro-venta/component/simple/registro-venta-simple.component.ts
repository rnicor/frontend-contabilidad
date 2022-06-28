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

@Component({
    selector: 'app-registro-venta-simple',
    templateUrl: './registro-venta-simple.component.html'
})
export class RegistroVentaSimpleComponent implements OnInit, AfterViewInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    inicio: RegistroVentaInicio;

    registroVenta: RegistroVenta;

    total: number;

    displayedColumns: string[] = ['nro', 'fechaFactura', 'numeroFactura', 'codigoAutorizacion', 'nitCiCliente', 'complemento', 'nombreRazonSocial', 'importeTotalVenta', 'importeIce', 'importeIehd', 'importeIpj', 'tasas', 'otrosSujetosIva', 'exportacionesOperacionesExentas', 'ventasGravadasTasaCero', 'subtotal', 'descuetosBonificacionesRebajasSujetasIva', 'importeGiftCard', 'importeBaseDebitoFiscal', 'debitoFiscal', 'estadoVenta', 'codigoControl', 'tipoVenta', 'actions',];
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

    buscar(): void {;
        if (this.formRegistroVenta.invalid) {
            this._snackBar.open('Antes seleccione un gestión y un periodo', 'Error!!!', appSnackWarm);
            this.formRegistroVenta.markAllAsTouched();
            return;
        }
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
    }

    ngAfterViewInit(): void {
        this.dataSourceRegistroVentaDetalle.sort = this.sort;
        this.dataSourceRegistroVentaDetalle.paginator = this.paginator;
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

    abrirModal(item: RegistroVentaDetalle): void {
        if(!this.registroVenta || !this.registroVenta.id) {
            this.registroVenta = this.formRegistroVenta.getRawValue();
        }
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '80%';
        dialogConfig.data = {
            registroVenta: this.registroVenta,
            registroVentaDetalle: item,
            registroVentaInicio: this.inicio
        };
        const dialogRef = this.dialog.open(RegistroVentaDetalleComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((registroVenta) => {
            if (registroVenta) {
                const data = this.dataSourceRegistroVentaDetalle.data;
                data.push(registroVenta);
                this.dataSourceRegistroVentaDetalle.data = data;
                this.detalleCount = data.length;
                this.buscarActivado = 2;
                this.configPaginator();
            }
        });
    }
    sumarTotal(): number {
        return this.dataSourceRegistroVentaDetalle.data.map(t => t.subtotal).reduce((acc, value) => Number(acc) + Number(value), 0);
    }
    eliminar(registroVentaDetalle: RegistroVentaDetalle): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar registro',
            message: '¿Esta seguro(a) de eliminar el registro con numero de factura: ' + registroVentaDetalle.numeroFactura + ' y autorización: ' + registroVentaDetalle.codigoAutorizacion + ' ?',
            actions: {
                confirm: {label: 'Eliminar'},
                cancel: {label: 'Cancelar'}
            },
            icon: {color: 'warning'}
        });
        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this.disabledForm = true;
                this.registroVentaDetalleService.eliminar(registroVentaDetalle.id).subscribe(
                    (response) => {
                        this.nuevo();
                        this._snackBar.open('Se eliminó el registro', 'Exito!!!', appSnackPrimary);
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
        this.registroVenta = {
            id: null,
            gestionId: null,
            periodo: null,
            sucursalId: null,
            detalle: []
        };
        this.formRegistroVenta.reset();
        this.dataSourceRegistroVentaDetalle.data = [];
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
}
