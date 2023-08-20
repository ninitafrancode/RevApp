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
  selector: 'app-sing-up-companies',
  templateUrl: './sing-up-companies.page.html',
  styleUrls: ['./sing-up-companies.page.scss'],
})
export class SingUpCompaniesPage implements OnInit {

  backendUrl: string = environment.backendUrl;

  form = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(7)]),
    category: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('')
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
    if(this.form.valid){
      this.utilsSvc.presentLoading({ message: 'Registrando empresa...' });
      const path = 'userImages';
      const res = await this.firestorageSvc.uploadImage(this.newImage, path, this.form.value.name);
      this.form.value.image = res;
      this.firebaseSvc.signUp(this.form.value as User).then(
        async res => {
          await this.firebaseSvc.updateUser({
            displayName: this.form.value.name
          });

          let user: User = {
            uid: res.user.uid,
            name: res.user.displayName,
            email: res.user.email
          }

          this.form.value.uid = res.user.uid;

          this.http.post(`${this.backendUrl}/companies/`, this.form.value).subscribe({
            next: data => {
              console.log(data);
            },
            error: error => {
              console.error('There was an error!', error);
            }
          })
          this.utilsSvc.setElementInLocalstorage('user', user);

          this.utilsSvc.routerLink('/tabs/home');

          this.utilsSvc.dismissLoading();

          this.utilsSvc.presentToast({ 
            //Mostramos un toast con el mensaje de bienvenida  
            message: `Bienvenido ${user.name}`,
            duration: 1500,
            color: 'primary',
            icon: 'storefront-outline'
          });
        }, error => {
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
