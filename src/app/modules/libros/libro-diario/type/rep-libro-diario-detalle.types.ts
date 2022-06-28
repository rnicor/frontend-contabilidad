export interface RepLibroDiarioDetalle{
    comprobanteId: number;
    comprobanteDetalleId: number;
    fecha: string;
    tipo: number;
    numeroComprobante: number;
    codigoCuenta: string;
    nombreCuenta: string;
    referencia: string;
    debeBoliviano: number;
    haberBoliviano: number;
    debeDolar: number;
    haberDolar: number;
}
