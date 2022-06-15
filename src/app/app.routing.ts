import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

export const appRoutes: Route[] = [

    {path: '', pathMatch : 'full', redirectTo: 'example'},
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'example'},
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
        ]
    },
    {
        path: '',
        canActivate: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
        ]
    },
    {
        path: '',
        component  : LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
        ]
    },
    {
        path       : '',
        canActivate: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},
        ]
    },
    {
        path       : 'registros',
        canActivate: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'ventas', loadChildren: () => import('app/modules/registros/registro-venta/registro-venta.module').then(m => m.RegistroVentaModule)},
            {path: 'compras', loadChildren: () => import('app/modules/registros/registro-compra/registro-compra.module').then(m => m.RegistroCompraModule)},
            {path: 'comprobantes', loadChildren: () => import('app/modules/registros/registro-comprobante/registro-comprobante.module').then(m => m.RegistroComprobanteModule)},
        ]
    },
    {
        path       : 'parametros',
        canActivate: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },

        children   : [
            {path: 'tipo-comprobante', loadChildren: () => import('app/modules/parametros/tipo-comprobante/tipo-comprobante.module').then(m => m.TipoComprobanteModule)},
            {path: 'cuenta', loadChildren: () => import('app/modules/parametros/cuenta/cuentas.module').then(m => m.CuentasModule)},
            {path: 'configuracion-codigo-fijo-contable', loadChildren: () => import('app/modules/parametros/configuracion-codigo-fijo-contable/configuracion-codigo-fijo-contable.module').then(m => m.ConfiguracionCodigoFijoContableModule)},
        ]
    },
    {
        path       : 'tipo-cambio',
        canActivate: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },

        children   : [
            {path: 'ufv', loadChildren: () => import('app/modules/tipo-cambio/ufv/ufv.module').then(m => m.UfvModule)},
            {path: 'dolar', loadChildren: () => import('app/modules/tipo-cambio/dolar/dolar.module').then(m => m.DolarModule)},

        ]
    },
    {
        path:'empresa',
        canActivate: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'gestion', loadChildren: () => import('app/modules/parametros/gestion/gestion.module').then(m => m.GestionModule)},
        ]
    }
];
