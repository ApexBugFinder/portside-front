import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceService } from './experience.service';
import { ExperienceShellComponent } from './experience-shell/experience-shell.component';
import { StoreModule } from '@ngrx/store';
import { experienceReducers } from '.';
import { EffectsModule } from '@ngrx/effects';
import { ExperienceShellEffects } from './experience-shell/state/experience-shell.effects';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ExperienceShellComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('experienceState', experienceReducers),
    EffectsModule.forFeature([ExperienceShellEffects])
  ], 
  exports: [
    ExperienceShellComponent
  ],
  providers: [
    { provide: 'EXPERIENCE_SERVICE', useClass: ExperienceService }
  ],
})
export class ExperienceModule { }
