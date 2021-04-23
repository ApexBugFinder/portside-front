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

@NgModule({
  declarations: [
    ProjectCardComponent,
    ViewProjectComponent,
    EditProjectComponent,
    AddProjectComponent,
  ],
  imports: [CommonModule, MaterialModule, SharedModule, ReactiveFormsModule ],
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
