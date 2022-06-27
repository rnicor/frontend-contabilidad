import {Dominio} from '../../../../core/user/dominio.types';
import {TipoComprobante} from '../../../parametros/tipo-comprobante/type/tipo-comprobante.types';
import {Cuenta} from '../../../parametros/cuenta/type/cuenta.types';

export interface LibriDiarioInicio {
    fechaDesde: string;
    fechaHaste: string;

    meses: Dominio[];
    tipoComprobante: TipoComprobante[];
    tipoMoneda: Dominio[];
    nroRecibo: number;
    nroComprobante: number;
    cuentas: Cuenta[];
}
