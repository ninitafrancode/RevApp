import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {}

  ngOnInit() {}
    
  async submit(){
    //Esta funcion se ejecuta cuando se hace click en el boton de submit del formulario
    if(this.form.valid){ //Si el formulario es valido
      this.utilsSvc.presentLoading({ message: 'Autenticando...' }) //Mostramos el loading
      
      await this.firebaseSvc.login(this.form.value as any).then( //Primero registramos al usuario en firebase
      res => {
          //Creamos el objeto a guardar en LocalStorage

          let user: User = {
            uid: res.user.uid,
            name: res.user.displayName,
            email: res.user.email,
          }

          this.utilsSvc.setElementInLocalstorage('user', user); //Guardamos el objeto usuario en el localStorage

          this.utilsSvc.routerLink('/tabs/home'); //Redireccionamos al home

          this.utilsSvc.dismissLoading(); //Cerramos el loading una vez tengamos la respuesta del servidor

          this.utilsSvc.presentToast({ 
            //Mostramos un toast con el mensaje de bienvenida  
            message: `Bienvenido ${user.name}`,
            duration: 1500,
            color: 'success',
            icon: 'person-outline'
          });
        }, error => { //Si hay un error
          console.log(error);
          this.utilsSvc.dismissLoading(); //Cerramos el loading una vez tengamos la respuesta del servidor
          this.utilsSvc.presentToast({ 
            //Mostramos un toast con el mensaje de error  
            message: error,
            duration: 3000,
            color: 'warning',
            icon: 'alert-circle-outline'
          });
          
        }
      );
    }
  }

}
