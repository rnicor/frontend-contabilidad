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

                //control 2
                this.formGroupCodigoFijoContable.controls['id1'].setValue(response[1].id);
                this.formGroupCodigoFijoContable.controls['numeroControl1'].setValue(response[1].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta1'].setValue(response[1].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre1'].setValue(response[1].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje1'].setValue(response[1].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion1'].setValue(response[1].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio1'].setValue(response[1].valorRadio);

                //control 3
                this.formGroupCodigoFijoContable.controls['id2'].setValue(response[2].id);
                this.formGroupCodigoFijoContable.controls['numeroControl2'].setValue(response[2].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta2'].setValue(response[2].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre2'].setValue(response[2].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje2'].setValue(response[2].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion2'].setValue(response[2].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio2'].setValue(response[2].valorRadio);

                //control 4
                this.formGroupCodigoFijoContable.controls['id3'].setValue(response[3].id);
                this.formGroupCodigoFijoContable.controls['numeroControl3'].setValue(response[3].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta3'].setValue(response[3].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre3'].setValue(response[3].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje3'].setValue(response[3].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion3'].setValue(response[3].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio3'].setValue(response[3].valorRadio);

                //control 5
                this.formGroupCodigoFijoContable.controls['id4'].setValue(response[4].id);
                this.formGroupCodigoFijoContable.controls['numeroControl4'].setValue(response[4].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta4'].setValue(response[4].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre4'].setValue(response[4].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje4'].setValue(response[4].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion4'].setValue(response[4].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio4'].setValue(response[4].valorRadio);

                //control 6
                this.formGroupCodigoFijoContable.controls['id5'].setValue(response[5].id);
                this.formGroupCodigoFijoContable.controls['numeroControl5'].setValue(response[5].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta5'].setValue(response[5].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre5'].setValue(response[5].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje5'].setValue(response[5].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion5'].setValue(response[5].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio5'].setValue(response[5].valorRadio);

                //control 7
                this.formGroupCodigoFijoContable.controls['id6'].setValue(response[6].id);
                this.formGroupCodigoFijoContable.controls['numeroControl6'].setValue(response[6].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta6'].setValue(response[6].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre6'].setValue(response[6].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje6'].setValue(response[6].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion6'].setValue(response[6].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio6'].setValue(response[6].valorRadio);

                console.log('hola');
                console.log(this.formGroupCodigoFijoContable.controls['id6'].value);

                //control 8
                this.formGroupCodigoFijoContable.controls['id7'].setValue(response[7].id);
                this.formGroupCodigoFijoContable.controls['numeroControl7'].setValue(response[7].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta7'].setValue(response[7].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre7'].setValue(response[7].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje7'].setValue(response[7].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion7'].setValue(response[7].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio7'].setValue(response[7].valorRadio);

                //control 9
                this.formGroupCodigoFijoContable.controls['id8'].setValue(response[8].id);
                this.formGroupCodigoFijoContable.controls['numeroControl8'].setValue(response[8].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta8'].setValue(response[8].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre8'].setValue(response[8].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje8'].setValue(response[8].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion8'].setValue(response[8].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio8'].setValue(response[8].valorRadio);

                //control 10
                this.formGroupCodigoFijoContable.controls['id9'].setValue(response[9].id);
                this.formGroupCodigoFijoContable.controls['numeroControl9'].setValue(response[9].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta9'].setValue(response[9].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre9'].setValue(response[9].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje9'].setValue(response[9].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion9'].setValue(response[9].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio9'].setValue(response[9].valorRadio);

                //control 11
                this.formGroupCodigoFijoContable.controls['id10'].setValue(response[10].id);
                this.formGroupCodigoFijoContable.controls['numeroControl10'].setValue(response[10].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta10'].setValue(response[10].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre10'].setValue(response[10].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje10'].setValue(response[10].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion10'].setValue(response[10].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio10'].setValue(response[10].valorRadio);

                //control 12
                this.formGroupCodigoFijoContable.controls['id11'].setValue(response[11].id);
                this.formGroupCodigoFijoContable.controls['numeroControl11'].setValue(response[11].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta11'].setValue(response[11].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre11'].setValue(response[11].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje11'].setValue(response[11].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion11'].setValue(response[11].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio11'].setValue(response[11].valorRadio);

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

            id1: [],
            numeroControl1: [],
            codigoCuenta1: [],
            nombre1: [],
            valorPorcentaje1: [],
            valorSeleccion1: [],
            valorRadio1: [],

            id2: [],
            numeroControl2: [],
            codigoCuenta2: [],
            nombre2: [],
            valorPorcentaje2: [],
            valorSeleccion2: [],
            valorRadio2: [],

            id3: [],
            numeroControl3: [],
            codigoCuenta3: [],
            nombre3: [],
            valorPorcentaje3: [],
            valorSeleccion3: [],
            valorRadio3: [],

            id4: [],
            numeroControl4: [],
            codigoCuenta4: [],
            nombre4: [],
            valorPorcentaje4: [],
            valorSeleccion4: [],
            valorRadio4: [],

            id5: [],
            numeroControl5: [],
            codigoCuenta5: [],
            nombre5: [],
            valorPorcentaje5: [],
            valorSeleccion5: [],
            valorRadio5: [],

            id6: [],
            numeroControl6: [],
            codigoCuenta6: [],
            nombre6: [],
            valorPorcentaje6: [],
            valorSeleccion6: [],
            valorRadio6: [],

            id7: [],
            numeroControl7: [],
            codigoCuenta7: [],
            nombre7: [],
            valorPorcentaje7: [],
            valorSeleccion7: [],
            valorRadio7: [],

            id8: [],
            numeroControl8: [],
            codigoCuenta8: [],
            nombre8: [],
            valorPorcentaje8: [],
            valorSeleccion8: [],
            valorRadio8: [],

            id9: [],
            numeroControl9: [],
            codigoCuenta9: [],
            nombre9: [],
            valorPorcentaje9: [],
            valorSeleccion9: [],
            valorRadio9: [],

            id10: [],
            numeroControl10: [],
            codigoCuenta10: [],
            nombre10: [],
            valorPorcentaje10: [],
            valorSeleccion10: [],
            valorRadio10: [],

            id11: [],
            numeroControl11: [],
            codigoCuenta11: [],
            nombre11: [],
            valorPorcentaje11: [],
            valorSeleccion11: [],
            valorRadio11: []

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

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id1'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl1'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta1'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre1'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje1'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion1'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio1'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id2'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl2'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta2'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre2'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje2'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion2'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio2'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id3'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl3'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta3'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre3'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje3'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion3'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio3'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id4'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl4'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta4'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre4'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje4'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion4'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio4'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id5'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl5'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta5'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre5'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje5'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion5'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio5'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id6'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl6'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta6'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre6'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje6'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion6'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio6'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id7'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl7'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta7'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre7'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje7'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion7'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio7'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id8'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl8'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta8'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre8'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje8'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion8'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio8'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id9'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl9'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta9'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre9'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje9'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion9'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio9'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id10'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl10'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta10'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre10'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje10'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion10'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio10'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id11'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl11'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta11'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre11'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje11'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion11'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio11'].value;
        aux = Object.assign({}, this.configuracionCodigo);
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


        //armar el control
        /*let codigoCuentaDestino = 'codigoCuenta'.concat(numeroControl);

        let nombreCuentaDestino = 'nombre'.concat(numeroControl);

        console.log('codigoCuentaDestino', codigoCuentaDestino);
        console.log('nombreCuentaDestino', nombreCuentaDestino);*/



        //Abrir ventana con los codigos de cuentas.
        //this.formGroupCodigoFijoContable.controls['codigoCuenta`3`'].setValue(100);

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
