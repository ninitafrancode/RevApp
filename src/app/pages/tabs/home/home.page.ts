import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { firstValueFrom } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  companies:any = []

  nameCompany: string;

  constructor(
    private utilsSvc: UtilsService,
  ) { }

  ngOnInit(
  ) {}

  ionViewWillEnter() {
    this.getCompanies()
    this.getTypeUser()
  }

  async getCompanies(){
    this.utilsSvc.presentLoading({
      spinner: 'lines-sharp',
    })
    this.utilsSvc.getAllRecordsModel('companies').subscribe(
      (res: any) => {        
        this.companies = res;
        this.utilsSvc.dismissLoading();
      }
    )
  }

  getStars(rating: number): number[] {
    return Array.from({ length: rating });
  }

  async getTypeUser(){   
    let user_local = this.utilsSvc.getElementFromLocalstorage('user')

    try{
      const res: any = await firstValueFrom(
        this.utilsSvc.getAllRecordsModel('users')
      )
      res.forEach((user: any) => {
        if(user.uid == user_local.uid){
          user_local.typeUser = 'person'
          }
        })    
      if(!user_local.typeUser){
        user_local.typeUser = 'company'
      }

      this.utilsSvc.setElementInLocalstorage('user', user_local)
    }catch(e){
      console.log(e)
    }
  }

  handleSearchName(nameCompany:string){
    this.nameCompany = nameCompany;

    const params = new HttpParams()
    .set('name', this.nameCompany)
    this.utilsSvc.getOneRecordModelByParam('companies', params).subscribe(
      (res: any) => {
        this.companies = res;
      }, error => {
        this.utilsSvc.presentToast({ 
          message: 'No se encontraron resultados',
          duration: 3000,
          color: 'warning',
          icon: 'alert-circle-outline'
        });
      }
    )
  }

  doRefresh(event:any){
    this.getCompanies()
    event.target.complete();
  }

}
