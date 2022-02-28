import {Funcionario} from './funcionario.types';

export interface Usuario {
    id: number;
    sucursalId: number;
    rolId: number;
    login: string;
    clave: string;
    enabled: boolean;
    funcionario: Funcionario;
    archivo: ArchivoUsuario;
    nombreCompleto?: string;
}

export interface ArchivoUsuario {
    id: number;
    url: string;
    nombre: string;
    mimetype: string;
    tamanio: number;
    principal: boolean;
    orden: number;
}
