import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingUpPersonsPageRoutingModule } from './sing-up-persons-routing.module';

import { SingUpPersonsPage } from './sing-up-persons.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingUpPersonsPageRoutingModule,
    SharedModule
  ],
  declarations: [SingUpPersonsPage]
})
export class SingUpPersonsPageModule {}
