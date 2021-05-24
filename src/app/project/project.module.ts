import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ViewProjectComponent } from './view-project/view-project.component';


import { ProjectService } from './project.service';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputRequirementsComponent } from './edit/input-requirements/input-requirements.component';
import { GitLinkComponent } from './edit/git-link/git-link.component';
import { SiteLinkComponent } from './edit/site-link/site-link.component';
import { EditShellComponent } from './edit/edit-shell.component';
import { ImageModule } from '../image/image.module';
import { IconsSectionComponent } from './edit/icons-section/icons-section.component';
import { StoreModule } from '@ngrx/store';
import { projectReducers } from './state';
import { ProjectStatusSectionComponent } from './edit/project-status-section/project-status-section.component';
import { ActionButtonsComponent } from './edit/action-buttons/action-buttons.component';
import { editProjectReducer } from './edit/state/edit-project.reducer';
import { DisplayRequirementsComponent } from './edit/display-requirements/display-requirements.component';
import { EffectsModule } from '@ngrx/effects';
import { EditProjectEffects } from './edit/state/edit-project.effects';

@NgModule({
  declarations: [
    ProjectCardComponent,
    ViewProjectComponent,


    
    InputRequirementsComponent,
    GitLinkComponent,
    SiteLinkComponent,
    EditShellComponent,
    IconsSectionComponent,
    ProjectStatusSectionComponent,
    ActionButtonsComponent,
    DisplayRequirementsComponent,
   


  ],
  imports: [
    SharedModule, 
    StoreModule.forFeature('projects', projectReducers),
    EffectsModule.forFeature([EditProjectEffects, ]),
    ReactiveFormsModule, 
    ImageModule ],
 entryComponents: [ViewProjectComponent, EditShellComponent],
  exports: [
    ProjectCardComponent,
    ViewProjectComponent,
   

  ],
  providers: [
    { provide: 'PROJECT_SERVICE', useClass: ProjectService }
  ],
})
export class ProjectModule {}
