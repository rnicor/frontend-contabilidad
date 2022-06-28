import {Dominio} from '../../../../core/user/dominio.types';
import {TipoComprobante} from '../../../parametros/tipo-comprobante/type/tipo-comprobante.types';

export interface LibriDiarioInicio {
    fecha: string;
    meses: Dominio[];
    tipoComprobante: TipoComprobante[];
}
