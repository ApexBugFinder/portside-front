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
import * as fromSharedData from '../userData/state';
import * as sharedDataActions from '../userData/state/userData.actions';


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
    private shareStore: Store<fromShared.SharedState>,
    private projectStore: Store<fromProjectData.ProjectModuleState>,
    private experienceStore: Store<fromExperienceData.ExperienceDataState>,
    private certDataStore: Store<fromCertData.CertificationDataState>,
    private degreeDataStore: Store<fromDegreeData.DegreeDataState>,
    private sharedDataStore: Store<fromSharedData.SharedUserDataState>,
    private userService: UserService) {
      this.shareStore.pipe(select(fromShared.getUsername))
           .subscribe((value: string) => this.userName = value);
}

GetUserState$ = createEffect(() => this.actions$.pipe(
  ofType(sharedActions.SharedActionTypes.LOAD_USERSTATE),
  mergeMap((action: sharedActions.LoadUserState) =>
    this.userService.getUserInfo(action.payload)
    .pipe(
      // tap((payload: UserState) => console.log(payload)),
      tap((userState: UserState) => {
if (userState.id != null) {
  console.log(userState);

}
      }),
      map((userState: UserState) => {
      if(userState.id != '') {
          console.log(userState.certifications);
          let myUsers: UserState[] = [];
          myUsers.push(userState);
     this.sharedDataStore.dispatch(
       sharedDataActions.upsertUsers({ Users: myUsers })
     );
        this.shareStore.dispatch(new sharedActions.SetUserId(userState.id));
        this.shareStore.dispatch(new sharedActions.SetUsername(userState.username));
        this.projectStore.dispatch(projectDataActions.clearProjects());
        this.projectStore.dispatch(projectDataActions.addProjects({projects: userState.projects}));
        this.degreeDataStore.dispatch(degreeDataActions.clearDegrees());
       this.degreeDataStore.dispatch(degreeDataActions.addDegrees({Degrees: userState.degrees}));
       this.certDataStore.dispatch(certDataActions.clearCertifications());
        this.certDataStore.dispatch(certDataActions.addCertifications({Certifications: userState.certifications}));
        this.experienceStore.dispatch(experienceDataActions.clearExperiences());
        this.experienceStore.dispatch(experienceDataActions.addExperiences({experiences: userState.experiences}));
      }
        return new sharedActions.LoadUserStateSuccess(userState.id);
      },
      catchError(err => of (new sharedActions.LoadUserStateFail(err)))
    ))

)));



GetUserStateById$ = createEffect(() => this.actions$.pipe(
  ofType(sharedActions.SharedActionTypes.LOAD_USERSTATE_ByID),
  mergeMap((action: sharedActions.LoadUserStateById) =>
    this.userService.getUserById(action.payload)
    .pipe(
      // tap((payload: UserState) => console.log(payload)),
      tap((userState: UserState) => {
if (userState.id != null) {
  console.log(userState);

}
      }),
      map((userState: UserState) => {
      if(userState.id != '') {
          console.log(userState.certifications);

            let myUsers: UserState[] = [];
            myUsers.push(userState);
            this.sharedDataStore.dispatch(
              sharedDataActions.upsertUsers({ Users: myUsers })
            );
        this.shareStore.dispatch(new sharedActions.SetUserId(userState.id));
        this.shareStore.dispatch(new sharedActions.SetUsername(userState.username));
        this.shareStore.dispatch(new sharedActions.SetUserProfilePic(userState.userPicUrl));
        this.projectStore.dispatch(projectDataActions.clearProjects());
        this.projectStore.dispatch(projectDataActions.addProjects({projects: userState.projects}));
        this.degreeDataStore.dispatch(degreeDataActions.clearDegrees());
       this.degreeDataStore.dispatch(degreeDataActions.addDegrees({Degrees: userState.degrees}));
       this.certDataStore.dispatch(certDataActions.clearCertifications());
        this.certDataStore.dispatch(certDataActions.addCertifications({Certifications: userState.certifications}));
        this.experienceStore.dispatch(experienceDataActions.clearExperiences());
        this.experienceStore.dispatch(experienceDataActions.addExperiences({experiences: userState.experiences}));
      }
        return new sharedActions.LoadUserStateByIdSuccess(userState.id);
      },
      catchError(err => of (new sharedActions.LoadUserStateByIdFail(err)))
    ))

)));

    }

