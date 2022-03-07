import {Dominio} from '../../../../core/user/dominio.types';
import {PlanCuentaFachada} from './plan-cuenta-fachada.types';

export interface PlanCuentaInicio {
    nivelCuenta: Dominio[];
    cuentaPrincipal: Dominio[];
    tipoMonedaContabilidad: Dominio[];
    listaPlanCuentaFachada: PlanCuentaFachada[];
}
