import {RegistroVentaDetalle} from './registro-venta-detalle.types';

export interface RegistroVenta {
    id: number;
    gestionId: number;
    periodo: string;
    sucursalId: number;
    detalle: RegistroVentaDetalle[];
}
