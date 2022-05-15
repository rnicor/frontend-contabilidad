import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {appSnackPrimary, appSnackWarm} from '../../../../../core/snack/app.snack';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RegistroCompraDetalleComponent} from '../modal/registro-compra-detalle.component';
import {FuseConfirmationService} from '../../../../../../@fuse/services/confirmation';
import {RegistroCompraService} from '../../service/registro-compra.service';
import {AuthService} from '../../../../../core/auth/auth.service';
import {RegistroCompraInicio} from '../../type/registro-compra-inicio.types';
import {RegistroCompra} from '../../type/registro-compra.types';
import {RegistroCompraDetalle} from '../../type/registro-compra-detalle.types';
import {RegistroCompraDetalleService} from '../../service/registro-compra-detalle.service';

@Component({
    selector: 'app-registro-compra-simple',
    templateUrl: './registro-compra-simple.component.html'
})
export class RegistroCompraSimpleComponent implements OnInit, AfterViewInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    inicio: RegistroCompraInicio;

    registroCompra: RegistroCompra;

    total: number;

    displayedColumns: string[] = ['nro', 'nitProveedor', 'codigoAutorizacion', 'numeroFactura', 'numeroDui', 'fechaFactura', 'importeTotalCompra', 'importeIce', 'importeIehd', 'importeIpj', 'tasas', 'otroNoSujetoIva', 'importesExentos', 'comprasGravadasTasaCero', 'subtotal', 'descuentosBonificacionesRebajasSujetasIva', 'importeGiftCard', 'importeBaseCreditoFiscal', 'creditoFiscal', 'tipoCompra', 'codigoControl', 'actions',];
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

    buscar(): void {;
        if (this.formRegistroCompra.invalid) {
            this._snackBar.open('Antes seleccione un gestión y un periodo', 'Error!!!', appSnackWarm);
            this.formRegistroCompra.markAllAsTouched();
            return;
        }
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
    }

    ngAfterViewInit(): void {
        this.dataSourceRegistroCompraDetalle.sort = this.sort;
        this.dataSourceRegistroCompraDetalle.paginator = this.paginator;
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

    abrirModal(item: RegistroCompraDetalle): void {
        if(!this.registroCompra || !this.registroCompra.id) {
            this.registroCompra = this.formRegistroCompra.getRawValue();
        }
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '80%';
        dialogConfig.data = {
            registroCompra: this.registroCompra,
            registroCompraDetalle: item,
            registroCompraInicio: this.inicio
        };
        const dialogRef = this.dialog.open(RegistroCompraDetalleComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((registroCompra) => {
            if (registroCompra) {
                const data = this.dataSourceRegistroCompraDetalle.data;
                data.push(registroCompra);
                this.dataSourceRegistroCompraDetalle.data = data;
                this.detalleCount = data.length;
            }
        });
    }
    sumarTotal(): number {
        return this.dataSourceRegistroCompraDetalle.data.map(t => t.subtotal).reduce((acc, value) => Number(acc) + Number(value), 0);
    }
    eliminar(registroCompraDetalle: RegistroCompraDetalle): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar registro',
            message: '¿Esta seguro(a) de eliminar el registro con numero de factura: ' + registroCompraDetalle.numeroFactura + ' y autorización: ' + registroCompraDetalle.codigoAutorizacion + ' ?',
            actions: {
                confirm: {label: 'Eliminar'},
                cancel: {label: 'Cancelar'}
            },
            icon: {color: 'warning'}
        });
        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this.disabledForm = true;
                this.registroCompraDetalleService.eliminar(registroCompraDetalle.id).subscribe(
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
        this.registroCompra = {
            id: null,
            gestionId: null,
            periodo: null,
            sucursalId: null,
            detalle: []
        };
        this.formRegistroCompra.reset();
        this.dataSourceRegistroCompraDetalle.data = [];
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
}
