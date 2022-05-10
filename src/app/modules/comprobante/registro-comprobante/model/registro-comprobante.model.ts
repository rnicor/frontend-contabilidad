
export interface RegistroComprobante {

    id: number;
    usuarioId: number;
    tipoComprobanteId: number;
    fecha: string;
    tipoMoneda: string;
    valorCambio: number;
    pagadoA: string;
    valorNitCi: string;
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
    fechaRegistro: string;

}



