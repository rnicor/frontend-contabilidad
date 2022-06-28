import {LibroDiarioDetalle} from "./libro-diario-detalle.types";

export interface LibroReporte {
   
    totalDebeBoliviano: number;
    totalHaberBoliviano: number;
    totalHaberDolar: number;
    totalDebeDolar: number;
    detalle: LibroDiarioDetalle[];
}
