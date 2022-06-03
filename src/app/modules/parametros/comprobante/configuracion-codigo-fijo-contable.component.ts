import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ConfiguracionCodigoService} from './service/configuracion-codigo.service';
import {ConfiguracionCodigo} from './type/configuracion-codigo.types';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PlanCuentaModalComponent} from './modal/plan-cuenta-modal.component';

@Component({
    selector: 'app-configuracion-codigo-fijo-contable',
    templateUrl: './configuracion-codigo-fijo-contable.component.html',
    styleUrls: ['./configuracion-codigo-fijo-contable.component.scss']
})
export class ConfiguracionCodigoFijoContableComponent implements OnInit {

    formGroupCodigoFijoContable: FormGroup;

    listaConfiguracionCodigo: ConfiguracionCodigo[];
    configuracionCodigo: ConfiguracionCodigo;

    constructor(
        private configuracionCodigoFijoContableService: ConfiguracionCodigoService,
        private _formBuilder: FormBuilder,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {

        this.listaConfiguracionCodigo = [];
        this.iniciarFormulario();
        this.configuracionCodigoFijoContableService.inicio().subscribe(
            (response) => {

                //Se debe armar el formulario desde el backend

                console.log(response);
                //control 1
                this.formGroupCodigoFijoContable.controls['id0'].setValue(response[0].id);
                this.formGroupCodigoFijoContable.controls['numeroControl0'].setValue(response[0].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta0'].setValue(response[0].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre0'].setValue(response[0].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje0'].setValue(response[0].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion0'].setValue(response[0].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio0'].setValue(response[0].valorRadio);

            }
        );

    }

    iniciarFormulario(): void {
        this.formGroupCodigoFijoContable = this._formBuilder.group({

            id0: [],
            numeroControl0: [],
            codigoCuenta0: [],
            nombre0: [],
            valorPorcentaje0: [],
            valorSeleccion0: [],
            valorRadio0: [],

        });
    }

    guardarConfiguracionCodigo(): void {

        this.listaConfiguracionCodigo = [];
        console.log('Form:', this.formGroupCodigoFijoContable.value);

        //console.log(this.configuracionCodigo.id);
        this.configuracionCodigo = this.configuracionCodigo ? this.configuracionCodigo : this.configuracionCodigo = {
            id: null,
            numeroControl: null,
            codigoCuenta: null,
            nombre: null,
            valorPorcentaje: null,
            valorSeleccion: null,
            valorRadio: null,
            fecha: null
        };

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id0'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl0'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta0'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre0'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje0'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion0'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio0'].value;
        let aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);


        this.configuracionCodigoFijoContableService.guardarConfiguracionCodigo(this.listaConfiguracionCodigo).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }

    asignarPlanCuenta(cuenta: number, numeroControl: string, nombreControl: string, codigoCuenta: string): void {

        console.log('codigoCuenta', cuenta);
        console.log('numeroControl', numeroControl);

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            codCuenta: cuenta,
        };
        dialogConfig.width = '60%';
        const dialogRef = this.dialog.open(PlanCuentaModalComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data)=>{
            this.formGroupCodigoFijoContable.controls[codigoCuenta].setValue(data.codigo.toString());
            this.formGroupCodigoFijoContable.controls[nombreControl].setValue(data.nombre.toString());

        });


    }


}
