import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ProjectModule } from './project/project.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ActionButtonsComponent } from './pages/action-buttons/action-buttons.component';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { HeaderMenuComponent } from './header/header-menu/header-menu.component';



@NgModule({
  declarations: [AppComponent, HeaderComponent, HeaderMenuComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'App Demo DevTools',
      maxAge: 25,
      logOnly: environment.production,
    }),


    PagesModule,
    UserModule
  ],
  exports: [HeaderComponent, HeaderMenuComponent],
  // entryComponents: [ProjectCardComponent, EditProjectComponent],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    { provide: 'AUTH_SERVICE', useValue: AuthService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
