import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConfiguracionCodigoService} from './service/configuracion-codigo.service';
import {ConfiguracionCodigo} from './type/configuracion-codigo.types';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PlanCuentaModalComponent} from "./modal/plan-cuenta-modal.component";

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

                //control 13
                this.formGroupCodigoFijoContable.controls['id12'].setValue(response[12].id);
                this.formGroupCodigoFijoContable.controls['numeroControl12'].setValue(response[12].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta12'].setValue(response[12].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre12'].setValue(response[12].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje12'].setValue(response[12].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion12'].setValue(response[12].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio12'].setValue(response[12].valorRadio);

                //control 14
                this.formGroupCodigoFijoContable.controls['id13'].setValue(response[13].id);
                this.formGroupCodigoFijoContable.controls['numeroControl13'].setValue(response[13].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta13'].setValue(response[13].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre13'].setValue(response[13].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje13'].setValue(response[13].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion13'].setValue(response[13].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio13'].setValue(response[13].valorRadio);

                //control 15
                this.formGroupCodigoFijoContable.controls['id14'].setValue(response[14].id);
                this.formGroupCodigoFijoContable.controls['numeroControl14'].setValue(response[14].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta14'].setValue(response[14].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre14'].setValue(response[14].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje14'].setValue(response[14].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion14'].setValue(response[14].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio14'].setValue(response[14].valorRadio);

                //control 16
                this.formGroupCodigoFijoContable.controls['id15'].setValue(response[15].id);
                this.formGroupCodigoFijoContable.controls['numeroControl15'].setValue(response[15].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta15'].setValue(response[15].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre15'].setValue(response[15].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje15'].setValue(response[15].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion15'].setValue(response[15].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio15'].setValue(response[15].valorRadio);

                //control 17
                this.formGroupCodigoFijoContable.controls['id16'].setValue(response[16].id);
                this.formGroupCodigoFijoContable.controls['numeroControl16'].setValue(response[16].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta16'].setValue(response[16].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre16'].setValue(response[16].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje16'].setValue(response[16].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion16'].setValue(response[16].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio16'].setValue(response[16].valorRadio);

                //control 18
                this.formGroupCodigoFijoContable.controls['id17'].setValue(response[17].id);
                this.formGroupCodigoFijoContable.controls['numeroControl17'].setValue(response[17].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta17'].setValue(response[17].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre17'].setValue(response[17].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje17'].setValue(response[17].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion17'].setValue(response[17].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio17'].setValue(response[17].valorRadio);

                //control 19
                this.formGroupCodigoFijoContable.controls['id18'].setValue(response[18].id);
                this.formGroupCodigoFijoContable.controls['numeroControl18'].setValue(response[18].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta18'].setValue(response[18].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre18'].setValue(response[18].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje18'].setValue(response[18].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion18'].setValue(response[18].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio18'].setValue(response[18].valorRadio);

                //control 20
                this.formGroupCodigoFijoContable.controls['id19'].setValue(response[19].id);
                this.formGroupCodigoFijoContable.controls['numeroControl19'].setValue(response[19].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta19'].setValue(response[19].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre19'].setValue(response[19].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje19'].setValue(response[19].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion19'].setValue(response[19].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio19'].setValue(response[19].valorRadio);

                //control 21
                this.formGroupCodigoFijoContable.controls['id20'].setValue(response[20].id);
                this.formGroupCodigoFijoContable.controls['numeroControl20'].setValue(response[20].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta20'].setValue(response[20].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre20'].setValue(response[20].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje20'].setValue(response[20].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion20'].setValue(response[20].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio20'].setValue(response[20].valorRadio);

                //control 22
                this.formGroupCodigoFijoContable.controls['id21'].setValue(response[21].id);
                this.formGroupCodigoFijoContable.controls['numeroControl21'].setValue(response[21].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta21'].setValue(response[21].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre21'].setValue(response[21].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje21'].setValue(response[21].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion21'].setValue(response[21].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio21'].setValue(response[21].valorRadio);

                //control 23
                this.formGroupCodigoFijoContable.controls['id22'].setValue(response[22].id);
                this.formGroupCodigoFijoContable.controls['numeroControl22'].setValue(response[22].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta22'].setValue(response[22].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre22'].setValue(response[22].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje22'].setValue(response[22].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion22'].setValue(response[22].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio22'].setValue(response[22].valorRadio);

                //control 24
                this.formGroupCodigoFijoContable.controls['id23'].setValue(response[23].id);
                this.formGroupCodigoFijoContable.controls['numeroControl23'].setValue(response[23].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta23'].setValue(response[23].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre23'].setValue(response[23].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje23'].setValue(response[23].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion23'].setValue(response[23].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio23'].setValue(response[23].valorRadio);

                //control 25
                this.formGroupCodigoFijoContable.controls['id24'].setValue(response[24].id);
                this.formGroupCodigoFijoContable.controls['numeroControl24'].setValue(response[24].numeroControl);
                this.formGroupCodigoFijoContable.controls['codigoCuenta24'].setValue(response[24].codigoCuenta);
                this.formGroupCodigoFijoContable.controls['nombre24'].setValue(response[24].nombre);
                this.formGroupCodigoFijoContable.controls['valorPorcentaje24'].setValue(response[24].valorPorcentaje);
                this.formGroupCodigoFijoContable.controls['valorSeleccion24'].setValue(response[24].valorSeleccion);
                this.formGroupCodigoFijoContable.controls['valorRadio24'].setValue(response[24].valorRadio);
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
            valorRadio11: [],

            id12: [],
            numeroControl12: [],
            codigoCuenta12: [],
            nombre12: [],
            valorPorcentaje12: [],
            valorSeleccion12: [],
            valorRadio12: [],

            id13: [],
            numeroControl13: [],
            codigoCuenta13: [],
            nombre13: [],
            valorPorcentaje13: [],
            valorSeleccion13: [],
            valorRadio13: [],

            id14: [],
            numeroControl14: [],
            codigoCuenta14: [],
            nombre14: [],
            valorPorcentaje14: [],
            valorSeleccion14: [],
            valorRadio14: [],

            id15: [],
            numeroControl15: [],
            codigoCuenta15: [],
            nombre15: [],
            valorPorcentaje15: [],
            valorSeleccion15: [],
            valorRadio15: [],

            id16: [],
            numeroControl16: [],
            codigoCuenta16: [],
            nombre16: [],
            valorPorcentaje16: [],
            valorSeleccion16: [],
            valorRadio16: [],

            id17: [],
            numeroControl17: [],
            codigoCuenta17: [],
            nombre17: [],
            valorPorcentaje17: [],
            valorSeleccion17: [],
            valorRadio17: [],

            id18: [],
            numeroControl18: [],
            codigoCuenta18: [],
            nombre18: [],
            valorPorcentaje18: [],
            valorSeleccion18: [],
            valorRadio18: [],

            id19: [],
            numeroControl19: [],
            codigoCuenta19: [],
            nombre19: [],
            valorPorcentaje19: [],
            valorSeleccion19: [],
            valorRadio19: [],

            id20: [],
            numeroControl20: [],
            codigoCuenta20: [],
            nombre20: [],
            valorPorcentaje20: [],
            valorSeleccion20: [],
            valorRadio20: [],

            id21: [],
            numeroControl21: [],
            codigoCuenta21: [],
            nombre21: [],
            valorPorcentaje21: [],
            valorSeleccion21: [],
            valorRadio21: [],

            id22: [],
            numeroControl22: [],
            codigoCuenta22: [],
            nombre22: [],
            valorPorcentaje22: [],
            valorSeleccion22: [],
            valorRadio22: [],

            id23: [],
            numeroControl23: [],
            codigoCuenta23: [],
            nombre23: [],
            valorPorcentaje23: [],
            valorSeleccion23: [],
            valorRadio23: [],

            id24: [],
            numeroControl24: [],
            codigoCuenta24: [],
            nombre24: [],
            valorPorcentaje24: [],
            valorSeleccion24: [],
            valorRadio24: []

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

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id12'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl12'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta12'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre12'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje12'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion12'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio12'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id13'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl13'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta13'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre13'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje13'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion13'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio13'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id14'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl14'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta14'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre14'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje14'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion14'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio14'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id15'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl15'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta15'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre15'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje15'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion15'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio15'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id16'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl16'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta16'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre16'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje16'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion16'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio16'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id17'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl17'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta17'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre17'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje17'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion17'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio17'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id18'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl18'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta18'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre18'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje18'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion18'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio18'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id19'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl19'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta19'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre19'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje19'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion19'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio19'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id20'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl20'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta20'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre20'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje20'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion20'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio20'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id21'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl21'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta21'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre21'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje21'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion21'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio21'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id22'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl22'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta22'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre22'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje22'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion22'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio22'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id23'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl23'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta23'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre23'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje23'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion23'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio23'].value;
        aux = Object.assign({}, this.configuracionCodigo);
        this.listaConfiguracionCodigo.push(aux);

        this.configuracionCodigo.id = this.formGroupCodigoFijoContable.controls['id24'].value;
        this.configuracionCodigo.numeroControl = this.formGroupCodigoFijoContable.controls['numeroControl24'].value;
        this.configuracionCodigo.codigoCuenta = this.formGroupCodigoFijoContable.controls['codigoCuenta24'].value;
        this.configuracionCodigo.nombre = this.formGroupCodigoFijoContable.controls['nombre24'].value;
        this.configuracionCodigo.valorPorcentaje = this.formGroupCodigoFijoContable.controls['valorPorcentaje24'].value;
        this.configuracionCodigo.valorSeleccion = this.formGroupCodigoFijoContable.controls['valorSeleccion24'].value;
        this.configuracionCodigo.valorRadio = this.formGroupCodigoFijoContable.controls['valorRadio24'].value;
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
