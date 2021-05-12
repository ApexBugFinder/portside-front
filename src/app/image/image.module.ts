import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGetterComponent } from './image-getter/image-getter.component';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import {  MatButtonModule } from '@angular/material/button';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';




@NgModule({
  declarations: [
    ImageGetterComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,

  ],
  exports: [
    ImageGetterComponent
  ]

  
})
export class ImageModule { }
