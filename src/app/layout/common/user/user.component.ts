import { ArchivoUsuario } from './../../../modules/admin/usuario/type/usuario.types';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/core/user/user.types';
import {AuthService} from '../../../core/auth/auth.service';
import {Rol} from '../../../core/user/rol.types';
import {Gestion} from '../../../core/user/gestion.types';

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
    gestion: Gestion;
    gestions:string;

    //variable que enumera las gestiones
    gestionCount: number = 0;

    constructor(
        private _router: Router,
        public _authService: AuthService
    ) {}

    ngOnInit(): void {
        this.user = this._authService.usuario;
        this.rol = this._authService.rol;
        this.gestions = this._authService.gestions;
        console.log(this.gestions);
        console.log(this._authService.gestions);
        //this.gestionCount=Object.keys(this.gestion).length;
        this.gestionCount=Object.keys(this.gestions).length;
        console.log(this.gestionCount);

    }

    signOut(): void {
        this._router.navigate(['/sign-out']);
    }
    irgestion(): void {
//        this._router.navigate(['/empresa/gestion']);
           this._router.navigate(['/example']);
    }
}
