import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PlanCuenta} from '../type/plan-cuenta.types';
import {Dominio} from '../../../../core/user/dominio.types';
import {AuthService} from '../../../../core/auth/auth.service';
import {MatRadioButton, MatRadioChange} from '@angular/material/radio';
import {PlanCuentaService} from '../service/plan-cuentas.service';
import {FuseConfirmationService} from '../../../../../@fuse/services/confirmation';
import {appSnackPrimary, appSnackWarm} from '../../../../core/snack/app.snack';


@Component({
    selector: 'plan-cuenta-detalle',
    templateUrl: './plan-cuenta-detalle.component.html',
    styles: []
})
export class PlanCuentaDetalleComponent {
    @Input() action: string;
    @Input() planCuenta: PlanCuenta;
    @Input() dominioCuentaPrincipal: Dominio[];
    @Input() dominioNivelCuenta: Dominio[];
    @Input() dominioTipoMoneda: Dominio[];
    @Output() lineaEvento: EventEmitter<any> = new EventEmitter();
    formGroupCuenta: FormGroup;

    //valor textos
    numeroGrupo: number;
    numeroCuentaCompuesta: number;

    //validaciones
    validarGrupoCuenta: boolean;
    validarNivelCuenta: boolean;
    validarTipoMoneda: boolean;

    //colores
    colorNumeroSubGrupo: boolean;
    colorNumeroRubro: boolean;
    colorNumeroCuentaCompuesta: boolean;
    colorNumeroSubCuenta: boolean;
            

    constructor(
        private _snackBar: MatSnackBar,
        private _fuseConfirmationService: FuseConfirmationService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private planCuentaService: PlanCuentaService,
        public dialogRef: MatDialogRef<PlanCuentaDetalleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

        //iniciar la variable externa
        this.planCuenta = this.planCuenta ? this.planCuenta : this.planCuenta = {
            id: null,
            empresaId: null,
            codigo: null,
            nombre: null,
            nivelCuenta: null,
            tipoMoneda: null,
            gestion: null,
        };


        this.buildForm();

        if (data) {
            if (data.planCuenta) {
                this.validarGrupoCuenta = true;
                this.validarNivelCuenta = true;
                this.validarTipoMoneda = true;

                console.log(data.planCuenta);
                this.planCuenta = data.planCuenta;
                this.formGroupCuenta.controls['id'].setValue(this.planCuenta.id);
                this.formGroupCuenta.controls['empresaId'].setValue(this.planCuenta.empresaId);
                this.formGroupCuenta.controls['nombre'].setValue(this.planCuenta.nombre);
                this.formGroupCuenta.controls['codigo'].setValue(this.planCuenta.codigo);
                this.formGroupCuenta.controls['tipoMoneda'].setValue(this.planCuenta.tipoMoneda);
                this.formGroupCuenta.controls['nivelCuenta'].setValue(this.planCuenta.nivelCuenta);

                //dividir el codigo del plan cuenta
                console.log(this.planCuenta.codigo.toString().substring(0,1));
                this.formGroupCuenta.controls['numeroGrupo'].setValue(this.planCuenta.codigo.toString().substring(0,1));
                switch(this.planCuenta.codigo.toString().substring(0,1)) {
                    case "1":
                        this.formGroupCuenta.controls['cuentaPrincipal'].setValue('A');
                    break;
                    case "2":
                        this.formGroupCuenta.controls['cuentaPrincipal'].setValue('P');
                    break;
                    case "3":
                        this.formGroupCuenta.controls['cuentaPrincipal'].setValue('PA');
                    break;
                    case "4":
                        this.formGroupCuenta.controls['cuentaPrincipal'].setValue('I');
                    break;
                    case "5":
                        this.formGroupCuenta.controls['cuentaPrincipal'].setValue('E');
                    break;
                    default:
                }
                console.log(this.planCuenta.nivelCuenta);

                switch(this.planCuenta.nivelCuenta) {
                    case "G":
                        
                    break;
                    case "SG":
                        this.formGroupCuenta.controls['numeroSubGrupo'].setValue(this.planCuenta.codigo.toString().substring(1,2));
                    break;
                    case "R":
                        this.formGroupCuenta.controls['numeroSubGrupo'].setValue(this.planCuenta.codigo.toString().substring(1,2));
                        this.formGroupCuenta.controls['numeroRubro'].setValue(this.planCuenta.codigo.toString().substring(2,4));
                    break;
                    case "CC":
                        this.formGroupCuenta.controls['numeroSubGrupo'].setValue(this.planCuenta.codigo.toString().substring(1,2));
                        this.formGroupCuenta.controls['numeroRubro'].setValue(this.planCuenta.codigo.toString().substring(2,4));
                        this.formGroupCuenta.controls['numeroCuentaCompuesta'].setValue(this.planCuenta.codigo.toString().substring(4,6));
                    break;
                    case "SC":
                        this.validarTipoMoneda = false;
                        this.formGroupCuenta.controls['numeroSubGrupo'].setValue(this.planCuenta.codigo.toString().substring(1,2));
                        this.formGroupCuenta.controls['numeroRubro'].setValue(this.planCuenta.codigo.toString().substring(2,4));
                        this.formGroupCuenta.controls['numeroCuentaCompuesta'].setValue(this.planCuenta.codigo.toString().substring(4,6));
                        this.formGroupCuenta.controls['numeroSubCuenta'].setValue(this.planCuenta.codigo.toString().substring(6,10));
                    break;
                    default:
                }
            }
            this.dominioCuentaPrincipal = data.dominioCuentaPrincipal;
            this.dominioNivelCuenta = data.dominioNivelCuenta;
            this.dominioTipoMoneda = data.dominioTipoMoneda;
        }

    }

    buildForm(): void {
        this.formGroupCuenta = this.formBuilder.group({
            id: [],
            empresaId: [],
            codigo: [{value: this.planCuenta.codigo ? this.planCuenta.codigo : 1, disabled: true}, [Validators.required]],
            nombre: ['', [Validators.required, Validators.max(150)]],
            cuentaPrincipal: ['A'],
            nivelCuenta: ['G'],
            tipoMoneda: ['NI'],
            gestion: [],
            numeroGrupo: [{value: '1', disabled: true}],
            numeroSubGrupo: [{value: '', disabled: true}],
            numeroRubro: [{value: '', disabled: true}],
            numeroCuentaCompuesta: [{value: '', disabled: true}],
            numeroSubCuenta: [{value: '', disabled: true}],
        });
        this.numeroGrupo = 1;
        this.numeroCuentaCompuesta = null;

        this.validarGrupoCuenta = false;
        this.validarNivelCuenta = false;
        this.validarTipoMoneda = true;

        this.colorNumeroSubGrupo = false;
        this.colorNumeroRubro = false;
        this.colorNumeroCuentaCompuesta = false;
        this.colorNumeroSubCuenta = false;
    }


    save(): void {
        
        this.formGroupCuenta.controls['codigo'].enable();
        if (this.formGroupCuenta.valid) {
            if (!this.planCuenta.id) {
                //antes de guardar se debe completar el codigo con ceros.

                this.planCuentaService.guardar(this.formGroupCuenta.value).subscribe(
                    (response) => {
                        this._snackBar.open(response.mensaje, 'Exito!!!', appSnackPrimary);
                        this.dialogRef.close(response);
                    },
                    (err) => {
                        this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                    }
                );
            } else {
                this.planCuentaService.editar(this.formGroupCuenta.value).subscribe(
                    (response) => {
                        this._snackBar.open(response.mensaje, 'Exito!!!', appSnackPrimary);
                        this.dialogRef.close(response);
                    },
                    (err) => {
                        this._snackBar.open(err.error.message, 'Error!!!', appSnackWarm);
                    }
                );
            }
        } else {
            this.formGroupCuenta.markAllAsTouched();
        }
        
    }

    close(): void {
        this.dialogRef.close();
    }

    onChangeCuentaPrincipal(radioChange: MatRadioChange): void {

        let radioCuentaPrincipal: MatRadioButton = radioChange.source;

        if (radioCuentaPrincipal.value === 'A') {
            this.formGroupCuenta.controls['numeroGrupo'].setValue(1);
        }
        if (radioCuentaPrincipal.value === 'P') {
            this.formGroupCuenta.controls['numeroGrupo'].setValue(2);
        }
        if (radioCuentaPrincipal.value === 'PA') {
            this.formGroupCuenta.controls['numeroGrupo'].setValue(3);
        }
        if (radioCuentaPrincipal.value === 'I') {
            this.formGroupCuenta.controls['numeroGrupo'].setValue(4);
        }
        if (radioCuentaPrincipal.value === 'E') {
            this.formGroupCuenta.controls['numeroGrupo'].setValue(5);
        }

        //iniciar los valores
        this.formGroupCuenta.controls['numeroSubGrupo'].setValue('');
        this.formGroupCuenta.controls['numeroRubro'].setValue('');
        this.formGroupCuenta.controls['numeroCuentaCompuesta'].setValue('');
        this.formGroupCuenta.controls['numeroSubCuenta'].setValue('');

        //Armar el codigo
        this.formGroupCuenta.controls['codigo'].setValue(
            this.formGroupCuenta.controls['numeroGrupo'].value
            + this.formGroupCuenta.controls['numeroSubGrupo'].value
            + this.formGroupCuenta.controls['numeroRubro'].value
            + this.formGroupCuenta.controls['numeroCuentaCompuesta'].value
            + this.formGroupCuenta.controls['numeroSubCuenta'].value
        );
    }


    armarCodigo(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;

        if (this.formGroupCuenta.controls['nivelCuenta'].value === 'G'){
            this.formGroupCuenta.controls['codigo'].setValue(this.formGroupCuenta.controls['numeroGrupo'].value
                                                            + this.formGroupCuenta.controls['numeroSubGrupo'].value);
        }

        if (this.formGroupCuenta.controls['nivelCuenta'].value === 'R'){
            this.formGroupCuenta.controls['codigo'].setValue(this.formGroupCuenta.controls['numeroGrupo'].value
                                                            + this.formGroupCuenta.controls['numeroSubGrupo'].value
                                                            + this.formGroupCuenta.controls['numeroRubro'].value
                                                            );
        }

        if (this.formGroupCuenta.controls['nivelCuenta'].value === 'SC'){
            this.formGroupCuenta.controls['codigo'].setValue(this.formGroupCuenta.controls['numeroGrupo'].value
                + this.formGroupCuenta.controls['numeroSubGrupo'].value
                + this.formGroupCuenta.controls['numeroRubro'].value
                + this.formGroupCuenta.controls['numeroCuentaCompuesta'].value
            );
        }
        if (this.formGroupCuenta.controls['nivelCuenta'].value === 'SG'){
            this.formGroupCuenta.controls['codigo'].setValue(
                this.formGroupCuenta.controls['numeroGrupo'].value
                + this.formGroupCuenta.controls['numeroSubGrupo'].value
                + this.formGroupCuenta.controls['numeroRubro'].value
                + this.formGroupCuenta.controls['numeroCuentaCompuesta'].value
                + this.formGroupCuenta.controls['numeroSubCuenta'].value
            );
        }

    }

    onChangeNivelCuenta(changeNivelCuenta: MatRadioChange): void {


        this.formGroupCuenta.controls['nombre'].setValue('');
        
        let radioNivelCuenta: MatRadioButton = changeNivelCuenta.source;
        if (radioNivelCuenta.value === 'G') {
            this.formGroupCuenta.controls['numeroGrupo'].disable();
            this.formGroupCuenta.controls['numeroSubGrupo'].disable();
            this.formGroupCuenta.controls['numeroSubGrupo'].setValue('');
            this.formGroupCuenta.controls['numeroRubro'].disable();
            this.formGroupCuenta.controls['numeroRubro'].setValue('');
            this.formGroupCuenta.controls['numeroCuentaCompuesta'].disable();
            this.formGroupCuenta.controls['numeroCuentaCompuesta'].setValue('');
            this.formGroupCuenta.controls['numeroSubCuenta'].disable();
            this.formGroupCuenta.controls['numeroSubCuenta'].setValue('');

            this.colorNumeroSubGrupo = false;
            this.colorNumeroRubro = false;
            this.colorNumeroCuentaCompuesta = false;
            this.colorNumeroSubCuenta = false;

            //validarTipoMoneda
            this.validarTipoMoneda = true;
            this.formGroupCuenta.controls['tipoMoneda'].setValue('NI');

        }
        if (radioNivelCuenta.value === 'SG') {
            this.formGroupCuenta.controls['numeroGrupo'].disable();
            this.formGroupCuenta.controls['numeroSubGrupo'].enable();
            this.formGroupCuenta.controls['numeroRubro'].disable();
            this.formGroupCuenta.controls['numeroRubro'].setValue('');
            this.formGroupCuenta.controls['numeroCuentaCompuesta'].disable();
            this.formGroupCuenta.controls['numeroCuentaCompuesta'].setValue('');
            this.formGroupCuenta.controls['numeroSubCuenta'].disable();
            this.formGroupCuenta.controls['numeroSubCuenta'].setValue('');

            //modificar color
            this.colorNumeroSubGrupo = true;
            this.colorNumeroRubro = false;
            this.colorNumeroCuentaCompuesta = false;
            this.colorNumeroSubCuenta = false;

            //validarTipoMoneda
            this.validarTipoMoneda = true;
            this.formGroupCuenta.controls['tipoMoneda'].setValue('NI');
        }
        if (radioNivelCuenta.value === 'R') {
            console.log('Ingresar rubro')
            this.formGroupCuenta.controls['numeroGrupo'].disable();
            this.formGroupCuenta.controls['numeroSubGrupo'].enable();
            this.formGroupCuenta.controls['numeroRubro'].enable();
            this.formGroupCuenta.controls['numeroCuentaCompuesta'].disable();
            this.formGroupCuenta.controls['numeroCuentaCompuesta'].setValue('');
            this.formGroupCuenta.controls['numeroSubCuenta'].disable();
            this.formGroupCuenta.controls['numeroSubCuenta'].setValue('');

            //modificar color
            this.colorNumeroSubGrupo = true;
            this.colorNumeroRubro = true;
            this.colorNumeroCuentaCompuesta = false;
            this.colorNumeroSubCuenta = false;

            //validarTipoMoneda
            this.validarTipoMoneda = true;
            this.formGroupCuenta.controls['tipoMoneda'].setValue('NI');
        }
        if (radioNivelCuenta.value === 'CC') {
            this.formGroupCuenta.controls['numeroGrupo'].disable();
            this.formGroupCuenta.controls['numeroSubGrupo'].enable();
            this.formGroupCuenta.controls['numeroRubro'].enable();
            this.formGroupCuenta.controls['numeroCuentaCompuesta'].enable();
            this.formGroupCuenta.controls['numeroSubCuenta'].disable();
            this.formGroupCuenta.controls['numeroSubCuenta'].setValue('');

            //modificar color
            this.colorNumeroSubGrupo = true;
            this.colorNumeroRubro = true;
            this.colorNumeroCuentaCompuesta = true;
            this.colorNumeroSubCuenta = false;

            //validarTipoMoneda
            this.validarTipoMoneda = true;
            this.formGroupCuenta.controls['tipoMoneda'].setValue('NI');
        }
        if (radioNivelCuenta.value === 'SC') {
            this.formGroupCuenta.controls['numeroGrupo'].disable();
            this.formGroupCuenta.controls['numeroSubGrupo'].enable();
            this.formGroupCuenta.controls['numeroRubro'].enable();
            this.formGroupCuenta.controls['numeroCuentaCompuesta'].enable();
            this.formGroupCuenta.controls['numeroSubCuenta'].enable();

            //modificar color
            this.colorNumeroSubGrupo = true;
            this.colorNumeroRubro = true;
            this.colorNumeroCuentaCompuesta = true;
            this.colorNumeroSubCuenta = true;

            //validarTipoMoneda
            this.validarTipoMoneda = false;
            this.formGroupCuenta.controls['tipoMoneda'].setValue('NI');
        }


        this.formGroupCuenta.controls['codigo'].setValue(
            this.formGroupCuenta.controls['numeroGrupo'].value
            + this.formGroupCuenta.controls['numeroSubGrupo'].value
            + this.formGroupCuenta.controls['numeroRubro'].value
            + this.formGroupCuenta.controls['numeroCuentaCompuesta'].value
            + this.formGroupCuenta.controls['numeroSubCuenta'].value
        );
    }

    onChangeTipoMoneda(radioChange: MatRadioChange): void {
        
    }


    get f(): any {
        return this.formGroupCuenta.controls;
    }
}
