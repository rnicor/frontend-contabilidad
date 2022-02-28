import { Pipe, PipeTransform } from '@angular/core';
import {Dominio} from '../../core/user/dominio.types';

@Pipe({
  name: 'nombreDominio'
})
export class NombreDominioPipe implements PipeTransform {

  transform(codigo: string, dominios: any[]): string {
    const titular: Dominio = dominios.find(dominio => dominio.codigo === codigo);
    return titular !== undefined ? titular.nombre : null;
  }
}
