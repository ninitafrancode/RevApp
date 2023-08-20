import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingUpPreviewPage } from './sing-up-preview.page';

const routes: Routes = [
  {
    path: '',
    component: SingUpPreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingUpPreviewPageRoutingModule {}
