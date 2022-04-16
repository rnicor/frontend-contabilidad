import {TipoComprobante} from '../../../parametros/tipo-comprobante/type/tipo-comprobante.types';
import {Dominio} from '../../../../core/user/dominio.types';
import {Sucursal} from '../../../admin/sucursal/type/sucursal.types';

export interface InicioDatosFacturaCom {
    tipoComprobante: TipoComprobante[];
    moneda: Dominio[];
    proyecto: Dominio[];
    sucursal: Sucursal[];
    tipoCambio: Dominio;
    codigoCuenta: Dominio[];
    tipoCompra: Dominio[];
}
