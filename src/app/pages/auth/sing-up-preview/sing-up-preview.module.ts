import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingUpPreviewPageRoutingModule } from './sing-up-preview-routing.module';

import { SingUpPreviewPage } from './sing-up-preview.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingUpPreviewPageRoutingModule,
    SharedModule
  ],
  declarations: [SingUpPreviewPage]
})
export class SingUpPreviewPageModule {}
