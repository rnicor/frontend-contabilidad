import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {RegistroVentaInicio} from '../type/registro-venta-inicio.types';
import {RegistroVenta} from '../type/registro-venta.types';


@Injectable({
  providedIn: 'root'
})
export class RegistroVentaService {

    private httpOptions: {};
    private url: string;

    constructor(
        private http: HttpClient
    ) {
        this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        this.url = environment.apiEndpoint + 'api/registro-venta';
    }

    inicio(): Observable<RegistroVentaInicio> {
        return this.http.get(`${this.url}/inicio`, this.httpOptions).pipe(
            map(response => response as RegistroVentaInicio),
            catchError(e => throwError(e))
        );
    }

    obtenerVenta(gestionId: number, periodo: string): Observable<RegistroVenta>{
        return this.http.get(`${this.url}/busqueda/${gestionId}/${periodo}`, this.httpOptions).pipe(
            map(response => response as RegistroVenta),
            catchError(e => throwError(e))
        );
    }

    guardar(registroVenta: RegistroVenta): Observable<RegistroVenta> {
        return this.http.post<any>(`${this.url}`, registroVenta, this.httpOptions).pipe(
            map(response => response as RegistroVenta),
            catchError(error => throwError(error))
        );
    }

    obtener(registroVentaId: number): Observable<RegistroVenta> {
        return this.http.get<any>(`${this.url}/${registroVentaId}`, this.httpOptions).pipe(
            map(response => response as RegistroVenta),
            catchError(error => throwError(error))
        );
    }

    editar(registroVenta: RegistroVenta): Observable<RegistroVenta> {
        return this.http.put(`${this.url}`, registroVenta, this.httpOptions).pipe(
            map(response => response as RegistroVenta),
            catchError(error => throwError(error))
        );
    }

    eliminar(id: number): Observable<any> {
        return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions).pipe(
            map(response => response as RegistroVenta),
            catchError(e => throwError(e))
        );
    }
}
