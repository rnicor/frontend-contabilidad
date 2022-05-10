import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PlanCuentaModalComponent} from '../../parametros/configuracion-codigo-fijo-contable/modal/plan-cuenta-modal.component';
import {GestionComponent} from '../../parametros/gestion/gestion.component';
import {GestionDetalleComponent} from './gestion-detalle/gestion-detalle.component';

@Component({
    selector     : 'example',
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent implements OnInit
{
    /**
     * Constructor
     */
    constructor(
        public dialog: MatDialog
    )
    {
    }

    ngOnInit(): void {
        //lLAMAR A LA VENTANA HIJA
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            //codCuenta: cuenta,
        };
        dialogConfig.width = '60%';
        const dialogRef = this.dialog.open(GestionDetalleComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data)=>{
            /*this.formGroupCodigoFijoContable.controls[codigoCuenta].setValue(data.codigo.toString());
            this.formGroupCodigoFijoContable.controls[nombreControl].setValue(data.nombre.toString());*/

        });

    }
}
