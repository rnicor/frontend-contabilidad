import {TipoComprobante} from '../../../parametros/tipo-comprobante/type/tipo-comprobante.types';
import {Cuenta} from '../../../parametros/cuenta/type/cuenta.types';

export interface RegistroTipoInicio {
    fecha: string;
    tipoComprobante: TipoComprobante[];
    cuentas: Cuenta[];
}
