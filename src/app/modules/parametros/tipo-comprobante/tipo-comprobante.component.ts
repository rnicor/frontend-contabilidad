import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FuseConfirmationService} from '../../../../@fuse/services/confirmation';
import {appSnackPrimary, appSnackWarm} from '../../../core/snack/app.snack';
import {TipoComprobanteService} from './service/tipo-comprobante.service';
import {TipoComprobante} from './type/tipo-comprobante.types';
import {TipoComprobanteDetalleComponent} from './modal/tipo-comprobante-detalle.component';

@Component({
    selector     : 'tipo-comprobante',
    templateUrl  : './tipo-comprobante.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TipoComprobanteComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns: string[] = ['numero', 'nombre', 'actions'];
    dataSource = new MatTableDataSource<TipoComprobante>([]);
    tiposCount: number = 0;

    disabledForm: boolean;
    constructor(
        public dialog: MatDialog,
        private tipoComprobanteService: TipoComprobanteService,
        private _snackBar: MatSnackBar,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        this.getTipoComprobantes();
    }

    getTipoComprobantes(): void {
        this.tipoComprobanteService.listar().subscribe(
            (response) => {
                this.dataSource.data = response;
                this.configPaginator();
                this.tiposCount = response.length;
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
            }
        );
    }

    openDialog(tipoComprobante: TipoComprobante): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '30%';
        dialogConfig.data = {
            tipoComprobante: tipoComprobante
        };
        const dialogRef = this.dialog.open(TipoComprobanteDetalleComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.getTipoComprobantes();
            }
        });
    }

    eliminar(tipoComprobante: TipoComprobante): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar tipo comprobante',
            message: '¿Esta seguro(a) de eliminar el tipo comprobante: ' + tipoComprobante.nombre + ' ?',
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
                this.tipoComprobanteService.eliminar(tipoComprobante.id).subscribe(
                    (response) => {
                        this.getTipoComprobantes();
                        this._snackBar.open(response.mensaje, 'Exito!!!', appSnackPrimary);
                    },
                    (err) => {

                        this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                    });
            } else {

            }
        });
    }

    filtrar(event: Event): void {
        const filtro = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filtro.trim().toLowerCase();
    }

    configPaginator(): void{
        setTimeout(()=>{
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.paginator._intl.itemsPerPageLabel = 'TipoComprobantes por página';
            this.paginator._intl.previousPageLabel = 'Página anterior';
            this.paginator._intl.nextPageLabel = 'Página siguiente';
            this.paginator._intl.firstPageLabel = 'Primera página';
            this.paginator._intl.getRangeLabel = ( page: number, pageSize: number, length: number) => {
                const start = page * pageSize + 1;
                const end = (page + 1) * pageSize;
                return `${start} - ${end} de ${length}`;
            };
        });
    }
}
