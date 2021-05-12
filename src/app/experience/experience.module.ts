import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceService } from './experience.service';
import { ExperienceShellComponent } from './experience-shell/experience-shell.component';


@NgModule({
  declarations: [
    ExperienceShellComponent
  ],
  imports: [
    CommonModule
  ], 
  providers: [
    { provide: 'EXPERIENCE_SERVICE', useClass: ExperienceService }
  ],
})
export class ExperienceModule { }
