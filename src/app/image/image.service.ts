import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { finalize, catchError, timeout} from 'rxjs/operators';
import { Constants } from '../helpers/Constants';
import { KeyValuePair, MediaFile } from './Models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private mediaRef: AngularFireStorageReference;
  downloadURL: Observable<string>;
  private userCollection:  AngularFirestoreCollection<KeyValuePair>;

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore) {
      
     }

  
  
    // POST
    // SEND MEDIA TO ONLINE BUCKET STORAGE

    uploadToFirebase(mediaToSend: MediaFile): Promise<MediaFile> {
      console.log('from the imageService uploadToFirebase Method:');
    
    
    

      // SET STORAGE LOCATION
      const myUploadPromise = new Promise<MediaFile>((resolve, reject) => {
        if (mediaToSend.fileToUpload !== null) {
          this.mediaRef = this.storage.ref(mediaToSend.mediaLocation);
          const task = this.mediaRef.put(mediaToSend.fileToUpload);
    
          task.snapshotChanges().pipe(
            timeout(2000),
            finalize(() => this.downloadURL=this.mediaRef.getDownloadURL()))
            .subscribe(val => {
              val?.ref.getDownloadURL().then(url => {
                mediaToSend.dloadUrl = url;
                console.log('download url: ', url);
                resolve(mediaToSend);
              }).catch(err => {
                mediaToSend.error = err;
                reject(mediaToSend);
              });
            }
            );
          
        
        }

      });
      return myUploadPromise;
     
      

    

    
  }

  processFileInput(file: FileList): Promise<string>|undefined {

    
      let myFile = file?.item(0) as File;
      const myProcessFilePromise = new Promise<string>((resolve, reject) => {
        if (this.isImage(myFile)) {
          const reader = new FileReader();
          reader.onload = (event: any) => {
            resolve(event.target.result);
          };
          reader.readAsDataURL(myFile);

        } else {
          
          reject('File not a Picture');
        }
      });
      return myProcessFilePromise;
    
   
 
}

  isImage(file: File | null): boolean {
    return file?.type.split('/')[0] === 'image';
  }



}
