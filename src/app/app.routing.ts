import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import {AuthGuard} from './core/auth/guards/auth.guard';
import {NoAuthGuard} from './core/auth/guards/noAuth.guard';
import { LandingSignupComponent } from './modules/landing/signup/signup.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    // {path: '', pathMatch : 'full', redirectTo: 'project'},

    // {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'project'},

      {
        path: '',
        data: {
            layout: 'empty'
        },
        children: [
            {path: '', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
           ]
      },
      {
        path: 'sign-up',
        data: {
            layout: 'empty'
        },
        component: LandingSignupComponent
      },
    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)}
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
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)}
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
            {path: 'sign-up', loadChildren: () => import('app/modules/landing/signup/signup.module').then(m => m.LandingSignupModule)}
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
            {path: 'project', loadChildren: () => import('app/modules/admin/dashboards/project/project.module').then(m => m.ProjectModule)},
            {path: 'usuarios', loadChildren: () => import('app/modules/admin/users/users.module').then(m => m.UsersModule)},
            {path: 'grupos', loadChildren: () => import('app/modules/admin/roles/roles.module').then(m => m.RolesModule)},
            {path: 'produtos', loadChildren: () => import('app/modules/admin/product/product.module').then(m => m.ProductModule)},
            {path: 'categoria-produtos', loadChildren: () => import('app/modules/admin/category-product/category-product.module').then(m => m.CategoryProductModule)},
            {path: 'marca-produtos', loadChildren: () => import('app/modules/admin/brand-product/brand-product.module').then(m => m.BrandProductModule)},
            {path: 'editais', loadChildren: () => import('app/modules/admin/notice/notice.module').then(m => m.NoticeModule)},
            {path: 'meus-editais', loadChildren: () => import('app/modules/admin/notice-my/notice-my.module').then(m => m.NoticeMyModule)},
            {path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},
             // Profile
             {path: 'profile', loadChildren: () => import('app/modules/admin/profile/profile.module').then(m => m.ProfileModule)},

        ]
    }
];
