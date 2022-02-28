import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'app/core/auth/auth.service';
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports  : [
        HttpClientModule,
        MatSnackBarModule
    ],
    providers: [
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
})
export class AuthModule
{
}
