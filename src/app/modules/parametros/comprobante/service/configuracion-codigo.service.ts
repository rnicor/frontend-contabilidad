import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {ConfiguracionCodigo} from '../type/configuracion-codigo.types';
import {catchError, map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class ConfiguracionCodigoService {
    private httpOptions: {};
    private url: string;

    constructor(
        private http: HttpClient
    ) {
        this.httpOptions = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};
        this.url = environment.apiEndpoint + 'api/configuracion-codigo';
    }

    inicio(): Observable<ConfiguracionCodigo[]>{
        return this.http.get(`${this.url}/inicio`, this.httpOptions).pipe(
            map(response => response as ConfiguracionCodigo[]),
            catchError(e => throwError(e))
        );
    }

    guardarConfiguracionCodigo(configuracionCodigo: ConfiguracionCodigo[]): Observable<string>{
        return this.http.post<any>(`${this.url}/lista`, configuracionCodigo, this.httpOptions).pipe(
            map(response => response as string),
        );
    }

}
