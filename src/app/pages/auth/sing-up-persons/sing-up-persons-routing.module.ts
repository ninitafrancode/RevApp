import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingUpPersonsPage } from './sing-up-persons.page';

const routes: Routes = [
  {
    path: '',
    component: SingUpPersonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingUpPersonsPageRoutingModule {}
