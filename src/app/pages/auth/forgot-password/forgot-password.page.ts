import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {


  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });


  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
    ) { 
    
  }

  ngOnInit() {
  }

  async submit(){
    if(this.form.valid){
      await this.firebaseSvc.resetPassword(this.form.value.email).then(res => {
        this.utilsSvc.presentToast({
          message : 'Se ha enviado un correo para reestablecer la contraseña',
          duration: 1500,
          color: 'success',
          icon: 'paper-plane-outline'
        });
        this.utilsSvc.routerLink('/auth')

      }, err => {
        this.utilsSvc.presentToast({
          message : 'Correo no registrado',
          duration: 3000,
          color: 'warning',
          icon: 'alert-circle-outline'
        });
      })
      
    }
  }

}
