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
import { DegreeShellEffects } from './degree-shell/state/degree-shell.effects';
import { ViewCertComponent } from './certificatn-shell/view-cert/view-cert.component';
import { ViewDegreeComponent } from './degree-shell/view-degree/view-degree.component';
import { MatSliderModule } from '@angular/material/slider';
import { ImageModule } from '../image/image.module';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';
import { PagesModule } from '../pages/pages.module';
import { AddEducationComponent } from './add-education/add-education.component';

@NgModule({
  declarations: [
    DegreeShellComponent,
    CertificatnShellComponent,
    EditCertificationShellComponent,
    EditDegreeShellComponent,
    ViewCertComponent,
    ViewDegreeComponent,
    AddEducationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSliderModule,
    MatDialogModule,
    StoreModule.forFeature('educationState', educationReducers),
    ImageModule,


    EffectsModule.forFeature([CertificationShellEffects, DegreeShellEffects]),
  ],
  entryComponents: [
    EditCertificationShellComponent,
    EditDegreeShellComponent,
    AddEducationComponent
  ],
  exports: [
    DegreeShellComponent,
    CertificatnShellComponent,
    EditCertificationShellComponent,
    EditDegreeShellComponent,
    ViewCertComponent,
    ViewDegreeComponent,
  ],
  providers: [
    { provide: 'CERTIFICATION_SERVICE', useClass: CertService },
    { provide: 'DEGREE_SERVICE', useClass: DegreeService },
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },

  ],
})
export class EducationModule {}
