import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FuseConfirmationService} from '../../../../@fuse/services/confirmation';
import {TipoComprobanteService} from './service/tipo-comprobante.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {TipoComprobante} from './type/tipo-comprobante.types';
import {MatTableDataSource} from '@angular/material/table';
import {appSnackPrimary, appSnackWarm} from '../../../core/snack/app.snack';
import {TipoComprobanteDetalleComponent} from './modal/tipo-comprobante-detalle.component';

@Component({
    selector: 'app-tipo-comprobante',
    templateUrl: './tipo-comprobante.component.html',
    styleUrls: ['./tipo-comprobante.component.scss']
})
export class TipoComprobanteComponent implements OnInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    isLoading: boolean = false;
    displayedColumns: string[] = ['nro', 'nombre', 'actions'];
    dataSource = new MatTableDataSource<TipoComprobante>([]);
    tipoComprobanteCount: number = 0;

    constructor(
        public dialog: MatDialog,
        private tipoComprobanteService: TipoComprobanteService,
        private _snackBar: MatSnackBar,
        private _fuseConfirmationService: FuseConfirmationService
    ) {
    }

    ngOnInit(): void {
        this.getTipoComprobantes();
    }

    getTipoComprobantes(): void {
        this.isLoading = true;

        this.tipoComprobanteService.listar().subscribe(
            (response) => {
                this.dataSource.data = response;
                this.configPaginator();
                this.tipoComprobanteCount = response.length;
                this.isLoading = false;
            },
            (err) => {
                this.isLoading = false;
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
            }
        );

    }

    eliminar(tipoComprobante: TipoComprobante): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar tipoComprobante',
            message: '¿Esta seguro(a) de eliminar el tipoComprobante: ' + tipoComprobante.nombre + ' ?',
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
            this.isLoading = true;
            if (result === 'confirmed') {
                this.tipoComprobanteService.eliminar(tipoComprobante.id).subscribe(
                    (response) => {
                        this.getTipoComprobantes();
                        this._snackBar.open(response.mensaje, 'Exito!!!', appSnackPrimary);
                    },
                    (err) => {
                        this.isLoading = false;
                        this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                    });
            } else {
                this.isLoading = false;
            }
        });
    }

    filtrar(event: Event): void {
        const filtro = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filtro.trim().toLowerCase();
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

    reportePDF(): void {
        /*this.lineaService.reportePDF().subscribe(
            (data) => {
                const file = new Blob([data], { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
            }
        );*/
    }

    reporteEXCEL(): void {
        /*this.lineaService.reporteEXCEL().subscribe(
            (data) => {
                FileSaver.saveAs(data, 'reporte.xlsx');
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
            }
        );*/
    }


    configPaginator(): void {
        setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.paginator._intl.itemsPerPageLabel = 'Tipo Comprobantes por página';
            this.paginator._intl.previousPageLabel = 'Página anterior';
            this.paginator._intl.nextPageLabel = 'Página siguiente';
            this.paginator._intl.firstPageLabel = 'Primera página';
            this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
                const start = page * pageSize + 1;
                const end = (page + 1) * pageSize;
                return `${start} - ${end} de ${length}`;
            };
        });
    }

}
