import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {PlanCuentaInicio} from '../type/plan-cuenta-inicio.types';
import {PlanCuenta} from '../type/plan-cuenta.types';
import {Linea} from '../../../ingreso/linea/linea.types';
import {PlanCuentaFachada} from '../type/plan-cuenta-fachada.types';


@Injectable({
    providedIn: 'root'
})
export class PlanCuentaService {
    private httpOptions: {};
    private url: string;

    constructor(
        private http: HttpClient,
    ) {
        this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        this.url = environment.apiEndpoint + 'api/planCuenta';
    }

    inicio(): Observable<PlanCuentaInicio>{
        return this.http.get(`${this.url}/inicio`, this.httpOptions).pipe(
            map(response => response as PlanCuentaInicio),
            catchError(e => throwError(e))
        );
    }

    guardar(planCuenta: PlanCuenta): Observable<any>{
        return this.http.post<any>(`${this.url}`, planCuenta, this.httpOptions).pipe(
            catchError(e => throwError(e))
        );
    }

    editar(planCuenta: PlanCuenta): Observable<any>{
        return this.http.put(`${this.url}`, planCuenta, this.httpOptions).pipe(
            catchError(e => throwError(e))
        );
    }

    eliminar(id: number): Observable<any> {
        return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions).pipe(
            catchError(e => throwError(e))
        );
    }

    listar(): Observable<PlanCuentaFachada[]>{
        return this.http.get(`${this.url}/listarPlanCuentaFachada`, this.httpOptions).pipe(
            map(response => response as PlanCuentaFachada[]),
            catchError(e => throwError(e))
        );
    }

}
