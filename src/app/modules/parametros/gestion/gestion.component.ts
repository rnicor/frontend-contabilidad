import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatRadioChange} from '@angular/material/radio';
import {GestionService} from './gestion.service';
import {AuthService} from '../../../core/auth/auth.service';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FuseConfirmationService} from '../../../../@fuse/services/confirmation';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {appSnackPrimary, appSnackWarm} from '../../../core/snack/app.snack';
import {MatTableDataSource} from '@angular/material/table';
import {Gestion} from './gestion.types';
import {GestionDetalleComponent} from './gestion-detalle/gestion-detalle.component';
import {Dominio} from '../../../core/user/dominio.types';

@Component({
    selector: 'app-gestion',
    templateUrl: './gestion.component.html',
    styleUrls: ['./gestion.component.scss']
})
export class GestionComponent implements OnInit, AfterViewInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    isLoading: boolean = false;

    @Output()
    change: EventEmitter<MatRadioChange>;

    dominioGestionPeriodo: Dominio[];

    dataGestion=new MatTableDataSource<Gestion>([]);
    dataGestionAux=new MatTableDataSource<Gestion>([]);
    displayedColumns: string[] = ['anio', 'periodo','actions'];


    //variable que enumera las gestiones
    gestionCount: number = 0;


    constructor(
        private gestionService: GestionService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _fuseConfirmationService: FuseConfirmationService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {

        this.gestionService.inicio().subscribe(
            (response)=>{
                console.log(response);
                this.dominioGestionPeriodo=response.periodo;
            }
        );
        this.getGestion();
    }

    getGestion(): void {
        this.isLoading = true;
        this.gestionService.listar().subscribe(
            (response) => {
                this.dataGestion.data = response;
                this.dataGestionAux.data=response;
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
            dominioGestionPeriodo:this.dominioGestionPeriodo,
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


    eliminar(gestion: Gestion): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar linea',
            message: '¿Esta seguro(a) de eliminar la gestion: ' + gestion.anio + ' ?',
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
                this.gestionService.eliminar(gestion.id).subscribe(
                    (response) => {
                        this.getGestion();
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

    configPaginator(): void{
        setTimeout(()=>{
            this.dataGestion.paginator = this.paginator;
            this.dataGestion.sort = this.sort;
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
