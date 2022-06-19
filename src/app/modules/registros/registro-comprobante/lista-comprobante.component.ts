import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatRadioChange} from '@angular/material/radio';
import {Dominio} from '../../../core/user/dominio.types';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../../core/auth/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FuseConfirmationService} from '../../../../@fuse/services/confirmation';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {RegistroComprobante} from './type/registro-comprobante.types';
import {RegistroComprobanteService} from './service/registro-comprobante.service';
import {appSnackPrimary, appSnackWarm} from '../../../core/snack/app.snack';
import {RegistroComprobanteInicio} from './type/registro-comprobante-inicio.types';
import {RegistroComprobanteComponent} from './registro-comprobante.component';

@Component({
    selector: 'app-lista-comprobante',
    templateUrl: './lista-comprobante.component.html'
})
export class ListaComprobanteComponent implements OnInit, AfterViewInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    isLoading: boolean = false;

    formComprobante: FormGroup;

    @Output()
    change: EventEmitter<MatRadioChange>;

    dataComprobante = new MatTableDataSource<RegistroComprobante>([]);
    dataComprobanteAux = new MatTableDataSource<RegistroComprobante>([]);


    dominioComprobantePeriodo: Dominio[];

    inicio: RegistroComprobanteInicio;

    displayedColumns: string[] = ['tipoComprobanteId','nroComprobante','fecha','codigoCuenta','nombreCuenta', 'referencia', 'debeBoliviano', 'haberBoliviano', 'debeDolar', 'haberDolar', 'nroCheque','actions'];


    //variable que enumera las comprobantees
    comprobanteCount: number = 0;


    constructor(
        private comprobanteService: RegistroComprobanteService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _fuseConfirmationService: FuseConfirmationService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {

        this.comprobanteService.inicio().subscribe(
            (response) => {
                //  console.log(response);
                this.inicio = response;
            }
        );
        this.getComprobante();
    }

    getComprobante(): void {
        this.isLoading = true;
        this.comprobanteService.listar().subscribe(
            (response) => {
                this.dataComprobante.data = response;
                this.dataComprobanteAux.data = response;
                this.configPaginator();
                this.comprobanteCount = response.length;
                this.isLoading = false;
                console.log(this.dominioComprobantePeriodo);
                console.log(this.dataComprobante.data);
            },
            (err) => {
                this.isLoading = false;
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
            }
        );


    }


    openDialog(registroComprobante: RegistroComprobante): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '80%';
        dialogConfig.data = {
            registroComprobante: registroComprobante,
            //dominioGestionPeriodo: this.dominioGestionPeriodo,
        };
        //console.log(gestion);
        const dialogRef = this.dialog.open(RegistroComprobanteComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                console.log(data);
                this.getComprobante();
            }
        });
        //console.log(this.dominioGestionPeriodo);
    }


    filtrar(event: Event): void {
        const filtro = (event.target as HTMLInputElement).value;
        this.dataComprobante.filter = filtro.trim().toLowerCase();
    }


    eliminar(comprobante: RegistroComprobante): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar linea',
            message: '¿Esta seguro(a) de eliminar la comprobante: ' + comprobante.nroComprobante + ' ?',
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
                this.comprobanteService.eliminar(comprobante.id).subscribe(
                    (response) => {
                        this.getComprobante();
                        this._snackBar.open('Se eliminó el comprobante', 'Exito!!!', appSnackPrimary);
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


    configPaginator(): void {
        setTimeout(() => {
            this.dataComprobante.paginator = this.paginator;
            this.dataComprobante.sort = this.sort;
            this.paginator._intl.itemsPerPageLabel = 'plan por página';
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
        this.comprobanteService.reportePDF().subscribe(
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

    ngAfterViewInit(): void {
    }

    get f(): any {
        return this.formComprobante.controls;
    }
}
