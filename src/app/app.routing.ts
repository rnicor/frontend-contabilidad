import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'example'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'example'},

    // Auth routes for guests
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

    // Auth routes for authenticated users
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

    // Landing routes
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

    // Admin routes
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
    // Items routes
    {
        path       : 'ingreso',
        canActivate: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'linea', loadChildren: () => import('app/modules/ingreso/linea/linea.module').then(m => m.LineaModule)},
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
        ]
    },
    {
        path       : 'comprobante',
        canActivate: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },

        children   : [
            {path: 'registro-comprobante', loadChildren: () => import('app/modules/comprobante/registro-comprobante/registro-comprobante.module').then(m => m.RegistroComprobanteModule)},
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
            {path: 'plan-cuentas', loadChildren: () => import('app/modules/parametros/plan-cuentas/plan-cuentas.module').then(m => m.PlanCuentasModule)},
            {path: 'configuracion-codigo-fijo-contable', loadChildren: () => import('app/modules/parametros/configuracion-codigo-fijo-contable/configuracion-codigo-fijo-contable.module').then(m => m.ConfiguracionCodigoFijoContableModule)},
        ]
    },
        // tipo de cambio routes
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
           // {path: 'gestion', loadChildren: () => import('app/modules/contabilidad/gestion/gestion.module').then(m => m.GestionModule)},
        ]
    }
];
