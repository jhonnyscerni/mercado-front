/* tslint:disable:max-line-length */
import {FuseNavigationItem} from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {

        id: 'dashboard',
        title: 'DashBoard',
        type: 'basic',
        icon: 'mat_solid:dashboard',
        role: 'ROLE_ADMIN',
        link: '/project'
    },
    {

        id: 'usuarios',
        title: 'Usuários',
        type: 'basic',
        icon: 'heroicons_outline:users',
        role: 'ROLE_ADMIN',
        link: '/usuarios'
    },
    {

        id: 'grupos',
        title: 'Grupos',
        type: 'basic',
        icon: 'mat_solid:group',
        role: 'ROLE_ADMIN',
        link: '/grupos'
    },
    {

        id: 'categoriaprodutos',
        title: 'Categoria de Produtos',
        type: 'basic',
        icon: 'mat_solid:category',
        role: 'ROLE_ADMIN',
        link: '/categoria-produtos'
    },
    {

        id: 'marcaprodutos',
        title: 'Marca de Produtos',
        type: 'basic',
        icon: 'mat_solid:branding_watermark',
        role: 'ROLE_ADMIN',
        link: '/marca-produtos'
    },
    {

        id: 'produtos',
        title: 'Produtos',
        type: 'basic',
        icon: 'mat_solid:add_shopping_cart',
        role: 'ROLE_ADMIN',
        link: '/produtos'
    },
    {

        id: 'editais',
        title: 'Editais',
        type: 'basic',
        icon: 'mat_solid:view_headline',
        role: 'ROLE_ADMIN',
        link: '/editais'
    },
    // COMPRADOR
    {

        id: 'dashboard',
        title: 'DashBoard',
        type: 'basic',
        icon: 'mat_solid:dashboard',
        role: 'ROLE_BUYER',
        link: '/project'
    },
    {

        id: 'categoriaprodutos',
        title: 'Categoria de Produtos',
        type: 'basic',
        icon: 'mat_solid:category',
        role: 'ROLE_BUYER',
        link: '/categoria-produtos'
    },
    {

        id: 'marcaprodutos',
        title: 'Marca de Produtos',
        type: 'basic',
        icon: 'mat_solid:branding_watermark',
        role: 'ROLE_BUYER',
        link: '/marca-produtos'
    },
    {

        id: 'produtos',
        title: 'Produtos',
        type: 'basic',
        icon: 'mat_solid:add_shopping_cart',
        role: 'ROLE_BUYER',
        link: '/produtos'
    },

    {

        id: 'editais',
        title: 'Editais',
        type: 'basic',
        icon: 'mat_solid:view_headline',
        role: 'ROLE_BUYER',
        link: '/editais'
    },
    // VENDEDOR
    {

        id: 'dashboard',
        title: 'DashBoard',
        type: 'basic',
        icon: 'mat_solid:dashboard',
        role: 'ROLE_VENDOR',
        link: '/project'
    },
    {

        id: 'editais',
        title: 'Editais',
        type: 'basic',
        icon: 'mat_solid:view_headline',
        role: 'ROLE_VENDOR',
        link: '/editais'
    },
];
//https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/
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
