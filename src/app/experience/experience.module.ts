import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceService } from './experience.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], 
  providers: [
    { provide: 'EXPERIENCE_SERVICE', useClass: ExperienceService }
  ],
})
export class ExperienceModule { }
