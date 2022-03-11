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
        title   : 'Contabilidad',
        subtitle: 'Módulo de contabilidad',
        type    : 'group',
        icon    : 'heroicons_outline:archive',
        children: [
            {
                id   : 'apps.contabilidad.plan-cuentas',
                title: 'Plan cuentas',
                type : 'basic',
                icon: 'heroicons_outline:document-text',
                link : '/contabilidad/plan-cuentas'
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
                id   : 'apps.parametros.tipo-comprobante',
                title: 'Tipo comprobante',
                type : 'basic',
                icon: 'heroicons_outline:document-text',
                link : '/parametros/tipo-comprobante'
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
