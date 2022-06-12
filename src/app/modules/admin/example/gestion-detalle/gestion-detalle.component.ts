import {AfterViewInit, Component, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatRadioChange} from '@angular/material/radio';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

import {MatTableDataSource} from '@angular/material/table';
import {Dominio} from '../../../../core/user/dominio.types';
import {Gestion} from '../../../parametros/gestion/gestion.types';
import {GestionService} from '../../../parametros/gestion/gestion.service';
import {AuthService} from '../../../../core/auth/auth.service';
import {FuseConfirmationService} from '../../../../../@fuse/services/confirmation';
import {appSnackPrimary, appSnackWarm} from '../../../../core/snack/app.snack';
import {constant} from 'lodash-es';
import {Router} from '@angular/router';

@Component({
    selector: 'app-gestion-detalle',
    templateUrl: './gestion-detalle.component.html',
    styleUrls: ['./gestion-detalle.component.scss']
})
export class GestionDetalleComponent implements OnInit, AfterViewInit {
    gestionGrabar: Gestion;
    gestionAnio;
    number;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    isLoading: boolean = false;

    @Output()
    change: EventEmitter<MatRadioChange>;

    dominioGestionPeriodo: Dominio[];

    dataGestion = new MatTableDataSource<Gestion>([]);
    dataGestionAux = new MatTableDataSource<Gestion>([]);
    displayedColumns: string[] = ['anio', 'periodo', 'actions'];


    //variable que enumera las gestiones
    gestionCount: number = 0;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    string_an: string;

    var: any;

    constructor(
        private _router: Router,
        public dialogRef: MatDialogRef<GestionDetalleComponent>,
        private gestionService: GestionService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _fuseConfirmationService: FuseConfirmationService,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (data) {
            this.gestionAnio = data.anio;
        }

        console.log(this.gestionAnio);
    }

    ngOnInit(): void {

        this.gestionService.inicio().subscribe(
            (response) => {
                console.log(response);
                this.dominioGestionPeriodo = response.periodo;
            }
        );
        this.getGestion();
    }

    getGestion(): void {
        this.isLoading = true;
        this.gestionService.listar().subscribe(
            (response) => {
               this.dataGestion.data = response;
                this.dataGestionAux.data = response;
                this.configPaginator();
                this.gestionCount = response.length;
                this.isLoading = false;
                console.log(this.dominioGestionPeriodo);
                console.log(this.dataGestion.data);
            },
            (err) => {
                this.isLoading = false;
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
            }
        );


    }


    ngAfterViewInit(): void {
        this.configPaginator();
    }

    openDialog(gestion: Gestion): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '30%';
        dialogConfig.data = {
            gestion: gestion,
            dominioGestionPeriodo: this.dominioGestionPeriodo,
        };
        //console.log(gestion);
        const dialogRef = this.dialog.open(GestionDetalleComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                console.log(data);
                this.getGestion();
            }
        });
        //console.log(this.dominioGestionPeriodo);
    }

    filtrar(event: Event): void {
        const filtro = (event.target as HTMLInputElement).value;
        this.dataGestion.filter = filtro.trim().toLowerCase();
    }


    seleccionar(gestion: Gestion): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Seleccionar Gestion',
            message: '¿Esta seguro(a) de seleccionar la gestion: ' + gestion.anio + ' ?',
            actions: {
                confirm: {
                    label: 'Cargar Datos'
                },
                cancel: {
                    label: 'Cancelar'
                }
            },
            icon: {
                color: 'accent'
            }
        });
        confirmation.afterClosed().subscribe((result) => {
            this.isLoading = true;
            if (result === 'confirmed') {

                // sessionStorage.key(gestion.anio);
                // sessionStorage.key(gestion.anio);
                // sessionStorage.setItem('gestion',JSON.stringify(gestion));
                this.string_an = gestion.anio.toString();
                sessionStorage.setItem('gestion', this.string_an);
                //this.var = this.authService.setGestion(function () {                });
                this.authService.setGestion(this.string_an);
                console.log('ingreso confirmado');
                console.log(gestion);
                // console.log('fin');
                this.dialogRef.close(gestion);
                this._router.navigate(['/parametros/plan-cuentas']);


            } else {
                this.isLoading = false;
            }
        });
    }


    configPaginator(): void {
        setTimeout(() => {
            this.dataGestion.paginator = this.paginator;
            this.dataGestion.sort = this.sort;
            this.paginator._intl.itemsPerPageLabel = 'Gestion por página';
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


    reportePDF(): void {/*
        this.gestionService.reportePDF().subscribe(
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


}
