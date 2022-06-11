export interface RegistroComprobanteDetalle{
    id: number;
    comprobanteId: number;
    codigoCuenta: string;
    nombreCuenta: string;
    referencia: string;
    debeBoliviano: number;
    haberBoliviano: number;
    debeDolar: number;
    haberDolar: number;
    banco: string;
    nroCheque: number;
    iva: boolean;
}
