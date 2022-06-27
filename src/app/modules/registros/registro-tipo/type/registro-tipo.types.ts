import {RegistroTipoDetalle} from './registro-tipo-detalle.types';

export interface RegistroTipo {
    id: number;
    tipoComprobanteId: number;
    nombre: string;
    glosa: string;
    detalle: RegistroTipoDetalle[];
}
