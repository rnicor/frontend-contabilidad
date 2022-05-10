
export interface RegistroComprobanteDetalle {
    id: number;
    registroComprobanteId: number;
    codigoPlanCuenta: string;
    nombrePlanCuenta: string;
    referencia: string;
    debeBoliviano: number;
    haberBoliviano: number;
    debeDolar: number;
    haberDolar: number;
    banco: string;
    nroCheque: number;
    iva: boolean;
    fechaRegistro: string;
}



