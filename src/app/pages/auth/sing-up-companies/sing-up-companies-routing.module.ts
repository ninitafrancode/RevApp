import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingUpCompaniesPage } from './sing-up-companies.page';

const routes: Routes = [
  {
    path: '',
    component: SingUpCompaniesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingUpCompaniesPageRoutingModule {}
