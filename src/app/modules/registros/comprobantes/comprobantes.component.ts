import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { appSnackWarm} from 'app/core/snack/app.snack';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ComprobantesService} from './service/comprobantes.service';
import {RepLibroDiarioDetalle} from '../../libros/libro-diario/type/rep-libro-diario-detalle.types';
import {RepLibroDiario} from '../../libros/libro-diario/type/rep-libro-diario.types';
import {LibriDiarioInicio} from '../../libros/libro-diario/type/libro-diario-inicio.types';

@Component({
    selector: 'comprobantes',
    templateUrl: './comprobantes.component.html'
})

export class ComprobantesComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['tipo', 'numeroComprobante', 'fecha', 'codigoCuenta', 'nombreCuenta', 'referencia', 'debeBoliviano', 'haberBoliviano', 'debeDolar', 'haberDolar'];
    dataSource = new MatTableDataSource<RepLibroDiarioDetalle>([]);
    reporteCount: number = 0;

    reporteForm: FormGroup;

    reporte: RepLibroDiario;
    inicio: LibriDiarioInicio;

    disabledForm: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private libroDiarioService: ComprobantesService,
        private _snackBar: MatSnackBar,
    ) {}
    ngOnInit(): void {
        this.disabledForm = false;
        this.iniciarFormulario();
        this.libroDiarioService.inicio().subscribe(
            (response) => {
                this.inicio = response;
            }, (err) =>  {
                this._snackBar.open( err.error.message,'Error!!!', appSnackWarm);
            }
        );
    }
    iniciarFormulario(): void {
        this.reporteForm = this.formBuilder.group({
            tipo: [null, [Validators.required]],
            mes: [null, [Validators.required]],
            numeroComprobante: [null, [Validators.required]],
        });
    }
    obtenerReporteLibroDiarioPorMes(): void {
        this.disabledForm = true;
        this.dataSource.data = [];
        if (this.reporteForm.invalid) {
            this.reporteForm.markAllAsTouched();
            this._snackBar.open('Complete todos datos requeridos', 'Error!!!', appSnackWarm);
            this.disabledForm = false;
            return;
        }
        this.libroDiarioService.obtenerReporteLibroDiarioPoComprobante(this.reporteForm.getRawValue()).subscribe(
            (response) => {
                this.reporte = response;
                this.dataSource.data = this.reporte.detalle;
                this.reporteCount = this.reporte.detalle.length;
                this.configPaginator();
                this.disabledForm = false;
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                this.disabledForm = false;
            }
        );
    }
   /* reporteResumenVentasPdf(): void {
        this.disabledForm = true;
        if (this.reporteForm.invalid) {
            this.reporteForm.markAllAsTouched();
            this._snackBar.open('Complete todos datos requeridos', 'Error!!!', appSnackWarm);
            this.disabledForm = false;
            return;
        }
        this.libroDiarioService.reporteResumenVentasPdf(this.reporteForm.getRawValue()).subscribe(
            (response) => {
                const file = new Blob([response], { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
                this.disabledForm = false;
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                this.disabledForm = false;
            }
        );
    }
    reporteResumenVentasExcel(): void {
        this.disabledForm = true;
        if (this.reporteForm.invalid) {
            this.reporteForm.markAllAsTouched();
            this._snackBar.open('Complete todos datos requeridos', 'Error!!!', appSnackWarm);
            this.disabledForm = false;
            return;
        }
        this.libroDiarioService.reporteResumenVentasExcel(this.reporteForm.getRawValue()).subscribe(
            (response) => {
                FileSaver.saveAs(response, 'reporteResumenVentas.xlsx');
                this.disabledForm = false;
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                this.disabledForm = false;
            }
        );
    }*/
    get f(): any {
        return this.reporteForm.controls;
    }
    configPaginator(): void{
        setTimeout(()=>{
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.paginator._intl.itemsPerPageLabel = 'Item por página';
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
