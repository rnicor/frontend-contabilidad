import { ArchivoUsuario } from './../../../modules/admin/usuario/type/usuario.types';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/core/user/user.types';
import {AuthService} from '../../../core/auth/auth.service';
import {Rol} from '../../../core/user/rol.types';

@Component({
    selector       : 'user',
    templateUrl    : './user.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'user'
})
export class UserComponent implements OnInit {

    user: User;
    rol: Rol;

    constructor(
        private _router: Router,
        public _authService: AuthService
    ) {}

    ngOnInit(): void {
        this.user = this._authService.usuario;
        this.rol = this._authService.rol;
    }

    signOut(): void {
        this._router.navigate(['/sign-out']);
    }
}
