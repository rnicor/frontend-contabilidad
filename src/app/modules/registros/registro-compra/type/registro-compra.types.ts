import {RegistroCompraDetalle} from './registro-compra-detalle.types';

export interface RegistroCompra {
    id: number;
    gestionId: number;
    periodo: string;
    sucursalId: number;
    detalle: RegistroCompraDetalle[];
}
