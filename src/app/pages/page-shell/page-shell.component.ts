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
import { Constants } from 'src/app/helpers/Constants';
import { ExperienceService } from 'src/app/experience/experience.service';

@Component({
  selector: 'app-page-shell',
  templateUrl: './page-shell.component.html',
  styleUrls: ['./page-shell.component.scss']
})
export class PageShellComponent implements OnInit {
  private readonly userID: string = Constants.userID;
  userProject$: Observable<Project[]>
  constructor( private editProjectStore: Store<fromEditProject.EditProjectState>,
    private certicationShellStore: Store<fromCertificationShell.CertificationShellState>,
    private degreeShellStore: Store<fromDegreeShell.DegreeShellState>,
    private experienceShellStore: Store<fromExperienceShell.ExperienceShellState>) {

    this.editProjectStore.dispatch(new editProjectActions.LoadProjectsByProjectCreatorIDFromDB(this.userID));
    this.experienceShellStore.dispatch(new experienceShellActions.LoadExperiencesByProjectCreatorIDFromDB(this.userID));
    this.degreeShellStore.dispatch(new degreeShellActions.LoadDegreesByProjectCreatorIDFromDB(this.userID));
    this.certicationShellStore.dispatch(new certificationShellActions.LoadCertificationsByProjectCreatorIDFromDB(this.userID));


  }

  ngOnInit(): void {
  }

}
