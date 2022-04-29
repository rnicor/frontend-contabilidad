import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DolarService } from './dolar.service';
import { LineaDetalleComponent } from './details/dolar-detalle.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseConfirmationService } from '../../../../@fuse/services/confirmation';
import { appSnackPrimary, appSnackWarm } from '../../../core/snack/app.snack';
import { Dolar } from './dolar.types';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
@Component({
    selector: 'dolar',
    templateUrl: './dolar.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LineasComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    isLoading: boolean = false;
    displayedColumns: string[] = ['nro', 'fecha', 'monto', 'descripcion', 'actions'];
    dataSource = new MatTableDataSource<Dolar>([]);
    lineasCount: number = 0;

    constructor(
        public dialog: MatDialog,
        private dolarService: DolarService,
        private _snackBar: MatSnackBar,
        private _fuseConfirmationService: FuseConfirmationService
    ) { }

    ngOnInit(): void {
        this.getdolares();
    }

    getdolares(): void {
        this.isLoading = true;
        this.dolarService.listar().subscribe(
            (response) => {
                console.log(response);
                this.dataSource.data = response;
                this.configPaginator();
                this.lineasCount = response.length;
                this.isLoading = false;
            },
            (err) => {
                this.isLoading = false;
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
            }
        );
    }

    openDialog(linea: Dolar): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '30%';
        dialogConfig.data = {
            linea: linea
        };
        const dialogRef = this.dialog.open(LineaDetalleComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.getdolares();
            }
        });
    }

    cargarExcel(event: any): void {
        try {
            this.dataSource.data = [];
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
            this.dataSource.data = dataExcel;
            this.configPaginator();
            this.lineasCount = dataExcel.length;
            };
            reader.readAsBinaryString(target.files[0]);
        } catch (e) {
            this._snackBar.open(e.error.message, 'Error!!!', appSnackWarm);
        }
    }

    guardarOActualizar(): void {
        this.dolarService.guardarExcel(this.dataSource.data).subscribe(
            (response) => {
                this._snackBar.open('Se guardo el excel con exito', 'Exito!!!', appSnackPrimary);
                this.getdolares();
            }
        );
    }

    eliminar(linea: Dolar): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar dolar',
            message: '¿Esta seguro(a) de eliminar la dolar: ' + linea.fecha + ' ?',
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
                this.dolarService.eliminar(linea.id).subscribe(
                    (response) => {
                        this.getdolares();
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

    reportePDF(): void {
        this.dolarService.reportePDF().subscribe(
            (data) => {
                const file = new Blob([data], { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
            }
        );
    }

    reporteEXCEL(): void {
        this.dolarService.reporteEXCEL().subscribe(
            (data) => {
                FileSaver.saveAs(data, 'reporte.xlsx');
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
            }
        );
    }

    filtrar(event: Event): void {
        const filtro = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filtro.trim().toLowerCase();
    }

    configPaginator(): void {
        setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.paginator._intl.itemsPerPageLabel = 'Lineas por página';
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
