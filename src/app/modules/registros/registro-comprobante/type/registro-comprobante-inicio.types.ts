import {Dominio} from '../../../../core/user/dominio.types';
import {TipoComprobante} from "../../../parametros/tipo-comprobante/type/tipo-comprobante.types";
import {PlanCuenta} from "../../../parametros/plan-cuentas/type/plan-cuenta.types";

export interface RegistroComprobanteInicio {
    fecha: string;
    tipoComprobante: TipoComprobante[];
    tipoMoneda: Dominio[];
    nroRecibo: number;
    nroComprobante: number;
    cuentas: PlanCuenta[];
}
