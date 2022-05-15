import {Dominio} from '../../../../core/user/dominio.types';
import {Gestion} from '../../../../core/user/gestion.types';


export interface RegistroVentaInicio {
    sucursalId: number;
    gestiones: Gestion[];
    meses: Dominio[];
    tiposVenta: Dominio[];
    estadosVenta: Dominio[];
}
