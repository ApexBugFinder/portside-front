import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { throwError } from 'rxjs';
import { Constants } from 'src/app/helpers/Constants';
import { ImageService } from '../image.service';
import { defaultMediaFile, MediaFile } from '../Models/image';

@Component({
  selector: 'app-image-getter',
  templateUrl: './image-getter.component.html',
  styleUrls: ['./image-getter.component.scss']
})
export class ImageGetterComponent implements OnInit {
  mediaToSendToDB: MediaFile;
  @Input() Title: string;
  @Input() docID: string; 
  @Input() projectCreatorID: string;
  @Input() typeOfClass: string;  // this is either Projects Experience or Education: part of mediaLocation
  
  
  @Output() mediaRtUrl: EventEmitter<string> = new EventEmitter<string>();
  constructor(private imageService: ImageService) { }

  ngOnInit(): void {

    console.log('ImageGetter Title: ', this.Title);
    console.log('ProjectID: ', this.docID);
    console.log('Project Creator', this.projectCreatorID);
    this.mediaToSendToDB = defaultMediaFile;
    

  
    
  }

  handleFileInput(file: FileList ) {
    let myFile: FileList = file as FileList;
    this.imageService.processFileInput(myFile)?.then(value => {
    console.log(value);
    this.mediaToSendToDB.filelist = myFile;
    this.mediaToSendToDB.type = this.Title;
    this.mediaToSendToDB.fileToUpload = myFile?.item(0) as File;
    this.mediaToSendToDB.mediaLocation = 
    "users/" +
    this.projectCreatorID +
    this.typeOfClass +
    this.docID +
    "/" +
    this.mediaToSendToDB.type;

    
   this.imageService.uploadToFirebase(this.mediaToSendToDB).then(value => {
    console.log('download URl returned: ', value);
    // Use ngrx instead of eventemitter
    
    this.mediaRtUrl.emit(value?.dloadUrl);
   });
    
}).catch(val => {
  throwError(val);
});
    
  }
 returnImageUrlToParentComponent(returnUrl:string) {
   console.log('Emitting result from image-getter', returnUrl);
 // this.mediaRtUrl.emit(returnUrl);
 }
}
