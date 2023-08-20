import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent  implements OnInit {

  backendUrl: string = environment.backendUrl;

  @Input() control: FormControl;
  @Input() label: string;
  @Input() icon: string;
  @Input() type: string;
  @Input() autocomplete: string;
  @Output() formDataChange = new EventEmitter<any>();

  isPassword: boolean;
  isImage: boolean;
  hide: boolean = true;
  newImage: string;
  newFile: any;
  categories: any[] = [];

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    if(this.type == 'password'){
      this.isPassword = true;
    }

    if(this.type == 'image'){
      this.isImage = true;
    }

    this.getCategories()
  }

  showOrHidePassword(){
    this.hide = !this.hide;

    if(this.hide){
      this.type = 'password';
    }else{
      this.type = 'text';
    }
  }

  imageUpload(event:any ){
    if(event.target.files && event.target.files[0]){
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image)=>{
        this.newImage = image.target.result as string
      })
      reader.readAsDataURL(event.target.files[0]);
      this.formDataChange.emit({ newFile: this.newFile, newImage: this.newImage });
    }
  }


  getCategories() {
    this.utilsSvc.getAllRecordsModel('categories').subscribe(
      (response: any) => {
        this.categories = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
