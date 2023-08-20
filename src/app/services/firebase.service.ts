import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActionCodeSettings, getAuth, getIdToken, sendEmailVerification, updateProfile } from "firebase/auth";
import { UtilsService } from './utils.service';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private utilsSvc: UtilsService
  ) { }

  //=======================AUTH=============================

  login(user:User){
    //Esta funcion permite loguear al usuario usando el servicio de auth de firebase, le pasamos el email y el password
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  signUp(user:User){
    //Esta funcion permite registrar al usuario usando el servicio de auth de firebase, le pasamos el email y el password
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  updateUser(user:any){
    //Esta funcion permite actualizar el usuario usando el servicio de auth de firebase, le pasamos el user actual y el user con los nuevos datos
    const auth = getAuth();
    return updateProfile(auth.currentUser, user);
  }

  getAuthState(){
    //Esta funcion permite obtener el estado de autenticacion del usuario
    return this.auth.authState;
  }

  resetPassword(email:string){
    //Esta funcion permite resetear la contraseña del usuario, le pasamos el email
    return this.auth.sendPasswordResetEmail(email);
  }

  async signOut(){
    //Esta funcion permite cerrar sesion
    await this.auth.signOut(); //Cerramos sesion en firebase
    this.utilsSvc.routerLink('/auth'); // Redireccionamos al login
    localStorage.removeItem('user'); //Eliminamos el usuario del localStorage
  }

}
