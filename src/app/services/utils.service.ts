import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, LoadingOptions, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  backendUrl: string = environment.backendUrl;

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private modalController: ModalController,
    private alertController: AlertController,
    private http: HttpClient,
    
  ) { }


  //=======================LOADING=============================
  async presentLoading(opts?: LoadingOptions) { 
    //Esta funcion permite mostrar un loading en la pantalla mientras espera una respuesta del servidor
    const loading = await this.loadingController.create(opts);
    await loading.present();
  }

  async dismissLoading() { 
    //Esta funcion permite cerrar el loading una vez se obtenga una respuesta
    return await this.loadingController.dismiss();
  }

  //=======================TOAST=============================
  async presentToast(opts: ToastOptions) {
    //Esta funcion permite mostrar un toast en la pantalla
    const toast = await this.toastController.create(opts);
    toast.present();
  }

  //=======================LOCALSTORAGE=============================
  setElementInLocalstorage(key: string, value: any) {
    //Esta funcion permite guardar el user en el localStorage
    return localStorage.setItem(key, JSON.stringify(value)); //Se deben convertir los values a string, asi lo requiere localStorage
  }

  getElementFromLocalstorage(key: string) {
    //Esta funcion permite obtener el user del localStorage
    return JSON.parse(localStorage.getItem(key)); //Se des convierte el dato de string a JSON
  }

  removeElementFromLocalstorage(key: string) {
    localStorage.removeItem(key);
  }


  //=======================ROUTING=============================
  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }

   // =====================Modal========================
  //Present
  async presentModal(opts?: ModalOptions) {
    const modal = await this.modalController.create(opts);
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if(data){
      return data;
    }
  
  }
  //Dismiss
  dismissModal(data?:any){
    return this.modalController.dismiss(data);
  }

  // =====================Alert========================
  async presentAlert(opts: AlertOptions) {
    const alert = await this.alertController.create(opts);
  
    await alert.present();
  }

  // =====================API========================

  getAllRecordsModel(modelName: string){
    return this.http.get(`${this.backendUrl}/${modelName}/`);
  }

  getOneRecordModel(modelName: string, id: string){
    return this.http.get(`${this.backendUrl}/${modelName}/${id}`);
  }

  getOneRecordModelByParam(modelName: string, params:any){
    return this.http.get(`${this.backendUrl}/${modelName}/`, { params });
  }


}
