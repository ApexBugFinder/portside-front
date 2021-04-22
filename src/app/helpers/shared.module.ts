import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports : [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
