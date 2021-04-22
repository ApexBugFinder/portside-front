import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './helpers/shared.module';
import { HeaderComponent } from './header/header.component';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ProjectCardComponent } from './project/project-card/project-card.component';
import { EditProjectComponent } from './project/edit-project/edit-project.component';


@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    PagesModule,
    RouterModule,
  ],
  exports: [HeaderComponent],
  entryComponents: [ProjectCardComponent, EditProjectComponent],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
