import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { SERVER } from '../../config/server.config';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { WebService } from 'src/app/services/web.service';
// import {environment} from '../../../../environments/environment';
import { Sucursal } from './sucursal.types';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SucursalService
{
    // private httpOptions: {};
    // private url: string;
    constructor(
      private webService: WebService,
      private httpClient: HttpClient,
      private authorization: AuthorizationService,
      private _snackBar: MatSnackBar,
    ) {
        // this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        // this.url = environment.apiEndpoint + 'api/linea';
    }
    listar(req?: any){
      return this.webService.get((`${SERVER.SUCURSAL}/listar`),
      this.webService.getAuthHeaders(this.authorization.getToken()));
    }
    adicionar(sucursal: Sucursal){
      return this.webService.post((`${SERVER.SUCURSAL}`), sucursal,
      this.webService.getAuthHeaders(this.authorization.getToken()));
    }
    editar(sucursal: Sucursal, id: number) {
      const body = JSON.stringify(sucursal);
      return this.webService.put(`${SERVER.SUCURSAL}/${id}`, body, this.webService.getAuthHeaders(this.authorization.getToken()));
    }
    delete(req?: any){
      return this.webService.delete((`${SERVER.SUCURSAL}/${req.id}`), this.webService.getAuthHeaders(this.authorization.getToken()));
     }
     error(mensaje: string) {
      this._snackBar.open(mensaje, '',{
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
      )
     }
     exito(mensaje: string) {
      this._snackBar.open( mensaje, '',{
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
      )
     }
}
