import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {RegistroComprobante} from '../type/registro-comprobante.types';
import {RegistroComprobanteInicio} from '../type/registro-comprobante-inicio.types';
import {Gestion} from '../../../parametros/gestion/gestion.types';

@Injectable({
  providedIn: 'root'
})
export class RegistroComprobanteService {

    private httpOptions: {};
    private url: string;

    constructor(
        private http: HttpClient
    ) {
        this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        this.url = environment.apiEndpoint + 'api/registro-comprobante';
    }

    inicio(): Observable<RegistroComprobanteInicio> {
        return this.http.get(`${this.url}/inicio`, this.httpOptions).pipe(
            map(response => response as RegistroComprobanteInicio),
            catchError(e => throwError(e))
        );
    }

    guardar(comprobante: RegistroComprobante): Observable<RegistroComprobante> {
        return this.http.post<any>(`${this.url}`, comprobante, this.httpOptions).pipe(
            map(response => response as RegistroComprobante),
            catchError(error => throwError(error))
        );
    }

    obtener(id: number): Observable<RegistroComprobante> {
        return this.http.get<any>(`${this.url}/${id}`, this.httpOptions).pipe(
            map(response => response as RegistroComprobante),
            catchError(error => throwError(error))
        );
    }

    listar(): Observable<RegistroComprobante[]> {
        //console.log('lista');
        return this.http.get(`${this.url}/listar`, this.httpOptions).pipe(
            map(response => response as RegistroComprobante[]),
            catchError(e => throwError(e))
        );
    }


    modificar(comprobante: RegistroComprobante): Observable<RegistroComprobante> {
        return this.http.put(`${this.url}`, comprobante, this.httpOptions).pipe(
            map(response => response as RegistroComprobante),
            catchError(error => throwError(error))
        );
    }

    eliminar(id: number): Observable<any> {
        return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions).pipe(
            map(response => response as RegistroComprobante),
            catchError(e => throwError(e))
        );
    }
}
