import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {LibriDiarioInicio} from '../../../libros/libro-diario/type/libro-diario-inicio.types';
import {ReqLibroDiario} from '../../../libros/libro-diario/type/req-libro-diario.types';
import {RepLibroDiario} from '../../../libros/libro-diario/type/rep-libro-diario.types';

@Injectable({
  providedIn: 'root'
})
export class ComprobantesService {

    private httpOptions: {};
    private url: string;

    constructor(
        private http: HttpClient
    ) {
        this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        this.url = environment.apiEndpoint + 'api/libro-diario';
    }

    inicio(): Observable<LibriDiarioInicio> {
        return this.http.get(`${this.url}/inicio`, this.httpOptions).pipe(
            map(response => response as LibriDiarioInicio),
            catchError(e => throwError(e))
        );
    }

    obtenerReporteLibroDiarioPoComprobante(reqLibroDiario: ReqLibroDiario): Observable<RepLibroDiario> {
        return this.http.post(`${this.url}/comprobante`, reqLibroDiario, this.httpOptions).pipe(
            map(response => response as RepLibroDiario),
            catchError(e => throwError(e))
        );
    }
}
