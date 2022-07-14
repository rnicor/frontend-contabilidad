import {RepLibroMayorDetalle} from './rep-libro-mayor-detalle.types';

export interface RepLibroMayor {
    detalle: RepLibroMayorDetalle[];
    totalDebeBoliviano: number;
    totalHaberBoliviano: number;
    totalHaberDolar: number;
    totalDebeDolar: number;
}
