import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {LibroMayorInicio} from '../type/libro-mayor-inicio.types';
import {ReqLibroMayor} from '../type/req-libro-mayor.types';
import {RepLibroMayor} from '../type/rep-libro-mayor.types';

@Injectable({
  providedIn: 'root'
})
export class LibroMayorService {

    // eslint-disable-next-line @typescript-eslint/ban-types
    private httpOptions: {};
    private url: string;

    constructor(
        private http: HttpClient
    ) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        this.url = environment.apiEndpoint + 'api/libro-mayor';
    }

    inicio(): Observable<LibroMayorInicio> {
        return this.http.get(`${this.url}/inicio`, this.httpOptions).pipe(
            map(response => response as LibroMayorInicio),
            catchError(e => throwError(e))
        );
    }

    obtenerLibroMayorPorCodigoPorFecha(reqLibroMayor: ReqLibroMayor): Observable<RepLibroMayor> {
        return this.http.post(`${this.url}/fecha`, reqLibroMayor, this.httpOptions).pipe(
            map(response => response as RepLibroMayor),
            catchError(e => throwError(e))
        );
    }

   /* reporteLibroDiarioPdf(reqLibroDiario: ReqLibroDiario): Observable<any> {
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
    }*/
}
