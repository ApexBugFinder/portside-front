import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { PageShellComponent } from './page-shell/page-shell.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProjectComponent,
    EducationComponent,
    ExperienceComponent,
    PageShellComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
