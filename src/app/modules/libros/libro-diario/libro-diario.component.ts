import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { appSnackWarm} from 'app/core/snack/app.snack';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {RepLibroDiarioDetalle} from './type/rep-libro-diario-detalle.types';
import {RepLibroDiario} from './type/rep-libro-diario.types';
import {LibroDiarioService} from './service/libro-diario.service';
import {LibriDiarioInicio} from './type/libro-diario-inicio.types';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'libro-diario',
    templateUrl: './libro-diario.component.html'
})

export class LibroDiarioComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['tipo', 'numeroComprobante', 'fecha', 'codigoCuenta', 'nombreCuenta', 'referencia', 'debeBoliviano', 'haberBoliviano', 'debeDolar', 'haberDolar'];
    dataSource = new MatTableDataSource<RepLibroDiarioDetalle>([]);
    reporteCount: number = 0;

    reporteMesForm: FormGroup;
    reporteFechaForm: FormGroup;

    reporte: RepLibroDiario;
    inicio: LibriDiarioInicio;

    disabledForm: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private libroDiarioService: LibroDiarioService,
        private _snackBar: MatSnackBar,
    ) {}
    ngOnInit(): void {
        this.disabledForm = false;
        this.iniciarFormulario();
        this.libroDiarioService.inicio().subscribe(
            (response) => {
                this.inicio = response;
                this.reporteFechaForm.controls['fechaInicial'].setValue(response.fecha);
                this.reporteFechaForm.controls['fechaFinal'].setValue(response.fecha);
            }, (err) =>  {
                this._snackBar.open( err.error.message,'Error!!!', appSnackWarm);
            }
        );
    }
    iniciarFormulario(): void {
        this.reporteMesForm = this.formBuilder.group({
            tipo: [null, [Validators.required]],
            mes: [null, [Validators.required]]
        });
        this.reporteFechaForm = this.formBuilder.group({
            tipo: [null, [Validators.required]],
            fechaInicio: [null, [Validators.required]],
            fechaFin: [null, [Validators.required]]
        });
    }
    obtenerReporteLibroDiarioPorMes(): void {
        this.disabledForm = true;
        this.dataSource.data = [];
        if (this.reporteMesForm.invalid) {
            this.reporteMesForm.markAllAsTouched();
            this._snackBar.open('Complete todos datos requeridos', 'Error!!!', appSnackWarm);
            this.disabledForm = false;
            return;
        }
        this.libroDiarioService.obtenerReporteLibroDiarioPorMes(this.reporteMesForm.getRawValue()).subscribe(
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
    obtenerReporteLibroDiarioPorFecha(): void {
        this.disabledForm = true;
        this.dataSource.data = [];
        if (this.reporteFechaForm.invalid) {
            this.reporteFechaForm.markAllAsTouched();
            this._snackBar.open('Complete todos datos requeridos', 'Error!!!', appSnackWarm);
            this.disabledForm = false;
            return;
        }
        this.libroDiarioService.obtenerReporteLibroDiarioPorFecha(this.reporteFechaForm.getRawValue()).subscribe(
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
    reporteLibroDiarioMesPdf(): void {
        this.disabledForm = true;
        if (this.reporteMesForm.invalid) {
            this.reporteMesForm.markAllAsTouched();
            this._snackBar.open('Complete todos datos requeridos', 'Error!!!', appSnackWarm);
            this.disabledForm = false;
            return;
        }
        this.libroDiarioService.reporteLibroDiarioPdf(this.reporteMesForm.getRawValue()).subscribe(
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

    reporteLibroDiarioFechaPdf(): void {
        this.disabledForm = true;
        if (this.reporteFechaForm.invalid) {
            this.reporteFechaForm.markAllAsTouched();
            this._snackBar.open('Complete todos datos requeridos', 'Error!!!', appSnackWarm);
            this.disabledForm = false;
            return;
        }
        this.libroDiarioService.reporteLibroDiarioPdf(this.reporteFechaForm.getRawValue()).subscribe(
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

    reporteLibroDiarioFechaExcel(): void {
        this.disabledForm = true;
        if (this.reporteFechaForm.invalid) {
            this.reporteFechaForm.markAllAsTouched();
            this._snackBar.open('Complete todos datos requeridos', 'Error!!!', appSnackWarm);
            this.disabledForm = false;
            return;
        }
        this.libroDiarioService.reporteLibroDiarioExcel(this.reporteFechaForm.getRawValue()).subscribe(
            (response) => {
                FileSaver.saveAs(response, 'reporteLibroDiarioFechaExcel.xlsx');
                this.disabledForm = false;
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                this.disabledForm = false;
            }
        );
    }
    reporteLibroDiarioMesExcel(): void {
        this.disabledForm = true;
        if (this.reporteMesForm.invalid) {
            this.reporteMesForm.markAllAsTouched();
            this._snackBar.open('Complete todos datos requeridos', 'Error!!!', appSnackWarm);
            this.disabledForm = false;
            return;
        }
        this.libroDiarioService.reporteLibroDiarioExcel(this.reporteMesForm.getRawValue()).subscribe(
            (response) => {
                FileSaver.saveAs(response, 'reporteLibroDiarioMesExcel.xlsx');
                this.disabledForm = false;
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                this.disabledForm = false;
            }
        );
    }
    get fm(): any {
        return this.reporteMesForm.controls;
    }
    get ff(): any {
        return this.reporteFechaForm.controls;
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
