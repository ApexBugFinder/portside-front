import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store, select } from '@ngrx/store';
import * as fromShared from './';
import * as sharedActions from './shared-actions';

import * as fromExperienceData from '../../experience/state';
import * as experienceDataActions from '../../experience/state/experience.actions';
import * as fromProjectData from '../../project/state'
import * as projectDataActions from '../../project/state/project.actions';
import * as fromDegreeData from '../../education/Models/degree/state';
import * as degreeDataActions from '../../education/Models/degree/state/degree.actions';
import * as fromCertData from '../../education/Models/certification/state';
import * as  certDataActions from '../../education/Models/certification/state/certification.actions';



import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, share, tap } from "rxjs/operators";
import { UserService } from "src/app/user/Models/user.service";
import { UserState } from "src/app/user/Models/user";

@Injectable()
export class SharedEffects {

  userName$: Observable<string>;
  userName: string;
  constructor(
    private actions$: Actions,
    private shareStore: Store<fromShared.SharedModuleState>,
    private projectStore: Store<fromProjectData.ProjectModuleState>,
    private experienceStore: Store<fromExperienceData.ExperienceDataState>,
    private certDataStore: Store<fromCertData.CertificationDataState>,
    private degreeDataStore: Store<fromDegreeData.DegreeDataState>,
    private userService: UserService) {
      this.shareStore.pipe(select(fromShared.getUsername))
           .subscribe((value: string) => this.userName = value);
}

GetUserState$ = createEffect(() => this.actions$.pipe(
  ofType(sharedActions.SharedActionTypes.LOAD_USERSTATE),
  mergeMap((action: sharedActions.LoadUserState) =>
    this.userService.getUserInfo(action.payload)
    .pipe(
      tap((payload: UserState) => console.log(payload)),
      tap((userState: UserState) => {
if (userState.userId != null) {
        this.projectStore.dispatch(projectDataActions.loadProjects({projects: userState.projects}));
       this.degreeDataStore.dispatch(degreeDataActions.loadDegrees({Degrees: userState.Degrees}));
        this.certDataStore.dispatch(certDataActions.loadCertifications({Certifications: userState.Certifications}));
        this.experienceStore.dispatch(experienceDataActions.loadExperiences({experiences: userState.experiences}));
}
      }),
      map((userState: UserState) => (new sharedActions.LoadUserStateSuccess(userState.userId))),
      catchError(err => of (new sharedActions.LoadUserStateFail(err)))
    ))

))
}
