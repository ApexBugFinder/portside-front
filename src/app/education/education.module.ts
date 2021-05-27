import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertService } from './Models/certification/cert.service';
import { DegreeService } from './Models/degree/degree.service';
import { DegreeShellComponent } from './degree-shell/degree-shell.component';
import { CertificatnShellComponent } from './certificatn-shell/certificatn-shell.component';
import { EditCertificationShellComponent } from './certificatn-shell/edit-certification-shell/edit-certification-shell.component';
import { EditDegreeShellComponent } from './degree-shell/edit-degree-shell/edit-degree-shell.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { educationReducers } from './state';
import { EffectsModule } from '@ngrx/effects';
import { CertificationShellEffects } from './certificatn-shell/state/certification-shell.effects';
import { ViewCertComponent } from './certificatn-shell/view-cert/view-cert.component';
import { ViewDegreeComponent } from './degree-shell/view-degree/view-degree.component';

@NgModule({
  declarations: [
    DegreeShellComponent,
    CertificatnShellComponent,
    EditCertificationShellComponent,
    EditDegreeShellComponent,
    ViewCertComponent,
    ViewDegreeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('educationState', educationReducers),
    EffectsModule.forFeature([CertificationShellEffects])
  ],
  exports: [],
  providers: [
    { provide: 'CERTIFICATION_SERVICE', useClass: CertService},
    { provide: 'DEGREE_SERVICE', useClass: DegreeService }
  ]
})
export class EducationModule { }
