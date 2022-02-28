import { ArchivoUsuario } from './../../modules/admin/usuario/type/usuario.types';
import { Sucursal } from 'app/modules/admin/sucursal/type/sucursal.types';
import {Rol} from './rol.types';

export interface User
{
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    cargo: string;
    rol: Rol;
    sucursal: Sucursal;
    archivo: ArchivoUsuario;
}
