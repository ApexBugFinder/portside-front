import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromEditProject from '../../project/edit/state';
import * as editProjectActions from '../../project/edit/state/edit-project.actions';
import { Observable } from 'rxjs';
import { Project } from 'src/app/project/models/project';
import * as fromExperienceShell from '../../experience/experience-shell/state';
import * as experienceShellActions from '../../experience/experience-shell/state/experience-shell.actions';
import * as fromCertificationShell from '../../education/certificatn-shell/state/certification-shell.reducer';
import { Constants } from 'src/app/helpers/Constants';
import { ExperienceService } from 'src/app/experience/experience.service';

@Component({
  selector: 'app-page-shell',
  templateUrl: './page-shell.component.html',
  styleUrls: ['./page-shell.component.scss']
})
export class PageShellComponent implements OnInit {

  userProject$: Observable<Project[]>
  constructor( private editProjectStore: Store<fromEditProject.EditProjectState>,
    private certicationShellStore: Store<fromCertificationShell.CertificationShellState>,
    private experienceShellStore: Store<fromExperienceShell.ExperienceShellState>) {

    this.editProjectStore.dispatch(new editProjectActions.LoadProjectsByProjectCreatorIDFromDB(Constants.userID));
    this.experienceShellStore.dispatch(new experienceShellActions.LoadExperiencesByProjectCreatorIDFromDB(Constants.userID));


  }

  ngOnInit(): void {
  }

}
