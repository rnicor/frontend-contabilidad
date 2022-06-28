import {LOCALE_ID, NgModule} from '@angular/core';
import localeES from '@angular/common/locales/es';
import {MAT_DATE_FORMATS, MatRippleModule} from '@angular/material/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Route, RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FuseAlertModule} from '../../../../@fuse/components/alert';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LibroDiarioComponent} from './libro-diario.component';

registerLocaleData(localeES, 'es');

const libroRoutes: Route[] = [
    {
        path: '',
        component: LibroDiarioComponent
    }
];

@NgModule({
  declarations: [
      LibroDiarioComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(libroRoutes),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatSortModule,
        MatRippleModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatTableModule,
        MatDialogModule,
        MatRadioModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatSnackBarModule,
        FuseAlertModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule
    ],
    providers: [
        {
            provide: LOCALE_ID, useValue: 'es-ES'
        },
        {
            provide : MAT_DATE_FORMATS,
            useValue: {
                parse  : {
                    dateInput: 'DD/MM/YYYY',
                },
                display: {
                    dateInput         : 'DD/MM/YYYY',
                    monthYearLabel    : 'MMM YYYY',
                    dateA11yLabel     : 'LL',
                    monthYearA11yLabel: 'MMMM YYYY'
                }
            }
        }
    ]
})
export class LibroDiarioModule { }
