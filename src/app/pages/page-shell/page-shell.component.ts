import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromEditProject from '../../project/edit/state';
import * as editProjectActions from '../../project/edit/state/edit-project.actions';
import { Observable } from 'rxjs';
import { Project } from 'src/app/project/models/project';
import * as fromExperienceShell from '../../experience/experience-shell/state';
import * as experienceShellActions from '../../experience/experience-shell/state/experience-shell.actions';
import * as fromCertificationShell from '../../education/certificatn-shell/state/certification-shell.reducer';
import * as certificationShellActions from '../../education/certificatn-shell/state/certification-shell.actions';
import * as fromDegreeShell from '../../education/degree-shell/state/degree-shell.reducer';
import * as degreeShellActions from '../../education/degree-shell/state/degree-shell.actions';
import * as fromShared from '../../shared/state';


@Component({
  selector: 'app-page-shell',
  templateUrl: './page-shell.component.html',
  styleUrls: ['./page-shell.component.scss']
})
export class PageShellComponent implements OnInit {
  private userID: string = '';
  isAuth$: Observable<boolean>;
  userProject$: Observable<Project[]>
  constructor( private editProjectStore: Store<fromEditProject.EditProjectState>,
    private certicationShellStore: Store<fromCertificationShell.CertificationShellState>,
    private degreeShellStore: Store<fromDegreeShell.DegreeShellState>,
    private experienceShellStore: Store<fromExperienceShell.ExperienceShellState>,
    private sharedStore: Store<fromShared.SharedState>) {

    this.sharedStore.pipe(select(fromShared.getUserId)).subscribe((id:string)=> this.userID = id);




  }

  ngOnInit(): void {

  }

}
