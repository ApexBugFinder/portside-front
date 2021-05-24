import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertService } from '../education/certification/cert.service';
import { DegreeService } from './Degree/degree.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    { provide: 'CERTIFICATION_SERVICE', useClass: CertService},
    { provide: 'DEGREE_SERVICE', useClass: DegreeService }
  ]
})
export class EducationModule { }
