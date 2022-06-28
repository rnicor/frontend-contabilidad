import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {LibriDiarioInicio} from '../type/libro-diario-inicio.types';
import {RepLibroDiario} from '../type/rep-libro-diario.types';
import {ReqLibroDiario} from '../type/req-libro-diario.types';

@Injectable({
  providedIn: 'root'
})
export class LibroDiarioService {

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

    obtenerReporteLibroDiarioPorMes(reqLibroDiario: ReqLibroDiario): Observable<RepLibroDiario> {
        return this.http.post(`${this.url}/mes`, reqLibroDiario, this.httpOptions).pipe(
            map(response => response as RepLibroDiario),
            catchError(e => throwError(e))
        );
    }

    obtenerReporteLibroDiarioPorFecha(reqLibroDiario: ReqLibroDiario): Observable<RepLibroDiario> {
        return this.http.post(`${this.url}/fecha`, reqLibroDiario, this.httpOptions).pipe(
            map(response => response as RepLibroDiario),
            catchError(e => throwError(e))
        );
    }

    reporteLibroDiarioPdf(reqLibroDiario: ReqLibroDiario): Observable<any> {
        return this.http.post(`${this.url}/pdf`, reqLibroDiario, {
            responseType: 'blob',
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }).pipe(
            catchError((response: HttpErrorResponse) => !!this.isBlobError(response) ? this.parseErrorBlob(response) : throwError(response))
        );
    }

    reporteLibroDiarioExcel(reqLibroDiario: ReqLibroDiario): Observable<any> {
        return this.http.post(`${this.url}/excel`, reqLibroDiario, {
            responseType: 'blob',
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }).pipe(
            catchError((response: HttpErrorResponse) => !!this.isBlobError(response) ? this.parseErrorBlob(response) : throwError(response))
        );
    }

    isBlobError(err: any): any {
        return err instanceof HttpErrorResponse && err.error instanceof Blob && err.error.type === 'application/json';
    }
    parseErrorBlob(err: HttpErrorResponse): Observable<any> {
        const reader: FileReader = new FileReader();
        const obs = new Observable((observer: any) => {
            reader.onloadend = (e) => {
                observer.error(new HttpErrorResponse({
                    ...err,
                    error: JSON.parse(reader.result as string),
                }));
                observer.complete();
            };
        });
        reader.readAsText(err.error);
        return obs;
    }
}
