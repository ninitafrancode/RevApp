import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from './components/logo/logo.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { RatingComponent } from './components/rating/rating.component';



@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    CustomInputComponent,
    AddReviewComponent,
    RatingComponent
  ],
  exports: [
    HeaderComponent,
    LogoComponent,
    CustomInputComponent,
    AddReviewComponent,
    RatingComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class SharedModule { }
