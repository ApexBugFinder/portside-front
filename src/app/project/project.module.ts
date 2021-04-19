import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectService } from './project.service';
import { SharedModule } from '../helpers/shared.module';



@NgModule({
  declarations: [
    ProjectCardComponent,
    ViewProjectComponent,
    EditProjectComponent,
    AddProjectComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ProjectCardComponent
  ],
  providers: [
    {provide: ProjectService}
  ]
})
export class ProjectModule { }
