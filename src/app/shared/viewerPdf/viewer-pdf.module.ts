import { NgModule } from '@angular/core';
import {ViewerPdfComponent} from './viewer-pdf.component';
import {MatDialogModule} from '@angular/material/dialog';
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
import {FuseAlertModule} from '../../../@fuse/components/alert';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FuseCardModule} from '../../../@fuse/components/card';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';

@NgModule({
    declarations: [
        ViewerPdfComponent
    ],
    imports     : [
        CommonModule,
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
        NgxExtendedPdfViewerModule
    ],
    exports: [
        ViewerPdfComponent
    ]
})
export class ViewerPdfModule
{
}
