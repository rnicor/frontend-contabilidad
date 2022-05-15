import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MAT_DATE_FORMATS, MatRippleModule} from '@angular/material/core';

import * as moment from 'moment';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FuseFindByKeyPipeModule} from '../../../../@fuse/pipes/find-by-key';
import {SharedModule} from '../../../shared/shared.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {RegistroCompraRoutingModule} from './registro-compra-routing.module';
import {RegistroCompraDetalleComponent} from './component/modal/registro-compra-detalle.component';
import {RegistroCompraSimpleComponent} from './component/simple/registro-compra-simple.component';
import {RegistroCompraMasivoComponent} from './component/masivo/registro-compra-masivo.component';
import {RegistroCompraComponent} from './registro-compra.component';
import {FuseAlertModule} from '../../../../@fuse/components/alert';
import {PipeModule} from '../../../shared/pipes/pipe.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        RegistroCompraComponent,
        RegistroCompraDetalleComponent,
        RegistroCompraSimpleComponent,
        RegistroCompraMasivoComponent
    ],
    imports: [
        RegistroCompraRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatMomentDateModule,
        MatProgressBarModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatTableModule,
        MatTooltipModule,
        FuseFindByKeyPipeModule,
        SharedModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatDialogModule,
        MatAutocompleteModule,
        FuseAlertModule,
        PipeModule,
        MatProgressSpinnerModule,
    ],
    providers   : [
        {
            provide : MAT_DATE_FORMATS,
            useValue: {
                parse  : {
                    dateInput: moment.ISO_8601
                },
                display: {
                    dateInput         : 'DD-MM-YYYY',
                    monthYearLabel    : 'MMM YYYY',
                    dateA11yLabel     : 'LL',
                    monthYearA11yLabel: 'MMMM YYYY'
                }
            }
        }
    ]
})
export class RegistroCompraModule {
}
