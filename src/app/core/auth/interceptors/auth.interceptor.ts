import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from "../auth.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { appSnackWarm } from 'app/core/snack/app.snack';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService, 
    private router: Router,
    private _snackBar: MatSnackBar) {}
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(e => {
        if (e.status === 401) {
          if (this.authService.isAuthenticated()) {
            this._snackBar.open(`El usuario no autenticado!`, 'Acceso Denegado', appSnackWarm);
            this.authService.logout();
          }
          this.router.navigate(['/sign-in']);
        }
        if (e.status === 403) {
          this._snackBar.open(`El usuario: ${this.authService.usuario.nombre} ${this.authService.usuario.primerApellido} no tienes acceso a este recurso!`, 'Acceso Denegado', appSnackWarm);
          this.router.navigate(['/sign-in']);
        }
        return throwError(e);
      })
    );
  }
}
