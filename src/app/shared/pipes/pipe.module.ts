import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NombreDominioPipe } from './nombre-dominio.pipe';

@NgModule({
  declarations: [NombreDominioPipe],
  imports: [
    CommonModule
  ],
  exports: [
    NombreDominioPipe,
  ]
})
export class PipeModule { }
