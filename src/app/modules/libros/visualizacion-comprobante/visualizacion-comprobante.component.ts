import {AfterViewInit} from '@angular/core';
import {appSnackPrimary, appSnackWarm} from '../../../core/snack/app.snack';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FuseConfirmationService} from '../../../../@fuse/services/confirmation';
import {LibroDiarioService} from './service/visualizacion-comprobante.service';
import {AuthService} from '../../../core/auth/auth.service';
import {VisualizacionCompronbanteInicio} from './type/visualizacion-compronbante-inicio.types';
import {LibroDiario} from './type/libro-diario.types';
import {LibroReporte} from './type/libro-reporte.types';

import {LibroDiarioDetalle} from './type/libro-diario-detalle.types';

import {MesTipo} from './type/mes_tipo.types';

import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';
import {of} from "rxjs";

@Component({
    selector: 'app-visualizacion-comprobante',
    templateUrl: './visualizacion-comprobante.component.html',
    encapsulation: ViewEncapsulation.None
})
export class RegistroComprobanteComponent implements OnInit, AfterViewInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    isLoading: boolean = false;
    displayedColumns: string[] = ['nro', 'fecha', 'monto', 'descripcion', 'actions'];
    dataSource = new MatTableDataSource<LibroDiarioDetalle>([]);
    lineasCount: number = 0;

    libroReporte: LibroReporte;
    inicio: VisualizacionCompronbanteInicio;
    libroDiario: LibroDiario;
    mesTipo: MesTipo;
    libroDiarioDetalle: LibroDiarioDetalle;

  
    formLibrodiario: FormGroup;



    disabledForm: boolean;
    constructor(
        private LibroDiarioService: LibroDiarioService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _fuseConfirmationService: FuseConfirmationService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.disabledForm = false;
        this.LibroDiarioService.inicio().subscribe(
            (response) => {
                this.inicio = response;
            }
        );
        this.iniciaFormulario();
    }

    ngAfterViewInit(): void {
    }

    iniciaFormulario(): void {
        this.libroDiario = this.libroDiario ? this.libroDiario : this.libroDiario = {
            id: null,
            tipoComprobanteId: null,
            fechaDesde: null,
            fechaHasta: null,
            tipoCambio: null,
            moneda: null,
            pagadoA: null,
            nitCi: null,
            nroRecibo: null,
            nroComprobante: null,
            glosa: null,
            totalDebeBoliviano: null,
            totalHaberBoliviano: null,
            totalHaberDolar: null,
            totalDebeDolar: null,
            diferenciaDebeBoliviano: null,
            diferenciaHaberBoliviano: null,
            diferenciaDebeDolar: null,
            diferenciaHaberDolar: null,
            detalle: []
        };
        this.mesTipo = this.mesTipo ? this.mesTipo : this.mesTipo = {
            tipo: null,
            mes: null,
            fechaInicio: null,
            fechaFin: null,
        };
        this.formLibrodiario = this.formBuilder.group({
            id:                         [null],
            tipoComprobanteId:          [null, [Validators.required]],
            fechaDesde: null,
            fechaHasta: null,
            tipoCambio:                 [null, [Validators.required]],
            moneda:                     [null, [Validators.required]],
            pagadoA:                    [null, [Validators.required]],
            nitCi:                      [null],
            nroRecibo:                  [{value: null, disabled: true}],
            nroComprobante:             [{value: null, disabled: true}],
            glosa:                      [null, [Validators.required]],
            totalDebeBoliviano:         [{value: null, disabled: true}, [Validators.required]],
            totalHaberBoliviano:        [{value: null, disabled: true}, [Validators.required]],
            totalHaberDolar:            [{value: null, disabled: true}, [Validators.required]],
            totalDebeDolar:             [{value: null, disabled: true}, [Validators.required]],
            diferenciaDebeBoliviano:    [{value: null, disabled: true}],
            diferenciaHaberBoliviano:   [{value: null, disabled: true}],
            diferenciaDebeDolar:        [{value: null, disabled: true}],
            diferenciaHaberDolar:       [{value: null, disabled: true}],
            detalle:                    this.formBuilder.array([])
        });
        this.detalles.valueChanges.subscribe((data) => {
            this.formLibrodiario.get('totalDebeBoliviano').setValue(data.reduce((a,b) => a + +b.debeBoliviano, 0));
            this.formLibrodiario.get('totalHaberBoliviano').setValue(data.reduce((a,b) => a + +b.haberBoliviano, 0));
            this.formLibrodiario.get('totalHaberDolar').setValue(data.reduce((a,b) => a + +b.debeDolar, 0));
            this.formLibrodiario.get('totalDebeDolar').setValue(data.reduce((a,b) => a + +b.haberDolar, 0));
        });
        this.formLibrodiario.get('glosa').valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged())
            .subscribe((data) => {
                for (let i = 0; i <= this.detalles.length-1; i++){
                    this.detalles.at(i).patchValue({referencia: data});
                }
            });
    }

    add(): void {
        this.detalles.push(this.createDetallesField());
    }

    deleteDetalle(i): void {
        this.detalles.removeAt(i);
    }

    createDetallesField(): any {
        return this.formBuilder.group({
            id: [null],
            comprobanteId: [null, Validators.required],
            codigoCuenta: [null, Validators.required],
            nombreCuenta: [null, Validators.required],
            referencia: [null, Validators.required],
            debeBoliviano: [null],
            haberBoliviano: [null],
            debeDolar: [null],
            haberDolar: [null],
            banco: [null],
            nroCheque: [null],
            iva: [null]
        });
    }

    get detalles(): FormArray {
        return this.formLibrodiario.get('detalle') as FormArray;
    }

    actualizarCuenta(index: number, event: any): void {
        this.detalles.at(index).patchValue({comprobanteId: event.value.id, codigoCuenta: event.value.codigo , nombreCuenta: event.value.nombre});
    }


    buscar(): void {;
        
        this.disabledForm = true;
        this.libroDiario = this.formLibrodiario.getRawValue();
        console.log( this.libroDiario);
        //this.mesTipo.tipo = this.libroDiario.tipoComprobanteId;
        console.log( this.mesTipo);
        this.mesTipo.tipo = 0;

        this.mesTipo.mes = 8;
        this.mesTipo.fechaInicio ='2022-06-06';
        console.log( 'inicio =>',this.mesTipo);
        this.LibroDiarioService.buscar(this.mesTipo).subscribe(
            (response) => {
                console.log('respuesta de backend inicio',    response);

                    console.log('respuesta de backend ', response[0].totalDebeBoliviano);
                    console.log('respuesta de backend ', this.libroDiario);

            

             //this.libroReporte = response;
             console.log( 'respuesta de backend =>>', this.libroDiario);
                  this.configPaginator();
                  this.lineasCount = response[0].length;
                  this.isLoading = false;
                },   
            (err) => {
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                this.disabledForm = false;
              //  this.buscarActivado = 3;
            });



    }
    
    get f(): any {
        return this.formLibrodiario.controls;
    }
    private mapPedidoToFormulario(): void {
        this.formLibrodiario.controls['id'].setValue(this.libroDiario.id);
        this.formLibrodiario.controls['tipoComprobanteId'].setValue(this.libroDiario.tipoComprobanteId);
        this.formLibrodiario.controls['fechaDesde'].setValue(this.libroDiario.fechaDesde);
        this.formLibrodiario.controls['fechaHasta'].setValue(this.libroDiario.fechaHasta);

        this.formLibrodiario.controls['tipoCambio'].setValue(this.libroDiario.tipoCambio);
        this.formLibrodiario.controls['moneda'].setValue(this.libroDiario.moneda);
        this.formLibrodiario.controls['pagadoA'].setValue(this.libroDiario.pagadoA);
        this.formLibrodiario.controls['nitCi'].setValue(this.libroDiario.nitCi);
        this.formLibrodiario.controls['nroRecibo'].setValue(this.libroDiario.nroRecibo);
        this.formLibrodiario.controls['nroComprobante'].setValue(this.libroDiario.nroComprobante);
        this.formLibrodiario.controls['glosa'].setValue(this.libroDiario.glosa);
        this.formLibrodiario.controls['totalDebeBoliviano'].setValue(this.libroDiario.totalDebeBoliviano);
        this.formLibrodiario.controls['totalHaberBoliviano'].setValue(this.libroDiario.totalHaberBoliviano);
        this.formLibrodiario.controls['totalHaberDolar'].setValue(this.libroDiario.totalHaberDolar);
        this.formLibrodiario.controls['totalDebeDolar'].setValue(this.libroDiario.totalDebeDolar);
        this.formLibrodiario.controls['diferenciaDebeBoliviano'].setValue(this.libroDiario.diferenciaDebeBoliviano);
        this.formLibrodiario.controls['diferenciaHaberBoliviano'].setValue(this.libroDiario.diferenciaHaberBoliviano);
        this.formLibrodiario.controls['diferenciaDebeDolar'].setValue(this.libroDiario.diferenciaDebeDolar);
        this.formLibrodiario.controls['diferenciaHaberDolar'].setValue(this.libroDiario.diferenciaHaberDolar);
        this.libroDiario.detalle.forEach((e, index) => {
            this.detalles.push(this.formBuilder.group({
                comprobanteId: [e.comprobanteId, Validators.required],
                comprobanteDetalleId: [e.comprobanteDetalleId],
                codigoCuenta: [e.codigoCuenta, Validators.required],
                nombreCuenta: [e.nombreCuenta, Validators.required],
                referencia: [e.referencia, Validators.required],
                debeBoliviano: [e.debeBoliviano],
                haberBoliviano: [e.haberBoliviano],
                debeDolar: [e.debeDolar],
                haberDolar: [e.haberDolar],
                tipo: [e.tipo],
                
                
            }));
        });
    }
    private mapFormularioToPedido(): void {
        this.libroDiario.id = this.formLibrodiario.controls['id'].value;
        this.libroDiario.tipoComprobanteId = this.formLibrodiario.controls['tipoComprobanteId'].value;
        this.libroDiario.fechaDesde = this.formLibrodiario.controls['fechaDesde'].value;
        this.libroDiario.fechaHasta = this.formLibrodiario.controls['fechaHaste'].value;

        this.libroDiario.tipoCambio = this.formLibrodiario.controls['tipoCambio'].value;
        this.libroDiario.moneda = this.formLibrodiario.controls['moneda'].value;
        this.libroDiario.pagadoA = this.formLibrodiario.controls['pagadoA'].value;
        this.libroDiario.nitCi = this.formLibrodiario.controls['nitCi'].value;
        this.libroDiario.nroRecibo = this.formLibrodiario.controls['nroRecibo'].value;
        this.libroDiario.nroComprobante = this.formLibrodiario.controls['nroComprobante'].value;
        this.libroDiario.glosa = this.formLibrodiario.controls['glosa'].value;
        this.libroDiario.totalDebeBoliviano = this.formLibrodiario.controls['totalDebeBoliviano'].value;
        this.libroDiario.totalHaberBoliviano = this.formLibrodiario.controls['totalHaberBoliviano'].value;
        this.libroDiario.totalHaberDolar = this.formLibrodiario.controls['totalHaberDolar'].value;
        this.libroDiario.totalDebeDolar = this.formLibrodiario.controls['totalDebeDolar'].value;
        this.libroDiario.diferenciaDebeBoliviano = this.formLibrodiario.controls['diferenciaDebeBoliviano'].value;
        this.libroDiario.diferenciaHaberBoliviano = this.formLibrodiario.controls['diferenciaHaberBoliviano'].value;
        this.libroDiario.diferenciaDebeDolar = this.formLibrodiario.controls['diferenciaDebeDolar'].value;
        this.libroDiario.diferenciaHaberDolar = this.formLibrodiario.controls['diferenciaHaberDolar'].value;
        this.libroDiario.detalle = this.formLibrodiario.controls['detalle'].value;
    }
    private validarPedido(): boolean {
        console.log(this.formLibrodiario);
        if(this.formLibrodiario.invalid) {
            this.formLibrodiario.markAllAsTouched();
            this._snackBar.open('Complete los datos requeridos', 'Error!!!', appSnackWarm);
            return false;
        }
        /*const registroPedidoDetalle = this.dataSourcePedidoDetalle.data.find(e => !e.cantidad);
        if (registroPedidoDetalle) {
            this._snackBar.open('Al ingresar los productos, alguna cantidad aun sigue siendo cero, revise por favor', 'Error!!!', appSnackWarm);
            return  false;
        }*/
        /*const verificarMayor = this.dataSourcePedidoDetalle.data.find(element => (element.cantidad > element.cantidadOrigen || element.cantidadOrigen===0));
        if (verificarMayor) {
            this._snackBar.open('Alguna de las cantidades es mayor a la cantidad que tiene la sucursal del comprobante o no tiene stock', 'Error!!!', appSnackWarm);
            return  false;
        }*/
        return true;
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
