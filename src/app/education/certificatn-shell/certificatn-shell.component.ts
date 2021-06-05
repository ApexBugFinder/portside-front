import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Certification } from '../Models/certification/certification';
import { Store, select  } from '@ngrx/store';
import * as fromCertifcationData from '../Models/certification/state';

@Component({
  selector: 'app-certificatn-shell',
  templateUrl: './certificatn-shell.component.html',
  styleUrls: ['./certificatn-shell.component.scss']
})
export class CertificatnShellComponent implements OnInit {

  myCerts$: Observable<(Certification|undefined)[]>;
  constructor(private certifcationDataStore: Store<fromCertifcationData.CertificationDataState>) {
    this.myCerts$ = this.certifcationDataStore.pipe(select(fromCertifcationData.selectAllCertifications));
   }

  ngOnInit(): void {

  }

}
