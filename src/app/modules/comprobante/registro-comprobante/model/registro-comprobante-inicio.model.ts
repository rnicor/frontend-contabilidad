import {TipoComprobante} from '../../../parametros/tipo-comprobante/type/tipo-comprobante.types';
import {Dominio} from '../../../../core/user/dominio.types';

export interface RegistroComprobanteInicio {
    fecha: string;
    tipoComprobanteDTO: TipoComprobante[];
    tipoMoneda: Dominio[];
    nroRecibo: number;
    nroComprobante: number;
}
