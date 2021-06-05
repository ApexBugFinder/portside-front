import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionButtonsComponent } from '../pages/action-buttons/action-buttons.component';
import { EditActionButtonsComponent } from './edit-action-buttons/edit-action-buttons.component';
import { StoreModule } from '@ngrx/store';
// import { sharedReducers } from './state';
import { sharedReducer } from './state/shared-reducer';
import { EffectsModule } from '@ngrx/effects';
import { SharedEffects } from './state/shared-effects';



@NgModule({
  declarations: [ EditActionButtonsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    StoreModule.forFeature('sharedState', sharedReducer),
    EffectsModule.forFeature([SharedEffects])
  ],
  exports : [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EditActionButtonsComponent

  ]
})
export class SharedModule { }
