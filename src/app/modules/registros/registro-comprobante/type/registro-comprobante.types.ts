import {RegistroComprobanteDetalle} from "./registro-comprobante-detalle.types";

export interface RegistroComprobante {
    id: number;
    tipoComprobanteId: number;
    fecha: string;
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
    detalle: RegistroComprobanteDetalle[];
}
