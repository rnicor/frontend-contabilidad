import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {PlanCuenta} from './type/plan-cuenta.types';
import {PlanCuentaFachada} from './type/plan-cuenta-fachada.types';
import {AuthService} from '../../../core/auth/auth.service';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FuseConfirmationService} from '../../../../@fuse/services/confirmation';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatRadioButton, MatRadioChange} from '@angular/material/radio';
import {PlanCuentaDetalleComponent} from './details/plan-cuenta-detalle.component';
import {Dominio} from '../../../core/user/dominio.types';
import {PlanCuentaService} from './service/plan-cuentas.service';
import {appSnackPrimary, appSnackWarm} from '../../../core/snack/app.snack';



@Component({
    selector: 'app-plan-cuentas',
    templateUrl: './plan-cuentas.component.html',
    styleUrls: ['./plan-cuentas.component.scss']
})
export class PlanCuentasComponent implements OnInit, AfterViewInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    isLoading: boolean = false;

    @Output()
    change: EventEmitter<MatRadioChange>;

    dominioCuentaPrincipal: Dominio[];
    dominioNivelCuenta: Dominio[];
    dominioTipoMoneda: Dominio[];

    dataSourcePlanCuentaFachada = new MatTableDataSource<PlanCuentaFachada>([]);
    dataSourcePlanCuentaFachadaAux = new MatTableDataSource<PlanCuentaFachada>([]);
    displayedColumns: string[] = ['codigo', 'nombreCuenta', 'moneda', 'nivel', 'actions'];
    //displayedColumns: string[] = ['codigo'];

    //Opciones para realizar busquedas por una determinada columna
    opcionBusqueda: string;
    listaBusqueda: string[] = ['Grupo', 'Sub grupo', 'Rubro', 'Cuenta', 'Sub cuenta', 'Todos'];

    //Variable que permitira reiniciar el FilterPredicate
    defaultFilterPredicate?: (data: any, filter: string) => boolean;

    //variable que enumera el plan de cuentas.
    planCuentaCount: number = 0;


    constructor(
        private planCuentaService: PlanCuentaService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _fuseConfirmationService: FuseConfirmationService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {

        this.opcionBusqueda = 'Todos';
        this.isLoading = true;
        this.planCuentaService.inicio().subscribe(
            (response) => {
                console.log(response);
                this.dominioCuentaPrincipal = response.cuentaPrincipal;
                this.dominioNivelCuenta = response.nivelCuenta;
                this.dominioTipoMoneda = response.tipoMonedaContabilidad;
                this.dataSourcePlanCuentaFachada.data = response.listaPlanCuentaFachada;
                this.dataSourcePlanCuentaFachadaAux.data = this.dataSourcePlanCuentaFachada.data;
                this.planCuentaCount = this.dataSourcePlanCuentaFachada.data.length;
                this.isLoading = false;
            }
        );

    }

    ngAfterViewInit(): void {
        this.configPaginator();
    }

    onChange(mrChange: MatRadioChange): void {
        this.dataSourcePlanCuentaFachada.data = this.dataSourcePlanCuentaFachadaAux.data;

        /* console.log(mrChange.value);
        console.log(mrButton.name);
        console.log(mrButton.checked);
        console.log(mrButton.inputId);*/

        let mrButton: MatRadioButton = mrChange.source;

        //listaBusqueda: string[] = ['Grupo', 'Sub grupo', 'Rubro', 'Cuenta', 'Sub cuenta'];
        if (mrChange.value=== 'Grupo'){
            this.dataSourcePlanCuentaFachada.filterPredicate = this.defaultFilterPredicate;
            this.dataSourcePlanCuentaFachada.data = this.dataSourcePlanCuentaFachada.data.filter(item => item.nivelCuenta === 'G');

        }
        if (mrChange.value=== 'Sub grupo'){
            this.dataSourcePlanCuentaFachada.filterPredicate = this.defaultFilterPredicate;
            this.dataSourcePlanCuentaFachada.data = this.dataSourcePlanCuentaFachada.data.filter(item => item.nivelCuenta === 'SG');

        }
        if (mrChange.value=== 'Sub grupo'){
            this.dataSourcePlanCuentaFachada.filterPredicate = this.defaultFilterPredicate;
            this.dataSourcePlanCuentaFachada.data = this.dataSourcePlanCuentaFachada.data.filter(item => item.nivelCuenta === 'SG');

        }
        if (mrChange.value=== 'Rubro'){
            this.dataSourcePlanCuentaFachada.filterPredicate = this.defaultFilterPredicate;
            this.dataSourcePlanCuentaFachada.data = this.dataSourcePlanCuentaFachada.data.filter(item => item.nivelCuenta === 'R');
        }
        if (mrChange.value=== 'Cuenta'){
            this.dataSourcePlanCuentaFachada.filterPredicate = this.defaultFilterPredicate;
            this.dataSourcePlanCuentaFachada.data = this.dataSourcePlanCuentaFachada.data.filter(item => item.nivelCuenta === 'CC');
        }
        if (mrChange.value=== 'Sub cuenta'){
            this.dataSourcePlanCuentaFachada.filterPredicate = this.defaultFilterPredicate;
            this.dataSourcePlanCuentaFachada.data = this.dataSourcePlanCuentaFachada.data.filter(item => item.nivelCuenta === 'SC');
        }
        if (mrChange.value=== 'Todos'){
            this.dataSourcePlanCuentaFachada.filterPredicate = this.defaultFilterPredicate;
        }

    }

    openDialog(planCuenta: PlanCuenta): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '30%';
        dialogConfig.data = {
            planCuenta: planCuenta,
            dominioCuentaPrincipal: this.dominioCuentaPrincipal,
            dominioNivelCuenta: this.dominioNivelCuenta,
            dominioTipoMoneda: this.dominioTipoMoneda,
        };
        const dialogRef = this.dialog.open(PlanCuentaDetalleComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.getPlanCuenta();
            }
        });
        console.log(this.dominioTipoMoneda);

    }

    eliminar(planCuenta: PlanCuenta): void {

        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar plan cuenta',
            message: '¿Esta seguro(a) de eliminar el plan de cuentas: ' + planCuenta.nombre + ' ?',
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
                this.planCuentaService.eliminar(planCuenta.id).subscribe(
                    (response) => {
                        this.getPlanCuenta();
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

    getPlanCuenta(): void {
        this.isLoading = true;
        this.planCuentaService.listar().subscribe(
            (response) => {
                this.dataSourcePlanCuentaFachada.data = response;
                this.dataSourcePlanCuentaFachadaAux.data = response;
                this.configPaginator();
                this.planCuentaCount = response.length;
                this.isLoading = false;
                console.log(this.dataSourcePlanCuentaFachada.data);
            },
            (err) =>{
                this.isLoading = false;
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
            }
        );


    }

    filtrar(event: Event): void {
        const filtro = (event.target as HTMLInputElement).value;
        this.dataSourcePlanCuentaFachada.filter = filtro.trim().toLowerCase();
    }

    configPaginator(): void{
        setTimeout(()=>{
            this.dataSourcePlanCuentaFachada.paginator = this.paginator;
            this.dataSourcePlanCuentaFachada.sort = this.sort;
            this.paginator._intl.itemsPerPageLabel = 'plan por página';
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

    reportePDF(): void {

    }

}
