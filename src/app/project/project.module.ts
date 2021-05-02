import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectService } from './project.service';
import { SharedModule } from '../helpers/shared.module';
import { MaterialModule } from '../helpers/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayRquirementsComponent } from './edit/display-rquirements/display-rquirements.component';
import { InputRequirementsComponent } from './edit/input-requirements/input-requirements.component';
import { GitLinkComponent } from './edit/git-link/git-link.component';
import { SiteLinkComponent } from './edit/site-link/site-link.component';
import { EditShellComponent } from './edit/edit-shell.component';
import { ImageModule } from '../image/image.module';

@NgModule({
  declarations: [
    ProjectCardComponent,
    ViewProjectComponent,
    EditProjectComponent,
    AddProjectComponent,
    DisplayRquirementsComponent,
    InputRequirementsComponent,
    GitLinkComponent,
    SiteLinkComponent,
    EditShellComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, ImageModule ],
 entryComponents: [ViewProjectComponent, EditProjectComponent],
  exports: [
    ProjectCardComponent,
    ViewProjectComponent,
    EditProjectComponent,
    AddProjectComponent,
  ],
  providers: [
    { provide: 'PROJECT_SERVICE', useClass: ProjectService }
  ],
})
export class ProjectModule {}
