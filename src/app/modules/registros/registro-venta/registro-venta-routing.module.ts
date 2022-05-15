import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistroVentaComponent} from './registro-venta.component';
import {RegistroVentaSimpleComponent} from './component/simple/registro-venta-simple.component';
import {RegistroVentaMasivoComponent} from './component/masivo/registro-venta-masivo.component';


const routes: Routes = [
  {
    path: '',
    component: RegistroVentaComponent,
    children: [
      {path: 'simple', component: RegistroVentaSimpleComponent},
      {path: 'masivo', component: RegistroVentaMasivoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroVentaRoutingModule {
}
