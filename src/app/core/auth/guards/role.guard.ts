import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/sign-in']);
      return false;
    }
    const role = next.data['role'] as string;
    if (this.authService.hasRole(role)) {
      return true;
    }
/*    Swal.fire(
      'Acceso Denegado',
      `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`,
      'warning'
    );*/
    return false;
  }
}
