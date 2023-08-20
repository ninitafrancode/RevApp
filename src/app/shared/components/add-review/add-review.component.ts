import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss'],
})
export class AddReviewComponent  implements OnInit {

  backendUrl: string = environment.backendUrl;

  @Input() company_id: number;

  form = new FormGroup({
    user_id: new FormControl(''),
    company_id: new FormControl(0),
    description: new FormControl(''),
    rating: new FormControl(0),
  });

  constructor(
    private utilsSvc: UtilsService,
    private http: HttpClient
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUserId()
    this.getCompanyId();
  }


  getRatingFromStars(rating: any) {  
    this.form.controls.rating.setValue(rating);
  }

  async getCompanyId(){
    this.form.controls.company_id.setValue(this.company_id);
  }

  async getUserId(){
    let user_uid = this.utilsSvc.getElementFromLocalstorage('user').uid;

    this.utilsSvc.getAllRecordsModel('users').subscribe({
      next: (res: any) => {
        let user = res.filter((user: any) => user.uid === user_uid);
        let id = user[0].id;
        this.form.controls.user_id.setValue(id);
      }
    })    
  }

  async createReview(){
    if(this.form.valid){
      this.utilsSvc.presentLoading({ 
        message: 'Publicando reseña',
        spinner: 'lines-sharp'
      });
      this.http.post(`${this.backendUrl}/reviews/`, this.form.value).subscribe({
        next: (res: any) => {
          this.utilsSvc.dismissLoading();
          this.utilsSvc.dismissModal({success: true});          
          this.utilsSvc.presentToast({ 
            message: 'Reseña publicada',
            color: 'primary',
            icon: 'paper-plane-outline',
            duration: 1000
          });
          
        }, error: (err: any) => {
          this.utilsSvc.dismissLoading();
          this.utilsSvc.presentToast({ 
            message: 'Error al publicar reseña: Datos incompletos',
            duration: 3000,
            color: 'warning',
            icon: 'alert-circle-outline'
          });
        }
      })
    }    
  }
}
