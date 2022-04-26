import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {LineasComponent} from './ufv.component';
import {LineaDetalleComponent} from './details/ufv-detalle.component';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRippleModule} from '@angular/material/core';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {FuseAlertModule} from '../../../../@fuse/components/alert';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FuseCardModule} from '../../../../@fuse/components/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const subcategoriaRoutes: Route[] = [
    {
        path     : '',
        component: LineasComponent
    }
];

@NgModule({
    declarations: [
        LineasComponent,
        LineaDetalleComponent
    ],
    imports     : [
        CommonModule,
        RouterModule.forChild(subcategoriaRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatTableModule,
        MatDialogModule,
        FuseAlertModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        FuseCardModule,
        MatSnackBarModule,
    ]
})
export class UfvModule
{
}
