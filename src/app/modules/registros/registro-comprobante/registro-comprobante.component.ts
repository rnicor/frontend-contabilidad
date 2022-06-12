import {AfterViewInit, Component, OnInit} from '@angular/core';
import {appSnackPrimary, appSnackWarm} from '../../../core/snack/app.snack';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FuseConfirmationService} from '../../../../@fuse/services/confirmation';
import {RegistroComprobanteService} from './service/registro-comprobante.service';
import {AuthService} from '../../../core/auth/auth.service';
import {RegistroComprobanteInicio} from './type/registro-comprobante-inicio.types';
import {RegistroComprobante} from './type/registro-comprobante.types';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';
import {of} from "rxjs";

@Component({
    selector: 'app-registro-comprobante',
    templateUrl: './registro-comprobante.component.html'
})
export class RegistroComprobanteComponent implements OnInit, AfterViewInit {
    inicio: RegistroComprobanteInicio;
    comprobante: RegistroComprobante;
    formComprobante: FormGroup;

    disabledForm: boolean;
    constructor(
        private comprobanteService: RegistroComprobanteService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _fuseConfirmationService: FuseConfirmationService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.disabledForm = false;
        this.comprobanteService.inicio().subscribe(
            (response) => {
                this.inicio = response;
            }
        );
        this.iniciaFormulario();
    }

    ngAfterViewInit(): void {
    }

    iniciaFormulario(): void {
        this.comprobante = this.comprobante ? this.comprobante : this.comprobante = {
            id: null,
            tipoComprobanteId: null,
            fecha: null,
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

        this.formComprobante = this.formBuilder.group({
            id:                         [null],
            tipoComprobanteId:          [null, [Validators.required]],
            fecha:                      [null, [Validators.required]],
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
            this.formComprobante.get('totalDebeBoliviano').setValue(data.reduce((a,b) => a + +b.debeBoliviano, 0));
            this.formComprobante.get('totalHaberBoliviano').setValue(data.reduce((a,b) => a + +b.haberBoliviano, 0));
            this.formComprobante.get('totalHaberDolar').setValue(data.reduce((a,b) => a + +b.debeDolar, 0));
            this.formComprobante.get('totalDebeDolar').setValue(data.reduce((a,b) => a + +b.haberDolar, 0));
        });
        this.formComprobante.get('glosa').valueChanges.pipe(
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
        return this.formComprobante.get('detalle') as FormArray;
    }

    actualizarCuenta(index: number, event: any): void {
        this.detalles.at(index).patchValue({comprobanteId: event.value.id, codigoCuenta: event.value.codigo , nombreCuenta: event.value.nombre});
    }

    guardar(): void {
        if (!this.validarPedido()) {
            return;
        }
        this.mapFormularioToPedido();
        this.disabledForm = true;
        this.comprobanteService.guardar(this.comprobante).subscribe(
            (response) => {
                this.comprobante = response;
                this.mapPedidoToFormulario();
                this._snackBar.open('Pedido Guardado', 'Exito!!!', appSnackPrimary);
                this.disabledForm = false;
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                this.disabledForm = false;
            }
        );
    }
    modificar(): void {
        if (!this.validarPedido()) {
            return;
        }
        this.mapFormularioToPedido();
        this.disabledForm = true;
        this.comprobanteService.modificar(this.comprobante).subscribe(
            (response) => {
                this.comprobante = response;
                this.mapPedidoToFormulario();
                this._snackBar.open('Pedido actualizado', 'Exito!!!', appSnackPrimary);
                this.disabledForm = false;
            },
            (err) => {
                this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                this.disabledForm = false;
            }
        );
    }
    eliminar(): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar comprobante',
            message: '¿Esta seguro(a) de eliminar el comprobante con numero de comprobante: ' + this.formComprobante.get('nroComprobante').value + ' ?',
            actions: {
                confirm: {label: 'Eliminar'},
                cancel: {label: 'Cancelar'}
            },
            icon: {color: 'warning'}
        });
        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this.disabledForm = true;
                this.comprobanteService.eliminar(this.comprobante.id).subscribe(
                    (response) => {
                        this.nuevo();
                        this._snackBar.open('Se eliminó el comprobante', 'Exito!!!', appSnackPrimary);
                        this.disabledForm = false;
                    },
                    (err) => {
                        this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                        this.disabledForm = false;
                    }
                );
            }
        });
    }
    /*actualizarStock(event: any): void {
        const data = this.dataSourcePedidoDetalle.data;
        data.forEach( (p) => {
            p.cantidadOrigen = p.producto.stocks.find( s => s.sucursalId === event)?.cantidad;
        });
        this.dataSourcePedidoDetalle.data = data;
    }*/
    eliminarProductos(): void {
        /*let data = this.dataSourcePedidoDetalle.data;
        data = data.filter(item => item.cantidad);
        this.dataSourcePedidoDetalle.data = data;*/
    }
    nuevo(): void {
        /*this.comprobante = {
            id: null,
            traspasoId: null,
            sucursalId: null,
            sucursalDestinoId: null,
            numeroPedido: null,
            cantidad: null,
            fecha: null,
            tipoPedido: null,
            concepto: null,
            estadoPedido: null,
            detalle: []
        };
        this.formComprobante.reset();
        this.formComprobante.controls['sucursalDestinoId'].enable();
        this.dataSourcePedidoDetalle.data = [];
        this.formComprobante.controls['numeroPedido'].setValue(this.inicio.numeroPedido);
        this.formComprobante.controls['fecha'].setValue(this.inicio.fecha);*/
    }
    get f(): any {
        return this.formComprobante.controls;
    }
    private mapPedidoToFormulario(): void {
        this.formComprobante.controls['id'].setValue(this.comprobante.id);
        this.formComprobante.controls['tipoComprobanteId'].setValue(this.comprobante.tipoComprobanteId);
        this.formComprobante.controls['fecha'].setValue(this.comprobante.fecha);
        this.formComprobante.controls['tipoCambio'].setValue(this.comprobante.tipoCambio);
        this.formComprobante.controls['moneda'].setValue(this.comprobante.moneda);
        this.formComprobante.controls['pagadoA'].setValue(this.comprobante.pagadoA);
        this.formComprobante.controls['nitCi'].setValue(this.comprobante.nitCi);
        this.formComprobante.controls['nroRecibo'].setValue(this.comprobante.nroRecibo);
        this.formComprobante.controls['nroComprobante'].setValue(this.comprobante.nroComprobante);
        this.formComprobante.controls['glosa'].setValue(this.comprobante.glosa);
        this.formComprobante.controls['totalDebeBoliviano'].setValue(this.comprobante.totalDebeBoliviano);
        this.formComprobante.controls['totalHaberBoliviano'].setValue(this.comprobante.totalHaberBoliviano);
        this.formComprobante.controls['totalHaberDolar'].setValue(this.comprobante.totalHaberDolar);
        this.formComprobante.controls['totalDebeDolar'].setValue(this.comprobante.totalDebeDolar);
        this.formComprobante.controls['diferenciaDebeBoliviano'].setValue(this.comprobante.diferenciaDebeBoliviano);
        this.formComprobante.controls['diferenciaHaberBoliviano'].setValue(this.comprobante.diferenciaHaberBoliviano);
        this.formComprobante.controls['diferenciaDebeDolar'].setValue(this.comprobante.diferenciaDebeDolar);
        this.formComprobante.controls['diferenciaHaberDolar'].setValue(this.comprobante.diferenciaHaberDolar);
        this.comprobante.detalle.forEach((e, index) => {
            this.detalles.push(this.formBuilder.group({
                id: [e.id],
                comprobanteId: [e.comprobanteId, Validators.required],
                codigoCuenta: [e.codigoCuenta, Validators.required],
                nombreCuenta: [e.nombreCuenta, Validators.required],
                referencia: [e.referencia, Validators.required],
                debeBoliviano: [e.debeBoliviano],
                haberBoliviano: [e.haberBoliviano],
                debeDolar: [e.debeDolar],
                haberDolar: [e.haberDolar],
                banco: [e.banco],
                nroCheque: [e.nroCheque],
                iva: [e.iva]
            }));
        });
    }
    private mapFormularioToPedido(): void {
        this.comprobante.id = this.formComprobante.controls['id'].value;
        this.comprobante.tipoComprobanteId = this.formComprobante.controls['tipoComprobanteId'].value;
        this.comprobante.fecha = this.formComprobante.controls['fecha'].value;
        this.comprobante.tipoCambio = this.formComprobante.controls['tipoCambio'].value;
        this.comprobante.moneda = this.formComprobante.controls['moneda'].value;
        this.comprobante.pagadoA = this.formComprobante.controls['pagadoA'].value;
        this.comprobante.nitCi = this.formComprobante.controls['nitCi'].value;
        this.comprobante.nroRecibo = this.formComprobante.controls['nroRecibo'].value;
        this.comprobante.nroComprobante = this.formComprobante.controls['nroComprobante'].value;
        this.comprobante.glosa = this.formComprobante.controls['glosa'].value;
        this.comprobante.totalDebeBoliviano = this.formComprobante.controls['totalDebeBoliviano'].value;
        this.comprobante.totalHaberBoliviano = this.formComprobante.controls['totalHaberBoliviano'].value;
        this.comprobante.totalHaberDolar = this.formComprobante.controls['totalHaberDolar'].value;
        this.comprobante.totalDebeDolar = this.formComprobante.controls['totalDebeDolar'].value;
        this.comprobante.diferenciaDebeBoliviano = this.formComprobante.controls['diferenciaDebeBoliviano'].value;
        this.comprobante.diferenciaHaberBoliviano = this.formComprobante.controls['diferenciaHaberBoliviano'].value;
        this.comprobante.diferenciaDebeDolar = this.formComprobante.controls['diferenciaDebeDolar'].value;
        this.comprobante.diferenciaHaberDolar = this.formComprobante.controls['diferenciaHaberDolar'].value;
        this.comprobante.detalle = this.formComprobante.controls['detalle'].value;
    }
    private validarPedido(): boolean {
        console.log(this.formComprobante);
        if(this.formComprobante.invalid) {
            this.formComprobante.markAllAsTouched();
            this._snackBar.open('....Complete los datos requeridos', 'Error!!!', appSnackWarm);
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
}
