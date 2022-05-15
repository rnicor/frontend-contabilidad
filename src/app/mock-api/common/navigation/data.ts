import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [];

export const adminNavigation: FuseNavigationItem[] = [
    {
        id      : 'apps',
        title   : 'Compras',
        subtitle: 'Módulo de compras',
        type    : 'group',
        children: [
            {
                id   : 'apps.linea',
                title: 'Linea',
                type    : 'basic',
                icon    : 'heroicons_outline:share',
                link : '/ingreso/linea'
            }
        ]
    },
    {
        id      : 'apps.ventas',
        title   : 'Ventas',
        type    : 'group',
        children: [
            {
                id   : 'apps.registros.venta.simple',
                title: 'Registro de ventas',
                type    : 'basic',
                icon    : 'heroicons_outline:document-text',
                link : '/registros/ventas/simple'
            },
            {
                id   : 'apps.registros.venta.masivo',
                title: 'Registro masivo',
                type    : 'basic',
                icon    : 'heroicons_outline:document-text',
                link : '/registros/ventas/masivo'
            },
        ]
    },
    {
        id      : 'apps.compras',
        title   : 'Compras',
        type    : 'group',
        children: [
            {
                id   : 'apps.registros.compra.simple',
                title: 'Registro de compras',
                type    : 'basic',
                icon    : 'heroicons_outline:shopping-cart',
                link : '/registros-compra/simple'
            },
            {
                id   : 'apps.registros.compra.masivo',
                title: 'Registro masivo',
                type    : 'basic',
                icon    : 'heroicons_outline:shopping-cart',
                link : '/registros-compra/masivo'
            },
        ]
    },
    {
        id      : 'apps',
        title   : 'Registro de comprobantes',
        subtitle: 'Registro de comprobantes contables',
        type    : 'group',
        children: [
            {
                id   : 'apps.comprobantes',
                title: 'Registro de comprobantes contables',
                type    : 'basic',
                icon    : 'heroicons_outline:clipboard-check',
                link : '/comprobante/registro-comprobante'
            }
        ]
    },
    {
        id      : 'apps',
        title   : 'Parametros',
        subtitle: 'Módulo de parametricas',
        type    : 'group',
        icon    : 'heroicons_outline:archive',
        children: [
            {
                id   : 'apps.parametros.configuracion-codigo-fijo-contable',
                title: 'Código fijo contable',
                type : 'basic',
                icon: 'heroicons_outline:document-text',
                link : '/parametros/configuracion-codigo-fijo-contable'
            },
            {
                id   : 'apps.parametros.tipo-comprobante',
                title: 'Tipo comprobante',
                type : 'basic',
                icon: 'heroicons_outline:document-text',
                link : '/parametros/tipo-comprobante'
            },
            {
                id   : 'apps.parametros.plan-cuentas',
                title: 'Plan cuentas',
                type : 'basic',
                icon: 'heroicons_outline:document-text',
                link : '/parametros/plan-cuentas'
            }
        ]
    },
    {
        id      : 'apps',
        title   : 'tipo cambio',
        subtitle: 'Módulo Tipo De cambios',
        type    : 'group',
        icon    : 'heroicons_outline:archive',
        children: [
            {
                id   : 'apps.tipo-cambio.ufv',
                title: 'Ufv',
                type : 'basic',
                icon: 'heroicons_outline:document-text',
                link : '/tipo-cambio/ufv'
            },
            {
                id   : 'apps.tipo-cambio.dolar',
                title: 'Dolares',
                type : 'basic',
                icon: 'heroicons_outline:document-text',
                link : '/tipo-cambio/dolar'
            }
        ]
    },
    {
        id      : 'apps',
        title   : 'Gestion',
        subtitle: 'Gestiones registradas',
        type    : 'group',
        icon    : 'heroicons_outline:archive',
        children: [
            {
                id   : 'apps.parametros.gestion',
                title: 'Gestiones',
                type : 'basic',
                icon: 'heroicons_outline:document-text',
                link : '/empresa/gestion'
            }
        ]
    }
];
export const encargadoNavigation: FuseNavigationItem[] = [];
export const vendedorNavigation: FuseNavigationItem[] = [];
export const almacenNavigation: FuseNavigationItem[] = [];

export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
