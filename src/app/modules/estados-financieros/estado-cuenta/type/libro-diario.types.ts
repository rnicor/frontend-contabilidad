import {LibroDiarioDetalle} from "./libro-diario-detalle.types";

export interface LibroDiario {
    id: number;
    tipoComprobanteId: number;
    fechaDesde: string;
    fechaHasta: string;
    tipoCambio: number;
    moneda: string;
    pagadoA: string;
    nitCi: string;
    nroRecibo: number;
    nroComprobante: number;
    glosa: string;
    totalDebeBoliviano: number;
    totalHaberBoliviano: number;
    totalHaberDolar: number;
    totalDebeDolar: number;
    diferenciaDebeBoliviano: number;
    diferenciaHaberBoliviano: number;
    diferenciaDebeDolar: number;
    diferenciaHaberDolar: number;
    detalle: LibroDiarioDetalle[];
}
