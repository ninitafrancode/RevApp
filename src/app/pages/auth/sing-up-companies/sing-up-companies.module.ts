import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingUpCompaniesPageRoutingModule } from './sing-up-companies-routing.module';

import { SingUpCompaniesPage } from './sing-up-companies.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingUpCompaniesPageRoutingModule,
    SharedModule
  ],
  declarations: [SingUpCompaniesPage]
})
export class SingUpCompaniesPageModule {}
