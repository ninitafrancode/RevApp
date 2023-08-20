import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage
  },
  {
    path: 'sing-up-preview',
    loadChildren: () => import('./sing-up-preview/sing-up-preview.module').then( m => m.SingUpPreviewPageModule)
  },
  {
    path: 'sing-up-persons',
    loadChildren: () => import('./sing-up-persons/sing-up-persons.module').then( m => m.SingUpPersonsPageModule)
  },
  {
    path: 'sing-up-companies',
    loadChildren: () => import('./sing-up-companies/sing-up-companies.module').then( m => m.SingUpCompaniesPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
