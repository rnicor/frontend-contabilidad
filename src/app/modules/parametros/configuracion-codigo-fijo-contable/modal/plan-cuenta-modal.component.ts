import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Cuenta} from '../../cuenta/type/cuenta.types';
import {MatTableDataSource} from '@angular/material/table';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CuentaService} from '../../cuenta/service/cuentas.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {appSnackWarm} from '../../../../core/snack/app.snack';
import {FormControl} from '@angular/forms';


@Component({
    selector: 'cuenta-modal',
    templateUrl: './plan-cuenta-modal.component.html',
    styles: []
})

export class PlanCuentaModalComponent implements OnInit, AfterViewInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    codigoCuenta: number;
    planCuenta: Cuenta;

    searchInputControl: FormControl = new FormControl();

    displayedColumns: string[] = ['codigo', 'nombreCuenta', 'nivel', 'moneda'];
    dataSource = new MatTableDataSource<Cuenta>([]);

    planCuentaCount: number = 0;

    defaultFilterPredicate?: (data: any, filter: string) => boolean;
    constructor(
        public dialogRef: MatDialogRef<PlanCuentaModalComponent>,
        private planCuentasService: CuentaService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (data) {
            this.codigoCuenta = data.codCuenta;
        }
    }

    ngOnInit(): void {
        this.planCuenta = null;

        //asignar el valor inicial del filterPredicate.
        this.defaultFilterPredicate = this.dataSource.filterPredicate;

        /*//Obtener el listado de plan de cuentas.
        this.planCuentasService.listarCuentaPorCuenta(this.codigoCuenta).subscribe(
            (response) => {
                this.dataSource.data = response;
                this.planCuentaCount = this.dataSource.data.length;
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
            }
        );*/

    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.configPaginator();
    }

    cerrar(): void {
        this.dialogRef.close(this.planCuenta);
    }

    seleccionarCuenta(planCuenta: Cuenta): void {
        if(planCuenta.nivelCuenta === 'SC'){
            this.dialogRef.close(planCuenta);
        }else{
            this._snackBar.open('Seleccione una cuenta de DETALLE (S = Sub-Cuenta)', 'Error!!!', appSnackWarm);
        }
    }

    configPaginator(): void{
        setTimeout(()=>{
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.paginator._intl.itemsPerPageLabel = ' cuenta por página';
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
        const result = this.dataSource.data.filter((s) => {
            s.codigo.toString().toLowerCase().indexOf(filtro.toLowerCase()) !== -1
        });
    }

    filtrarPorCodigo(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filterPredicate = (data: Cuenta, filter: string) => {
            return data.codigo.toString().includes(filter);
        };
        this.dataSource.filter = filterValue;
    }

    filtrarPorNombreCuenta(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;

        this.dataSource.filterPredicate = (data: Cuenta, filter: string) => {
            return data.nombre.toString().toLowerCase().includes(filter);
        };
        this.dataSource.filter = filterValue;
    }
}

