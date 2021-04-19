import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { PageShellComponent } from './page-shell/page-shell.component';
import { SharedModule } from '../helpers/shared.module';
import { ProjectModule } from '../project/project.module';


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
    PagesRoutingModule,
    SharedModule,
    ProjectModule
  ]
})
export class PagesModule { }
