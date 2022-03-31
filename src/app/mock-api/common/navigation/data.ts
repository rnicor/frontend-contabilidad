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
        id      : 'apps',
        title   : 'Libros, segun SFV',
        subtitle: '(desde 01/01/2016)',
        type    : 'group',
        children: [
            {
                id   : 'apps.libros-segun-sfv',
                title: 'Importacion de libro de compras desde las sucursales)',
                type    : 'basic',
                icon    : 'heroicons_outline:share',
                link : '/libros-segun-sfv/importacion-libro-compras'
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
