/* tslint:disable:max-line-length */
import {FuseNavigationItem} from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {

        id: 'dashboard',
        title: 'DashBoard',
        type: 'basic',
        icon: 'mat_solid:dashboard',
        link: '/project'
    },
    {

        id: 'usuarios',
        title: 'Usuários',
        type: 'basic',
        icon: 'heroicons_outline:users',
        link: '/usuarios'
    },
    {

        id: 'grupos',
        title: 'Grupos',
        type: 'basic',
        icon: 'mat_solid:group',
        link: '/grupos'
    },
    {

        id: 'produtos',
        title: 'Produtos',
        type: 'basic',
        icon: 'mat_solid:add_shopping_cart',
        link: '/produtos'
    },
    {

        id: 'categoriaprodutos',
        title: 'Categoria de Produtos',
        type: 'basic',
        icon: 'mat_solid:category',
        link: '/categoria-produtos'
    },
    {

        id: 'marcaprodutos',
        title: 'Marca de Produtos',
        type: 'basic',
        icon: 'mat_solid:branding_watermark',
        link: '/marca-produtos'
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
