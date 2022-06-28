import {RepLibroDiarioDetalle} from './rep-libro-diario-detalle.types';

export interface RepLibroDiario {
    detalle: RepLibroDiarioDetalle[];
    totalDebeBoliviano: number;
    totalHaberBoliviano: number;
    totalHaberDolar: number;
    totalDebeDolar: number;
}
