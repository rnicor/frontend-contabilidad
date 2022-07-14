import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { appSnackWarm} from 'app/core/snack/app.snack';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {LibroMayorService} from './service/libro-mayor.service';
import {RepLibroMayorDetalle} from './type/rep-libro-mayor-detalle.types';
import {RepLibroMayor} from './type/rep-libro-mayor.types';
import {LibroMayorInicio} from './type/libro-mayor-inicio.types';

@Component({
    selector: 'libro-mayor',
    templateUrl: './libro-mayor.component.html'
})

export class LibroMayorComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['fecha', 'tipo', 'numeroComprobante', 'referencia', 'debeBoliviano', 'haberBoliviano', 'saldoBoliviano', 'debeDolar', 'haberDolar', 'saldoDolar', 'tipoCambio'];
    dataSource = new MatTableDataSource<RepLibroMayorDetalle>([]);
    reporteCount: number = 0;

    reporteFechaForm: FormGroup;

    reporte: RepLibroMayor;
    inicio: LibroMayorInicio;

    disabledForm: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private libroMayorService: LibroMayorService,
        private _snackBar: MatSnackBar,
    ) {}
    ngOnInit(): void {
        this.disabledForm = false;
        this.iniciarFormulario();
        this.libroMayorService.inicio().subscribe(
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
        this.reporteFechaForm = this.formBuilder.group({
            codigo: [null, [Validators.required]],
            fechaInicio: [null, [Validators.required]],
            fechaFin: [null, [Validators.required]]
        });
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
        this.libroMayorService.obtenerLibroMayorPorCodigoPorFecha(this.reporteFechaForm.getRawValue()).subscribe(
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


    /*reporteLibroDiarioFechaPdf(): void {
        this.disabledForm = true;
        if (this.reporteFechaForm.invalid) {
            this.reporteFechaForm.markAllAsTouched();
            this._snackBar.open('Complete todos datos requeridos', 'Error!!!', appSnackWarm);
            this.disabledForm = false;
            return;
        }
        this.libroMayorService.reporteLibroDiarioPdf(this.reporteFechaForm.getRawValue()).subscribe(
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
    }*/
    get f(): any {
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
