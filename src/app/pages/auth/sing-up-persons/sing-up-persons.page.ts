import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'src/app/utils/custom-validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-sing-up-persons',
  templateUrl: './sing-up-persons.page.html',
  styleUrls: ['./sing-up-persons.page.scss'],
})
export class SingUpPersonsPage implements OnInit {

  backendUrl: string = environment.backendUrl;


  form = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    confirmPassword: new FormControl(''),
  })

  newImage: string;

  constructor(
    private firebaseSvc: FirebaseService, 
    private firestorageSvc: FirestorageService,
    private utilsSvc: UtilsService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.confirmPasswordValidator();
  }

  async submit(){
    //Esta funcion se ejecuta cuando se hace click en el boton de submit del formulario
    if(this.form.valid){ //Si el formulario es valido
      this.utilsSvc.presentLoading({ message: 'Registrando usuario...' }); //Mostramos el loading
      const path = 'userImages';
      const res = await this.firestorageSvc.uploadImage(this.newImage, path, this.form.value.name);
      this.form.value.image = res;
      this.firebaseSvc.signUp(this.form.value as User).then( //Primero registramos al usuario en firebase
      async res => {
          await this.firebaseSvc.updateUser({displayName: this.form.value.name}); //Actualizamos el nombre del usuario en firebase, segun lo que haya puesto en el formulario

          //Creamos el objeto a guardar en LocalStorage
          let user: User = {
            uid: res.user.uid,
            name: res.user.displayName,
            email: res.user.email
          }

          this.form.value.uid = res.user.uid;

          this.utilsSvc.setElementInLocalstorage('user', user); //Guardamos el objeto usuario en el localStorage

          this.http.post(`${this.backendUrl}/users/`, this.form.value).subscribe(
            next => {
              console.log(next);
            }
          )

          this.utilsSvc.routerLink('/tabs/home'); //Redireccionamos al home

          this.utilsSvc.dismissLoading(); //Cerramos el loading una vez tengamos la respuesta del servidor

          this.utilsSvc.presentToast({ 
            //Mostramos un toast con el mensaje de bienvenida  
            message: `Bienvenido ${user.name}`,
            duration: 1500,
            color: 'success',
            icon: 'person-outline'
          });

          this.form.reset(); //Reseteamos el formulario
        }, error => { //Si hay un error
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

  handleFormDataChange(formData: any) {  
    this.newImage = formData.newFile
  }

  confirmPasswordValidator(){
    this.form.controls.confirmPassword.setValidators([
        Validators.required, 
        CustomValidators.matchValues(this.form.controls.password)
      ]);
      this.form.controls.confirmPassword.updateValueAndValidity();
  }
}
