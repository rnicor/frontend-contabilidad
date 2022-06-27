import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {RegistroTipoInicio} from '../type/registro-tipo-inicio.types';
import {RegistroTipos} from '../type/registro-tipos.types';
import {RegistroTipo} from '../type/registro-tipo.types';

@Injectable({
  providedIn: 'root'
})
export class RegistroTipoService {

    private httpOptions: {};
    private url: string;

    constructor(
        private http: HttpClient
    ) {
        this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        this.url = environment.apiEndpoint + 'api/registro-tipo';
    }

    inicio(): Observable<RegistroTipoInicio> {
        return this.http.get(`${this.url}/inicio`, this.httpOptions).pipe(
            map(response => response as RegistroTipoInicio),
            catchError(e => throwError(e))
        );
    }

    listar(): Observable<RegistroTipos[]> {
        return this.http.get(`${this.url}/listar`, this.httpOptions).pipe(
            map(response => response as RegistroTipos[]),
            catchError(error => throwError(error))
        );
    }

    guardar(comprobante: RegistroTipo): Observable<RegistroTipo> {
        return this.http.post<any>(`${this.url}`, comprobante, this.httpOptions).pipe(
            map(response => response as RegistroTipo),
            catchError(error => throwError(error))
        );
    }

    obtener(id: number): Observable<RegistroTipo> {
        return this.http.get<any>(`${this.url}/${id}`, this.httpOptions).pipe(
            map(response => response as RegistroTipo),
            catchError(error => throwError(error))
        );
    }

    modificar(comprobante: RegistroTipo): Observable<RegistroTipo> {
        return this.http.put(`${this.url}`, comprobante, this.httpOptions).pipe(
            map(response => response as RegistroTipo),
            catchError(error => throwError(error))
        );
    }

    eliminar(id: number): Observable<any> {
        return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions).pipe(
            catchError(e => throwError(e))
        );
    }
}
