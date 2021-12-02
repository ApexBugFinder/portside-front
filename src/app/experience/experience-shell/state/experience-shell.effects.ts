import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as experienceShellActions from '../state/experience-shell.actions';
import * as fromExperienceShell from '../state';

import * as experienceEntityDataActions from '../../state/experience.actions';
import * as fromExperienceEntityData from '../../state';

import { merge, Observable, of } from 'rxjs';
import { Experience } from '../../Models/experience';
import { ExperienceService } from '../../experience.service';
import { Constants } from 'src/app/helpers/Constants';
import { ExperienceComponent } from 'src/app/pages/experience/experience.component';
import { Update } from '@ngrx/entity';
import * as fromShared from '../../../shared/state';
import { RoleService } from '../../role.service';
import { Role } from '../../Models/role';



@Injectable()
export class ExperienceShellEffects {
  currentExperience$: Observable<Experience | undefined>;
  currentExperience: Experience | undefined;
  userID$: Observable<string>;
  userID: string;
  experienceData$: Observable<(Experience | undefined)[]>;
  experienceData: (Experience | undefined)[];
  experienceDataIds$: Observable<string[]>;
  experienceDataIds: string[];

  constructor(
    private actions$: Actions,
    private sharedStore: Store<fromShared.SharedState>,
    private experienceShellStore: Store<fromExperienceShell.ExperienceShellState>,
    private experienceEntityDataStore: Store<fromExperienceEntityData.ExperienceDataState>,
    private experienceService: ExperienceService,
    private roleService: RoleService
  ) {
    this.experienceData$ = this.experienceEntityDataStore.pipe(
      select(fromExperienceEntityData.selectAllExperiences)
    );
    this.experienceData$.subscribe((i: (Experience | undefined)[]) => {
      this.experienceData = i;
    });
    this.sharedStore
      .pipe(select(fromShared.getUserId))
      .subscribe((id: string) => (this.userID = id));
    this.currentExperience$ = this.experienceShellStore.pipe(
      select(fromExperienceShell.getCurrentExperience)
    );
    this.currentExperience$.subscribe(
      (value) => (this.currentExperience = value)
    );
    this.experienceDataIds$ = this.experienceEntityDataStore.pipe(
      select(fromExperienceEntityData.selectExperienceIds)
    );
    this.experienceDataIds$.subscribe(
      (value) => (this.experienceDataIds = value)
    );
  }

  // LOAD EXPERIENCES TO ADAPTER
  LoadExperiences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        experienceShellActions.ExperienceActionTypes.LOAD_EXPERIENCES_FROM_DB
      ),
      mergeMap(
        (
          action: experienceShellActions.LoadExperiencesByProjectCreatorIDFromDB
        ) =>
          this.experienceService.readAll().pipe(
            tap((payload) =>
              console.log("NGRX EFFECT - READ ALL EXPERIENCES FROM DB")
            ),
            map((payload: Experience[]) => {
              // Delete all experiences
              this.experienceEntityDataStore.dispatch(
                experienceEntityDataActions.clearExperiences()
              );

              // ADD ALL EXPERIENCES FROM THE BACKEND
              this.experienceEntityDataStore.dispatch(
                experienceEntityDataActions.addExperiences({
                  experiences: payload,
                })
              );

              // SET CURRENT EXPERIENCE
              this.experienceShellStore.dispatch(
                new experienceShellActions.SetOriginalExperience(payload[0])
              );
              this.experienceShellStore.dispatch(
                new experienceShellActions.SetCurrentExperience(payload[0])
              );

              // THROW SUCCESS ACTION
              return new experienceShellActions.LoadExperiencesByProjectCreatorIDFromDBSuccess(
                payload
              );
            }),
            catchError((err) =>
              of(
                new experienceShellActions.LoadExperiencesByProjectCreatorIDFromDBFail(
                  err
                )
              )
            )
          )
      )
    )
  );

  // SAVE EXPERIENCE

  SaveNewExperience$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        experienceShellActions.ExperienceActionTypes.SAVE_EXPERIENCE_TO_DB
      ),
      mergeMap((action: experienceShellActions.SaveExperienceToDB) =>
        this.experienceService.createItem(this.currentExperience).pipe(
          tap((payload: Experience) =>
            console.log(
              "NGRX EFFECT - SAVE EXPERIENCE TO DB SUCCESSFUL: ",
              payload
            )
          ),
          map((payload: Experience) => {
            // SAVE TO DATA
            this.experienceEntityDataStore.dispatch(
              experienceEntityDataActions.addExperience({ experience: payload })
            );

            return new experienceShellActions.SaveExperienceToDBSuccess(
              payload
            );
          }),
          catchError((err) =>
            of(new experienceShellActions.SaveExperienceToDBFail(err))
          )
        )
      )
    )
  );
  // UPDATE EXPERIENCE

  UpdateExperience$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        experienceShellActions.ExperienceActionTypes.UPDATE_EXPERIENCE_TO_DB
      ),
      mergeMap((action: experienceShellActions.UpdateExperienceToDB) =>
        this.experienceService.updateItem(this.currentExperience).pipe(
          tap((payload: Experience) =>
            console.log(
              "NGRX EFFECT - UPDATE EXPERIENCE TO DB SUCCESSFUL: ",
              payload
            )
          ),
          map((payload: Experience) => {
            // CHANGE ENTITY DATA STORE
            this.experienceEntityDataStore.dispatch(
              experienceEntityDataActions.upsertExperience({
                experience: payload,
              })
            );

            return new experienceShellActions.UpdateExperienceToDBSuccess(
              payload
            );
          }),
          catchError((err) =>
            of(new experienceShellActions.UpdateExperienceToDBFail(err))
          )
        )
      )
    )
  );
  // DELETE EXPERIENCE

  DeleteExperience$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        experienceShellActions.ExperienceActionTypes.DELETE_EXPERIENCE_TO_DB
      ),
      mergeMap((action: experienceShellActions.DeleteExperienceToDB) =>
        this.experienceService.deleteItem(action.payload.id).pipe(
          tap((payload: Experience) =>
            console.log("NGRX EFFECT - DELETED EXPERIENCE: ", payload)
          ),

          map((payload: Experience) => {
            // this.experienceShellStore.dispatch(new experienceShellActions.ClearOriginalExperience());
            //this.experienceShellStore.dispatch(new experienceShellActions.ClearCurrentExperience());

            // CLEAR ENTITY DATA STORE Of CURRENT EXPERIENCE AND SET NEW CURRENT EXPERIENCE
            this.experienceEntityDataStore.dispatch(
              experienceEntityDataActions.deleteExperience({ id: payload.id })
            );

            return new experienceShellActions.DeleteExperienceToDBSuccess(
              this.experienceData[0] as Experience
            );
          }),
          catchError((err) =>
            of(new experienceShellActions.DeleteExperienceToDBFail(err))
          )
        )
      )
    )
  );

  setNewDataStore(newDataStore: Experience[]): Promise<void> {
    const myProm = new Promise<void>((resolve, reject) => {});

    return myProm;
  }

  // SAVE ROLE
  SaveNewRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(experienceShellActions.ExperienceActionTypes.SAVE_ROLE_TO_DB),
      mergeMap((action: experienceShellActions.SaveRoleToDB) =>
        this.roleService.createItem(action.payload).pipe(
          tap((payload: Role[]) =>
            console.log("NGRX EFFECT - SAVE ROLE TO DB SUCCESSFUL: ", payload)
          ),
          map((payload: Role[]) => {
            // SAVE TO DATA
            let exp: Experience | undefined = JSON.parse(
              JSON.stringify(
                this.experienceData.find(
                  (i) => i?.id == this.currentExperience?.id
                )
              )
            );
            if (exp) {
              exp.roles = payload;
              this.experienceEntityDataStore.dispatch(
                experienceEntityDataActions.upsertExperience({
                  experience: exp as Experience,
                })
              );
            }

            let result: Role[] = JSON.parse(JSON.stringify(payload));

            return new experienceShellActions.SaveRoleToDBSuccess(result);
          }),
          catchError((err) =>
            of(new experienceShellActions.SaveRoleToDBFail(err))
          )
        )
      )
    )
  );
  // UPDATE ROLE
  UpdateNewRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(experienceShellActions.ExperienceActionTypes.UPDATE_ROLE_TO_DB),
      mergeMap((action: experienceShellActions.UpdateRoleToDB) =>
        this.roleService.updateItem(action.payload).pipe(
          tap((payload: Role[]) =>
            console.log("NGRX EFFECT - UPDATE ROLE TO DB SUCCESSFUL: ", payload)
          ),
          map((payload: Role[]) => {
            // UPDATE TO DATA
            let exp: Experience | undefined = JSON.parse(
              JSON.stringify(
                this.experienceData.find(
                  (i) => i?.id == this.currentExperience?.id
                )
              )
            );
            if (exp) {
              exp.roles = payload;
              this.experienceEntityDataStore.dispatch(
                experienceEntityDataActions.upsertExperience({
                  experience: exp as Experience,
                })
              );
            }

            return new experienceShellActions.UpdateRoleToDBSuccess(payload);
          }),
          catchError((err) =>
            of(new experienceShellActions.UpdateRoleToDBFail(err))
          )
        )
      )
    )
  );
  // DELETE ROLE
  DeleteNewRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(experienceShellActions.ExperienceActionTypes.DELETE_ROLE_TO_DB),
      mergeMap((action: experienceShellActions.DeleteRoleToDB) =>
        this.roleService.deleteItem(action.payload).pipe(
          tap((payload: Role[]) =>
            console.log("NGRX EFFECT - DELETE ROLE TO DB SUCCESSFUL: ", payload)
          ),
          map((payload: Role[]) => {
            // UPDATE TO DATA
            let exp: Experience | undefined = JSON.parse(
              JSON.stringify(
                this.experienceData.find(
                  (i) => i?.id == this.currentExperience?.id
                )
              )
            );
            if (exp && payload.length>0) {
              exp.roles = payload;
              this.experienceEntityDataStore.dispatch(
                experienceEntityDataActions.upsertExperience({
                  experience: exp as Experience,
                })
              );
            }

            return new experienceShellActions.DeleteRoleToDBSuccess(payload);
          }),
          catchError((err) =>
            of(new experienceShellActions.DeleteRoleToDBFail(err))
          )
        )
      )
    )
  );
}
