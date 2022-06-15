import {Dominio} from '../../../../core/user/dominio.types';
import {TipoComprobante} from '../../../parametros/tipo-comprobante/type/tipo-comprobante.types';
import {Cuenta} from '../../../parametros/cuenta/type/cuenta.types';

export interface RegistroComprobanteInicio {
    fecha: string;
    tipoComprobante: TipoComprobante[];
    tipoMoneda: Dominio[];
    nroRecibo: number;
    nroComprobante: number;
    cuentas: Cuenta[];
}
