import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  company: any = {};
  person: any = {};
  company_id: string;
  imageProfile: string;

  user = {} as User;

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getUser()
  }

  getUser(){
    this.user = this.utilsSvc.getElementFromLocalstorage('user');
    this.utilsSvc.presentLoading({
      spinner: 'lines-sharp',
    });
    if(this.user.typeUser == 'company'){
      this.getCompanyData()
    }else{
      this.getPersonData()
    }
  }

  signOut() {
  this.utilsSvc.presentAlert({
      header: 'Cerrar sesion',
      message: 'Quieres cerrar sesion?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, 
        {
          text: 'Si, cerrar',
          handler: () => {
            this.firebaseSvc.signOut();
          }
        }
      ]
    });
  }

  async getCompanyData(){
    this.utilsSvc.getAllRecordsModel('companies').subscribe({
      next: (res: any) => {
        res.forEach((company: any) => {
          if(company.uid == this.user.uid){
            this.company = company;
            this.imageProfile = this.company.image
            this.utilsSvc.dismissLoading();
          }
        })
        
      },error: (err: any) => {
        console.log(err);
      }
    })     
  }

  async getPersonData(){
    this.utilsSvc.getAllRecordsModel('users').subscribe({
      next: (res: any) => {
        res.forEach((user: any) => {
          if(user.uid == this.user.uid){
            this.person = user;
            this.imageProfile = this.person.image
            this.utilsSvc.dismissLoading();
          }
        })
        
      },error: (err: any) => {
        console.log(err);
      }
    })
  }

}
