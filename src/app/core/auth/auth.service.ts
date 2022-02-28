import { ArchivoUsuario } from './../../modules/admin/usuario/type/usuario.types';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../user/user.types';
import {Rol} from '../user/rol.types';
import {environment} from '../../../environments/environment';
import { Sucursal } from 'app/modules/admin/sucursal/type/sucursal.types';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _usuario: User;
    private _token: string;
    constructor(private http: HttpClient) {}

    public get usuario(): User {
        if (this._usuario) {
            return this._usuario;
        } else if (!this._usuario && sessionStorage.getItem('velacuss_usuario')) {
            this._usuario = JSON.parse(sessionStorage.getItem('velacuss_usuario')) as User;
            return this._usuario;
        }
        return null;
        }
    public get rol(): Rol {
        if (this._usuario && this._usuario.rol) {
            return this._usuario.rol;
        } else if (!this._usuario && sessionStorage.getItem('velacuss_usuario')) {
            this._usuario = JSON.parse(sessionStorage.getItem('velacuss_usuario')) as User;
            if (this._usuario && this._usuario.rol) {
                return this._usuario.rol;
            }
        }
        return null;
    }
    public get sucursal(): Sucursal {
        if (this._usuario && this._usuario.sucursal) {
            return this._usuario.sucursal;
        } else if (!this._usuario && sessionStorage.getItem('velacuss_usuario')) {
            this._usuario = JSON.parse(sessionStorage.getItem('velacuss_usuario')) as User;
            if (this._usuario && this._usuario.sucursal) {
                return this._usuario.sucursal;
            }
        }
        return null;
    }
    public get archivo(): ArchivoUsuario {
        if (this._usuario && this._usuario.archivo) {
            return this._usuario.archivo;
        } else if (!this._usuario && sessionStorage.getItem('velacuss_usuario')) {
            this._usuario = JSON.parse(sessionStorage.getItem('velacuss_usuario')) as User;
            if (this._usuario && this._usuario.archivo) {
                return this._usuario.archivo;
            }
        }
        return null;
    }
    public get token(): string {
        if (this._token) {
            return this._token;
        } else if (!this._token && sessionStorage.getItem('velacuss_token')) {
            this._token = sessionStorage.getItem('velacuss_token');
            return this._token;
        }
        return null;
    }
    login(usuario: any): Observable<any> {
        const urlEndPoint = environment.apiEndpoint + 'oauth/token';
        const credenciales = btoa('angularapp' + ':' + '12345');

        const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', Authorization : 'Basic ' + credenciales});
        const params = new URLSearchParams();
        params.set('grant_type', 'password');
        params.set('username', usuario.username);
        params.set('password', usuario.password);
        return this.http.post(urlEndPoint, params.toString(), {headers: httpHeaders});
    }
    guardarUsuario(accesToken: string): void {
        const payload = this.obtenerDatosToken(accesToken);
        this._usuario = {
            nombre : null,
            primerApellido : null,
            segundoApellido : null,
            cargo : null,
            rol : null,
            sucursal : null,
            archivo : null
        };
        this._usuario.nombre = payload.nombre;
        this._usuario.primerApellido = payload.primer_apellido;
        this._usuario.segundoApellido = payload.segundo_apellido;
        this._usuario.cargo = payload.cargo;
        this._usuario.rol = payload.rol;
        this._usuario.sucursal = payload.sucursal;
        this._usuario.archivo = payload.archivo;
        sessionStorage.setItem('velacuss_usuario', JSON.stringify(this._usuario));
    }
    obtenerDatosToken(accessToken: string): any {
        if (accessToken) {
            return JSON.parse(decodeURIComponent(escape(atob(accessToken.split('.')[1]))));
        }
        return null;
    }
    guardarToken(accesToken: string): void {
        this._token = accesToken;
        sessionStorage.setItem('velacuss_token', accesToken);
    }
    isAuthenticated(): boolean {
        const payload = this.obtenerDatosToken(this.token);
        if (payload && payload.user_name && payload.user_name.length > 0) {
            return true;
        }
        return false;
    }
    hasRole(role: string): boolean {
        if (this.usuario.rol) {
            if(this.usuario.rol.sigla === role) {
                return true;
            }
        }
        return false;
    }
    logout(): void {
        this._token = null;
        this._usuario = null;
        sessionStorage.removeItem('velacuss_token');
        sessionStorage.removeItem('velacuss_usuario');
    }
}
