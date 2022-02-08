import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SucursalRoutingModule } from './sucursal-routing.module';
// import { InicioComponent } from './inicio/inicio.component';
// import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { LineaComponent } from './linea/linea.component';
import { SucursalService } from './sucursal.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import { CrearSucursalComponent } from './crear-sucursal/crear-sucursal.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // InicioComponent,
    // NavbarComponent
  
    FuncionarioComponent,
    LineaComponent,
    CrearSucursalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SucursalRoutingModule,
    MatToolbarModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  exports: [
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatToolbarModule, 
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  entryComponents: [
    SucursalService
  ]
})
export class SucursalModule { }
