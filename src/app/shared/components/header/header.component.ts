import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  companies: any[] 
  params: any = {};

  @Input() title: string;
  @Input() backButton: string;
  @Input() color: string;
  @Input() IsModal: boolean;
  @Input() centerTitle: boolean;
  @Input() logoutButton: boolean;
  @Input() searchBar: boolean;
  @Output() searchQuery = new EventEmitter<any>();

  
  constructor(
    private utilsSvc: UtilsService,
    private firebaseSvc: FirebaseService,
  ) { }

  ngOnInit() {}

  dismissModal(){
    this.utilsSvc.dismissModal();
  }

  logoutCompany(){
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

  searchCompanies(){
    this.searchQuery.emit(this.params.name)
  }


  

}
