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
import { ImgSrcDirective } from './img-src.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ShowNoShowDirective } from './show-no-show.directive';
import { ProfilePicDirective } from './profile-pic.directive';
import { ProjectPicDirective } from './project-pic.directive';




@NgModule({
  declarations: [
    ImageGetterComponent,
    ImgSrcDirective,
    ShowNoShowDirective,
    ProfilePicDirective,
    ProjectPicDirective
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,


  ],
  exports: [
    ImageGetterComponent,
    ImgSrcDirective,
    ProfilePicDirective,
    ProjectPicDirective
  ]


})
export class ImageModule { }
