import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {RegistroVentaDetalle} from '../type/registro-venta-detalle.types';

@Injectable({
  providedIn: 'root'
})
export class RegistroVentaDetalleService {

    private httpOptions: {};
    private url: string;

    constructor(
        private http: HttpClient
    ) {
        this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        this.url = environment.apiEndpoint + 'api/registro-venta-detalle';
    }

    guardar(registroVentaId: number, registroVentaDetalle: RegistroVentaDetalle): Observable<RegistroVentaDetalle> {
        return this.http.post<any>(`${this.url}/${registroVentaId}`, registroVentaDetalle, this.httpOptions).pipe(
            map(response => response as RegistroVentaDetalle),
            catchError(error => throwError(error))
        );
    }

    guardarExcel(registroVentaId: number, registroVentaDetalleExcel: RegistroVentaDetalle[]): Observable<void> {
        return this.http.post<any>(`${this.url}/list/${registroVentaId}`, registroVentaDetalleExcel, this.httpOptions).pipe(
            catchError(e => throwError(e))
        );
    }

    obtener(registroVentaId: number): Observable<RegistroVentaDetalle> {
        return this.http.get<any>(`${this.url}/${registroVentaId}`, this.httpOptions).pipe(
            map(response => response as RegistroVentaDetalle),
            catchError(error => throwError(error))
        );
    }

    editar(registroVentaDetalle: RegistroVentaDetalle): Observable<RegistroVentaDetalle> {
        return this.http.put(`${this.url}`, registroVentaDetalle, this.httpOptions).pipe(
            map(response => response as RegistroVentaDetalle),
            catchError(error => throwError(error))
        );
    }

    eliminar(id: number): Observable<any> {
        return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions).pipe(
            map(response => response as RegistroVentaDetalle),
            catchError(e => throwError(e))
        );
    }
}
