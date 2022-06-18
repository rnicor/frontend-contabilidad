import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Cuenta} from './type/cuenta.types';
import {AuthService} from '../../../core/auth/auth.service';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FuseConfirmationService} from '../../../../@fuse/services/confirmation';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatRadioButton, MatRadioChange} from '@angular/material/radio';
import {CuentaDetalleComponent} from './details/cuenta-detalle.component';
import {CuentaService} from './service/cuentas.service';
import {appSnackPrimary, appSnackWarm} from '../../../core/snack/app.snack';
import {CuentaInicio} from './type/cuenta-inicio.types';

@Component({
    selector: 'app-cuentas',
    templateUrl: './cuentas.component.html'
})
export class CuentasComponent implements OnInit, AfterViewInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    inicio: CuentaInicio;

    dataSourceCuenta = new MatTableDataSource<Cuenta>([]);
    dataSourceCuentaAux = new MatTableDataSource<Cuenta>([]);
    displayedColumns: string[] = ['codigo', 'nombreCuenta', 'moneda', 'nivel', 'actions'];
    cuentaCount: number = 0;

    opcionBusqueda: string;
    listaBusqueda: string[] = ['Grupo', 'Sub grupo', 'Rubro', 'Cuenta', 'Sub cuenta', 'Todos'];

    defaultFilterPredicate?: (data: any, filter: string) => boolean;
    constructor(
        private cuentaService: CuentaService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _fuseConfirmationService: FuseConfirmationService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.opcionBusqueda = 'Todos';
        this.cuentaService.inicio().subscribe(
            (response) => {
                this.inicio = response;
                this.cuentaService.listar().subscribe(
                    (cuentas) => {
                        this.dataSourceCuenta.data = cuentas;
                        this.dataSourceCuentaAux.data = cuentas;
                        this.cuentaCount = cuentas.length;
                    }
                );
            }
        );

    }

    ngAfterViewInit(): void {
        this.configPaginator();
    }

    onChange(mrChange: MatRadioChange): void {
        this.dataSourceCuenta.data = this.dataSourceCuentaAux.data;

        const mrButton: MatRadioButton = mrChange.source;

        if (mrChange.value=== 'Grupo'){
            this.dataSourceCuenta.filterPredicate = this.defaultFilterPredicate;
            this.dataSourceCuenta.data = this.dataSourceCuenta.data.filter(item => item.nivelCuenta === 'G');

        }
        if (mrChange.value=== 'Sub grupo'){
            this.dataSourceCuenta.filterPredicate = this.defaultFilterPredicate;
            this.dataSourceCuenta.data = this.dataSourceCuenta.data.filter(item => item.nivelCuenta === 'SG');

        }
        if (mrChange.value=== 'Sub grupo'){
            this.dataSourceCuenta.filterPredicate = this.defaultFilterPredicate;
            this.dataSourceCuenta.data = this.dataSourceCuenta.data.filter(item => item.nivelCuenta === 'SG');

        }
        if (mrChange.value=== 'Rubro'){
            this.dataSourceCuenta.filterPredicate = this.defaultFilterPredicate;
            this.dataSourceCuenta.data = this.dataSourceCuenta.data.filter(item => item.nivelCuenta === 'R');
        }
        if (mrChange.value=== 'Cuenta'){
            this.dataSourceCuenta.filterPredicate = this.defaultFilterPredicate;
            this.dataSourceCuenta.data = this.dataSourceCuenta.data.filter(item => item.nivelCuenta === 'CC');
        }
        if (mrChange.value=== 'Sub cuenta'){
            this.dataSourceCuenta.filterPredicate = this.defaultFilterPredicate;
            this.dataSourceCuenta.data = this.dataSourceCuenta.data.filter(item => item.nivelCuenta === 'SC');
        }
        if (mrChange.value=== 'Todos'){
            this.dataSourceCuenta.filterPredicate = this.defaultFilterPredicate;
        }
    }

    openDialog(cuenta: Cuenta): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '50%';
        dialogConfig.data = {
            cuenta: cuenta,
            inicio: this.inicio,
        };
        const dialogRef = this.dialog.open(CuentaDetalleComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.getCuenta();
            }
        });
    }

    eliminar(cuenta: Cuenta): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar la cuenta',
            message: '¿Esta seguro(a) de eliminar la cuenta: ' + cuenta.nombre + ' ?',
            actions: {
                confirm: {
                    label: 'Eliminar'
                },
                cancel: {
                    label: 'Cancelar'
                }
            },
            icon: {
                color: 'warning'
            }
        });

        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this.cuentaService.eliminar(cuenta.id).subscribe(
                    (response) => {
                        this.getCuenta();
                        this._snackBar.open(response.mensaje, 'Exito!!!', appSnackPrimary);
                    },
                    (err) => {
                        this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                    });
            }
        });
    }

    getCuenta(): void {
        this.cuentaService.listar().subscribe(
            (response) => {
                this.dataSourceCuenta.data = response;
                this.dataSourceCuentaAux.data = response;
                this.configPaginator();
                this.cuentaCount = response.length;
            },
            (err) =>{
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
            }
        );
    }

    filtrar(event: Event): void {
        const filtro = (event.target as HTMLInputElement).value;
        this.dataSourceCuenta.filter = filtro.trim().toLowerCase();
    }

    configPaginator(): void{
        setTimeout(()=>{
            this.dataSourceCuenta.paginator = this.paginator;
            this.dataSourceCuenta.sort = this.sort;
            this.paginator._intl.itemsPerPageLabel = ' cuenta por página';
            this.paginator._intl.previousPageLabel = 'Página anterior';
            this.paginator._intl.nextPageLabel = 'Página siguiente';
            this.paginator._intl.firstPageLabel = 'Primera página';
            this.paginator._intl.lastPageLabel = 'Ultima página';
            this.paginator._intl.getRangeLabel = ( page: number, pageSize: number, length: number) => {
                const start = page * pageSize + 1;
                const end = (page + 1) * pageSize;
                return `${start} - ${end} de ${length}`;
            };
        });
    }
}
