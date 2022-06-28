import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [];

export const adminNavigation: FuseNavigationItem[] = [
    {
        id      : 'apps.ventas',
        title   : 'Ventas',
        type    : 'group',
        children: [
            {
                id   : 'apps.registros.venta.simple',
                title: 'Registro de ventas',
                type    : 'basic',
                icon    : 'heroicons_outline:shopping-cart',
                link : '/registros/ventas/simple'
            },
            {
                id   : 'apps.registros.venta.masivo',
                title: 'Registro masivo',
                type    : 'basic',
                icon    : 'heroicons_outline:shopping-cart',
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
                link : '/registros/compras/simple'
            },
            {
                id   : 'apps.registros.compra.masivo',
                title: 'Registro masivo',
                type    : 'basic',
                icon    : 'heroicons_outline:shopping-cart',
                link : '/registros/compras/masivo'
            }
        ]
    },
    {
        id      : 'apps.comprobantes',
        title   : 'Comprobantes',
        type    : 'group',
        children: [
            {
                id   : 'apps.registros.tipo',
                title: 'Registros tipo',
                type    : 'basic',
                icon    : 'heroicons_outline:clipboard-check',
                link : '/registros/tipo'
            },
            {
                id   : 'apps.registros.comprobantes',
                title: 'Registro de comprobantes',
                type    : 'basic',
                icon    : 'heroicons_outline:clipboard-check',
                link : '/registros/comprobantes'
            },
            {
                id   : 'apps.comprobantes',
                title: 'Comprobantes',
                type    : 'basic',
                icon    : 'heroicons_outline:clipboard-check',
                link : '/comprobantes'
            }
        ]
    },
    {
        id      : 'apps.libros',
        title   : 'Libros',
        type    : 'group',
        children: [
            {
                id   : 'apps.libros.libro-diario',
                title: 'Libro Diario',
                type    : 'basic',
                icon    : 'heroicons_outline:clipboard-check',
                link : '/libros/libro-diario'
            },
            
            {
                id   : 'apps.libros.libro-mayor',
                title: 'Registro de libro Mayor',
                type    : 'basic',
                icon    : 'heroicons_outline:clipboard-check',
                link : '/libros/libro-mayor'
            },
            {
                id   : 'apps.libros.libro-mayor',
                title: 'Libro Mayor',
                type    : 'basic',
                icon    : 'heroicons_outline:clipboard-check',
                link : '/libros/libro-mayor'
            }
        ]
    },


    {
        id      : 'apps.estados-financieros',
        title   : 'Estados Finacieros',
        type    : 'group',
        children: [
            {
                id   : 'apps.estado-financieros.estado-financiero',
                title: 'estados finacieros',
                type    : 'basic',
                icon    : 'heroicons_outline:clipboard-check',
                link : '/estados-financieros/estado-financiero'
            },
            {
                id   : 'apps.estado-financieros.estado-cuenta',
                title: 'estado de  cuentas ',
                type    : 'basic',
                icon    : 'heroicons_outline:clipboard-check',
                link : '/estados-financieros/estado-cuenta'
            },
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
                id   : 'apps.parametros.gestion',
                title: 'Gestiones',
                type : 'basic',
                icon: 'heroicons_outline:document-text',
                link : '/empresa/gestion'
            },
            {
                id   : 'apps.parametros.tipo-comprobante',
                title: 'Tipo comprobante',
                type : 'basic',
                icon: 'heroicons_outline:document-text',
                link : '/parametros/tipo-comprobante'
            },
            {
                id   : 'apps.parametros.cuenta',
                title: 'Plan cuentas',
                type : 'basic',
                icon: 'heroicons_outline:document-text',
                link : '/parametros/cuenta'
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
