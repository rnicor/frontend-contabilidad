import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {Linea} from './linea.types';

@Injectable({
    providedIn: 'root'
})
export class LineaService
{
    private httpOptions: {};
    private url: string;
    constructor(
        private http: HttpClient,
    ) {
        this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        this.url = environment.apiEndpoint + 'api/linea';
    }

    listar(): Observable<Linea[]> {
        return this.http.get(`${this.url}/listar`, this.httpOptions).pipe(
            map(response => response as Linea[]),
            catchError(e => throwError(e))
        );
    }

    guardar(categoria: Linea): Observable<any> {
        return this.http.post<any>(`${this.url}`, categoria, this.httpOptions).pipe(
            catchError(e => throwError(e))
        );
    }

    obtener(id: number): Observable<Linea> {
        return this.http.get(`${this.url}/${id}`, this.httpOptions).pipe(
            map(response => response as Linea),
            catchError(e => throwError(e))
        );
    }

    editar(categoria: Linea): Observable<any> {
        return this.http.put(`${this.url}`, categoria, this.httpOptions).pipe(
            catchError(e => throwError(e))
        );
    }

    eliminar(id: number): Observable<any> {
        return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions).pipe(
            catchError(e => throwError(e))
        );
    }

    reportePDF(): Observable<any> {
        return this.http.get(`${this.url}/pdf`, {responseType: 'blob', headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(
            catchError((response: HttpErrorResponse) => !!this.isBlobError(response) ? this.parseErrorBlob(response) : throwError(response))
        );
    }

    reporteEXCEL(): Observable<any> {
        return this.http.get(`${this.url}/excel`, {responseType: 'blob', headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(
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
