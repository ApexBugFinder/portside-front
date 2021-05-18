import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceService } from './experience.service';
import { ExperienceShellComponent } from './experience-shell/experience-shell.component';
import { StoreModule } from '@ngrx/store';
import { experienceReducers } from '.';
import { EffectsModule } from '@ngrx/effects';
import { ExperienceShellEffects } from './experience-shell/state/experience-shell.effects';
import { SharedModule } from '../shared/shared.module';
import { EditModalShellComponent } from './editModal/edit-modal-shell/edit-modal-shell.component';
import { ImageModule } from '../image/image.module';


@NgModule({
  declarations: [
    ExperienceShellComponent,
    EditModalShellComponent
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('experienceState', experienceReducers),
    ImageModule,
    EffectsModule.forFeature([ExperienceShellEffects])
  ], 
  entryComponents: [EditModalShellComponent],
  exports: [
    ExperienceShellComponent,
    EditModalShellComponent
  ],
  providers: [
    { provide: 'EXPERIENCE_SERVICE', useClass: ExperienceService }
  ],
})
export class ExperienceModule { }
