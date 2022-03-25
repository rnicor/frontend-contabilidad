import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {PlanCuenta} from '../../plan-cuentas/type/plan-cuenta.types';
import {MatTableDataSource} from '@angular/material/table';
import {PlanCuentaFachada} from '../../plan-cuentas/type/plan-cuenta-fachada.types';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PlanCuentaService} from '../../plan-cuentas/service/plan-cuentas.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {appSnackWarm} from '../../../../core/snack/app.snack';
import {FormControl} from '@angular/forms';


@Component({
    selector: 'plan-cuenta-modal',
    templateUrl: './plan-cuenta-modal.component.html',
    styles: []
})

export class PlanCuentaModalComponent implements OnInit, AfterViewInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    codigoCuenta: number;
    planCuenta: PlanCuenta;

    //variable para realizar la busqueda sobre el conjunto de datos
    searchInputControl: FormControl = new FormControl();

    displayedColumns: string[] = ['codigo', 'nombreCuenta', 'nivel', 'moneda'];
    dataSource = new MatTableDataSource<PlanCuentaFachada>([]);

    //variable que enumera el plan de cuentas.
    planCuentaCount: number = 0;

    //Variable que permitira reiniciar el FilterPredicate
    defaultFilterPredicate?: (data: any, filter: string) => boolean;
    constructor(
        public dialogRef: MatDialogRef<PlanCuentaModalComponent>,
        private planCuentasService: PlanCuentaService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (data) {
            this.codigoCuenta = data.codCuenta;
        }

        console.log(this.codigoCuenta);
    }

    ngOnInit(): void {
        this.planCuenta = null;

        //asignar el valor inicial del filterPredicate.
        this.defaultFilterPredicate = this.dataSource.filterPredicate;

        //Obtener el listado de plan de cuentas.
        this.planCuentasService.listarPlanCuentaPorCuenta(this.codigoCuenta).subscribe(
            (response) => {
                this.dataSource.data = response;
                this.planCuentaCount = this.dataSource.data.length;
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
            }
        );

    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.configPaginator();
    }

    cerrar(): void {
        this.dialogRef.close(this.planCuenta);
    }

    seleccionarPlanCuenta(planCuenta: PlanCuenta): void {
        if(planCuenta.nivelCuenta === 'SC'){
            console.log('planCuenta:', planCuenta);
            this.dialogRef.close(planCuenta);
        }else{
            this._snackBar.open('Seleccione una cuenta de DETALLE (S = Sub-Cuenta)', 'Error!!!', appSnackWarm);
        }
    }

    configPaginator(): void{
        setTimeout(()=>{
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.paginator._intl.itemsPerPageLabel = 'Plan cuenta por página';
            this.paginator._intl.previousPageLabel = 'Página anterior';
            this.paginator._intl.nextPageLabel = 'Página siguiente';
            this.paginator._intl.firstPageLabel = 'Primera página';
            this.paginator._intl.lastPageLabel = 'Ultima página';
            this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
                const start = page * pageSize + 1;
                const end = (page + 1) * pageSize;
                return `${start} - ${end} de ${length}`;
            };
        });
    }

    filtrarIngreso(event: Event): void {
        const filtro = (event.target as HTMLInputElement).value;
        //this.dataSource.filter = filtro.trim().toLowerCase();
        //this.dataSource.filter = filtro.trim().toLowerCase();
        const result = this.dataSource.data.filter((s) => {
            s.codigo.toString().toLowerCase().indexOf(filtro.toLowerCase()) !== -1
        });
        console.log(result);
    }

    filtrarPorCodigo(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        /*        this.dataSource.filterPredicate = this.defaultFilterPredicate;
                this.dataSource.filter = filterValue.trim().toLowerCase();*/

        this.dataSource.filterPredicate = (data: PlanCuentaFachada, filter: string) => {
            return data.codigo.toString().includes(filter);
        };
        this.dataSource.filter = filterValue;
    }

    filtrarPorNombreCuenta(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;

        this.dataSource.filterPredicate = (data: PlanCuentaFachada, filter: string) => {
            return data.nombre.toString().toLowerCase().includes(filter);
        };
        this.dataSource.filter = filterValue;
    }
}

