import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { GestionDetalleComponent } from './gestion-detalle/gestion-detalle.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {CommonModule} from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: ExampleComponent
    }
];

@NgModule({
    declarations: [
        ExampleComponent,
        GestionDetalleComponent
    ],
    imports: [
        RouterModule.forChild(exampleRoutes),
        ReactiveFormsModule,
        MatDialogModule,
        MatIconModule,
        MatSelectModule,
        MatTableModule,
        MatSortModule,
        CommonModule,
        MatProgressBarModule,
        MatButtonModule,
        MatPaginatorModule
    ]
})
export class ExampleModule
{
}
