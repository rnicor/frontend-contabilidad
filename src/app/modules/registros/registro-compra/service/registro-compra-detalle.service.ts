import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {RegistroCompraDetalle} from '../type/registro-compra-detalle.types';



@Injectable({
  providedIn: 'root'
})
export class RegistroCompraDetalleService {

    private httpOptions: {};
    private url: string;

    constructor(
        private http: HttpClient
    ) {
        this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        this.url = environment.apiEndpoint + 'api/registro-compra-detalle';
    }

    guardar(registroCompraId: number, registroCompraDetalle: RegistroCompraDetalle): Observable<RegistroCompraDetalle> {
        console.log(registroCompraId);
        return this.http.post<any>(`${this.url}/${registroCompraId}`, registroCompraDetalle, this.httpOptions).pipe(
            map(response => response as RegistroCompraDetalle),
            catchError(error => throwError(error))
        );
    }

    obtener(registroCompraId: number): Observable<RegistroCompraDetalle> {
        return this.http.get<any>(`${this.url}/${registroCompraId}`, this.httpOptions).pipe(
            map(response => response as RegistroCompraDetalle),
            catchError(error => throwError(error))
        );
    }

    editar(registroCompraDetalle: RegistroCompraDetalle): Observable<RegistroCompraDetalle> {
        return this.http.put(`${this.url}`, registroCompraDetalle, this.httpOptions).pipe(
            map(response => response as RegistroCompraDetalle),
            catchError(error => throwError(error))
        );
    }

    eliminar(id: number): Observable<any> {
        return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions).pipe(
            map(response => response as RegistroCompraDetalle),
            catchError(e => throwError(e))
        );
    }
}
