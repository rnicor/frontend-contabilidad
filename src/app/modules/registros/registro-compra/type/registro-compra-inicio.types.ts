import {Dominio} from '../../../../core/user/dominio.types';
import {Gestion} from '../../../../core/user/gestion.types';


export interface RegistroCompraInicio {
    sucursalId: number;
    gestiones: Gestion[];
    meses: Dominio[];
    tiposCompra: Dominio[];
}
