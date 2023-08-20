import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(
    public firestorage: AngularFireStorage
  ) { }

  uploadImage(file:any, path: string, name:string): Promise<string>{
    return new Promise(resolve=>{
      const filePath = path + '/' + name;
      const ref = this.firestorage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(()=> {
          ref.getDownloadURL().subscribe(url=>{
            const downloadURL = url;
            resolve(downloadURL);
            return;
          })
          
        })        
      ).subscribe();
    })
  }
  
}
