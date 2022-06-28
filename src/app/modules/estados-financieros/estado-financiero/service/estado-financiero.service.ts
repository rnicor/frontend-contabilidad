import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {LibroDiario} from '../type/libro-diario.types';
import {MesTipo} from '../type/mes_tipo.types';

import {EstadoFinancieroInicio} from '../type/estado-financiero-inicio.types';

@Injectable({
  providedIn: 'root'
})
export class EstadoFinacieroService {

    private httpOptions: {};
    private url: string;

    constructor(
        private http: HttpClient
    ) {
        this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        this.url = environment.apiEndpoint + 'api/libro-diario';
    }

    inicio(): Observable<EstadoFinancieroInicio> {
        return this.http.get(`${this.url}/inicio`, this.httpOptions).pipe(
            map(response => response as EstadoFinancieroInicio),
            catchError(e => throwError(e))
        );
    }



    buscar(mesTipo: MesTipo): Observable<void> {

        console.log('datos =>>',mesTipo);
       // http://localhost:8081/api/libro-diario/mes

      // return this.http.post<any>(`${this.url}`, registroUfvExcel, this.httpOptions).pipe(
        return this.http.post<any>(`${this.url}/mes`, mesTipo, this.httpOptions).pipe(
            catchError(e => throwError(e))
        );
    }

   
}
