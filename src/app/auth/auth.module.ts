import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { AuthRoutingModule } from './auth-routing.module';
import { authReducer } from './state/auth.reducer';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [AuthCallbackComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', authReducer)
  ],
  exports: [
    AuthCallbackComponent
  ]
})
export class AuthModule { }
