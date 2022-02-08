import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { SucursalComponent } from './sucursal.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { LineaComponent } from './linea/linea.component';
import { CrearSucursalComponent } from './crear-sucursal/crear-sucursal.component';


const routes: Routes = [
  {
    path: '',
    component: SucursalComponent, children:[
      { path: '', component:InicioComponent},
      { path: 'funcionarios', component: FuncionarioComponent},
      { path: 'linea', component: LineaComponent},
      { path: 'crear-sucursal', component: CrearSucursalComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SucursalRoutingModule { }
