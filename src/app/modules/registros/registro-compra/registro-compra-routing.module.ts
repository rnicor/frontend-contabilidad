import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistroCompraComponent} from './registro-compra.component';
import {RegistroCompraSimpleComponent} from './component/simple/registro-compra-simple.component';
import {RegistroCompraMasivoComponent} from './component/masivo/registro-compra-masivo.component';


const routes: Routes = [
  {
    path: '',
    component: RegistroCompraComponent,
    children: [
      {path: 'simple', component: RegistroCompraSimpleComponent},
      {path: 'masivo', component: RegistroCompraMasivoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroCompraRoutingModule {
}
