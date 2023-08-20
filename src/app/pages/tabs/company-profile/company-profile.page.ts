import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { AddReviewComponent } from 'src/app/shared/components/add-review/add-review.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.page.html',
  styleUrls: ['./company-profile.page.scss'],
})
export class CompanyProfilePage implements OnInit {

  backendUrl: string = environment.backendUrl;


  company: any = {};
  company_id: string;
  reviews: any[] = [];

  type_user: string;

  form = new FormGroup({
    user_id: new FormControl(''),
    company_id: new FormControl(''),
    description: new FormControl(''),
    rating: new FormControl([Validators.required]),
  });

  constructor(
    private actRoute: ActivatedRoute,
    private utilsSvc: UtilsService,
    private http: HttpClient
  ) { 
    this.company_id = this.actRoute.snapshot.paramMap.get('id') as string;
    this.form.value.company_id = this.actRoute.snapshot.paramMap.get('id') as string;    
  }

  ngOnInit() {}
  
  ionViewWillEnter() {
    this.getCompanyData();
    this.getUserId();
    this.getTypeUser();
  }

  async getCompanyData(){
    this.utilsSvc.presentLoading({
      spinner: 'lines-sharp',
    })
    this.http.get(`https://cors-anywhere-buj0.onrender.com/${this.backendUrl}/companies/${this.company_id}`).subscribe({
      next: (res: any) => {
        this.utilsSvc.dismissLoading();
        this.company = res;
        this.reviews = res.reviews;        
      },error: (err: any) => {
        this.utilsSvc.dismissLoading();
      }
    })     
  }


  getTypeUser(){
    let type_user = this.utilsSvc.getElementFromLocalstorage('user').typeUser;
    this.type_user = type_user;
  }

  async getUserId(){
    let user_uid = this.utilsSvc.getElementFromLocalstorage('user').uid;
    this.utilsSvc.getAllRecordsModel('users').subscribe({
      next: (res: any) => {
        let user = res.filter((user: any) => user.uid === user_uid);
        let id = user[0].id;
        this.form.value.user_id = id;
      }
    })    
  }

  getStars(rating: number): number[] {
    return Array.from({ length: rating });
  }

  async createReview(){
    let res = await this.utilsSvc.presentModal({
      component: AddReviewComponent,
      componentProps:{ company_id: this.form.value.company_id },
      cssClass: 'add-review-modal'
    })
    if(res){
      this.getCompanyData();
    }
  }

  doRefresh(event:any){
    this.getCompanyData();
    event.target.complete();
  }
}
