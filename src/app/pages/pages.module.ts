import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { PageShellComponent } from './page-shell/page-shell.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectModule } from '../project/project.module';

import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';

import { ExperienceModule } from '../experience/experience.module';
import { EducationModule } from '../education/education.module';
import { EditActionButtonsComponent } from '../shared/edit-action-buttons/edit-action-buttons.component';
import { EditModeComponent } from './edit-mode/edit-mode.component';
import { UserModule } from '../user/user.module';


@NgModule({
  declarations: [
    HomeComponent,
    ProjectComponent,
    EducationComponent,
    ExperienceComponent,
    PageShellComponent,
    ActionButtonsComponent,
    EditModeComponent,


  ],
  imports: [CommonModule, 
    ReactiveFormsModule, 
    PagesRoutingModule, 
    SharedModule, 
    ProjectModule, 
    ExperienceModule,  
    EducationModule,
    UserModule ],
  exports: [
    HomeComponent,
    ProjectComponent,
    EducationComponent,
    ExperienceComponent,
    PageShellComponent,
    ActionButtonsComponent,
    
  ],
})
export class PagesModule {}
