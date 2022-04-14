import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {environment} from '../../../../../environments/environment';
import {DatosFacturaCompra} from '../type/datos-factura-compra';


@Injectable({
    providedIn: 'root'
})
export class ImportacionLibroComprasService {

    private httpOptions: {};
    private url: string;

    constructor(
        private http: HttpClient,
    ) {
        this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        this.url = environment.apiEndpoint + 'api/libroCompra';
    }

    guardar(registroCompraFormatoExcel: DatosFacturaCompra[]): Observable<void> {
        return this.http.post<any>(`${this.url}`, registroCompraFormatoExcel, this.httpOptions).pipe(
            catchError(e => throwError(e))
        );
    }

}
