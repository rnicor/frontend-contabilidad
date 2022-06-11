import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {RegistroCompraInicio} from '../type/registro-compra-inicio.types';
import {RegistroCompra} from '../type/registro-compra.types';


@Injectable({
  providedIn: 'root'
})
export class RegistroCompraService {

    private httpOptions: {};
    private url: string;

    constructor(
        private http: HttpClient
    ) {
        this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        this.url = environment.apiEndpoint + 'api/registro-compra';
    }

    inicio(): Observable<RegistroCompraInicio> {
        return this.http.get(`${this.url}/inicio`, this.httpOptions).pipe(
            map(response => response as RegistroCompraInicio),
            catchError(e => throwError(e))
        );
    }

    obtenerCompra(gestionId: number, periodo: string): Observable<RegistroCompra>{
        return this.http.get(`${this.url}/busqueda/${gestionId}/${periodo}`, this.httpOptions).pipe(
            map(response => response as RegistroCompra),
            catchError(e => throwError(e))
        );
    }

    guardar(registroCompra: RegistroCompra): Observable<RegistroCompra> {
        return this.http.post<any>(`${this.url}`, registroCompra, this.httpOptions).pipe(
            map(response => response as RegistroCompra),
            catchError(error => throwError(error))
        );
    }

    obtener(registroCompraId: number): Observable<RegistroCompra> {
        return this.http.get<any>(`${this.url}/${registroCompraId}`, this.httpOptions).pipe(
            map(response => response as RegistroCompra),
            catchError(error => throwError(error))
        );
    }

    editar(registroCompra: RegistroCompra): Observable<RegistroCompra> {
        return this.http.put(`${this.url}`, registroCompra, this.httpOptions).pipe(
            map(response => response as RegistroCompra),
            catchError(error => throwError(error))
        );
    }

    eliminar(id: number): Observable<any> {
        return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions).pipe(
            map(response => response as RegistroCompra),
            catchError(e => throwError(e))
        );
    }
}
