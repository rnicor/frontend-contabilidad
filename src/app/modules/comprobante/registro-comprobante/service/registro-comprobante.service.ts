import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {InicioDatosFacturaCom} from '../model/inicio-datos-factura-com.model';
import {DatosFacturaCompra} from '../model/datos-factura-compra.model';


@Injectable({
    providedIn: 'root'
})
export class RegistroComprobanteService {
    private httpOptions: {};
    private url: string;

    constructor(
        private http: HttpClient,
    ) {
        this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        this.url = environment.apiEndpoint + 'api/registro-comprobante';
    }

    obtenerDatosIniciales(): Observable<InicioDatosFacturaCom>{
        return this.http.get(`${this.url}/inicio`, this.httpOptions).pipe(
            map(response => response as InicioDatosFacturaCom),
            catchError(e => throwError(e))
        );
    }
    guardar(datos: DatosFacturaCompra): Observable<any> {
        console.log('datos', datos);
        return this.http.post<any>(`${this.url}/guardar`, datos, this.httpOptions).pipe(
            catchError(e => throwError(e))
        );
    }
    editar(datos: DatosFacturaCompra): Observable<any> {
        return this.http.post<any>(`${this.url}/editar`, datos, this.httpOptions).pipe(
            catchError(e => throwError(e))
        );
    }
    eliminar(id: number): Observable<any> {
        return this.http.delete<any>(`${this.url}/eliminar/${id}`, this.httpOptions).pipe(
            catchError(e => throwError(e))
        );
    }
}
