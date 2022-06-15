import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {TipoComprobante} from '../type/tipo-comprobante.types';
import {environment} from '../../../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class TipoComprobanteService{

    private httpOptions: {};
    private url: string;
    constructor(
        private http: HttpClient,
    ) {
        this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        this.url = environment.apiEndpoint + 'api/tipo-comprobante';
    }

    listar(): Observable<TipoComprobante[]> {
        return this.http.get(`${this.url}/listar`, this.httpOptions).pipe(
            map(response => response as TipoComprobante[]),
            catchError(e => throwError(e))
        );
    }

    guardar(tipoComprobante: TipoComprobante): Observable<TipoComprobante> {
        return this.http.post<any>(`${this.url}`, tipoComprobante, this.httpOptions).pipe(
            map(response => response as TipoComprobante),
            catchError(e => throwError(e))
        );
    }


    obtener(id: number): Observable<TipoComprobante> {
        return this.http.get(`${this.url}/${id}`, this.httpOptions).pipe(
            map(response => response as TipoComprobante),
            catchError(e => throwError(e))
        );
    }

    editar(tipoComprobante: TipoComprobante): Observable<TipoComprobante> {
        return this.http.put(`${this.url}`, tipoComprobante, this.httpOptions).pipe(
            map(response => response as TipoComprobante),
            catchError(e => throwError(e))
        );
    }

    eliminar(id: number): Observable<any> {
        return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions).pipe(
            catchError(e => throwError(e))
        );
    }
}
