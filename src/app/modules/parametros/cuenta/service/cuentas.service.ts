import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {CuentaInicio} from '../type/cuenta-inicio.types';
import {Cuenta} from '../type/cuenta.types';


@Injectable({
    providedIn: 'root'
})
export class CuentaService {
    private httpOptions: {};
    private url: string;

    constructor(
        private http: HttpClient,
    ) {
        this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        this.url = environment.apiEndpoint + 'api/cuenta';
    }

    inicio(): Observable<CuentaInicio>{
        return this.http.get(`${this.url}/inicio`, this.httpOptions).pipe(
            map(response => response as CuentaInicio),
            catchError(e => throwError(e))
        );
    }

    guardar(cuenta: Cuenta): Observable<Cuenta>{
        return this.http.post<any>(`${this.url}`, cuenta, this.httpOptions).pipe(
            map(response => response as Cuenta),
            catchError(e => throwError(e))
        );
    }

    editar(cuenta: Cuenta): Observable<Cuenta>{
        return this.http.put(`${this.url}`, cuenta, this.httpOptions).pipe(
            map(response => response as Cuenta),
            catchError(e => throwError(e))
        );
    }

    eliminar(id: number): Observable<any> {
        return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions).pipe(
            catchError(e => throwError(e))
        );
    }

    listar(): Observable<Cuenta[]>{
        return this.http.get(`${this.url}/listar`, this.httpOptions).pipe(
            map(response => response as Cuenta[]),
            catchError(e => throwError(e))
        );
    }
}
