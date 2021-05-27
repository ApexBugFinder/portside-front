import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as degreeShellActions from './degree-shell.actions';
import * as fromDegreeShell from '.';

import * as degreeEntityDataActions from '../../Models/degree/state/degree.actions';
import * as fromDegreeEntityData from '../../Models/degree/state';

import { merge, Observable, of } from 'rxjs';
import { Degree } from '../../Models/degree/degree';
import { DegreeService } from '../../Models/degree/degree.service';
import { Constants } from 'src/app/helpers/Constants';

@Injectable()
export class DegreeShellEffects {
  currentDegree$: Observable<Degree>;
  currentDegree: Degree;

  degreeData$: Observable<(Degree | undefined)[]>;
  degreeData: (Degree | undefined)[];
  degreeDataIds$: Observable<string[]>;
  degreeDataIds: string[];

  constructor(
    private actions$: Actions,
    private degreeShellStore: Store<fromDegreeShell.DegreeShellState>,
    private degreeEntityDataStore: Store<fromDegreeEntityData.DegreeDataState>,
    private degreeService: DegreeService
  ) {
    this.degreeData$ = this.degreeEntityDataStore.pipe(
      select(fromDegreeEntityData.selectAllDegrees)
    );
    this.degreeData$.subscribe((i: (Degree | undefined)[]) => {
      this.degreeData = i;
    });
    this.currentDegree$ = this.degreeShellStore.pipe(
      select(fromDegreeShell.getCurrentDegree)
    );
    this.currentDegree$.subscribe(
      (value) => (this.currentDegree = value)
    );
    this.degreeDataIds$ = this.degreeEntityDataStore.pipe(
      select(fromDegreeEntityData.selectDegreeIds)
    );
    this.degreeDataIds$.subscribe(
      (value) => (this.degreeDataIds = value)
    );
  }

  // LOAD DEGREES TO ADAPTER
  LoadDegrees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        degreeShellActions.DegreeActionTypes
          .LOAD_DEGREES_FROM_DB_on_PAGESHELL
      ),
      mergeMap(
        (
          action: degreeShellActions.LoadDegreesByProjectCreatorIDFromDB
        ) =>
          this.degreeService.readAll(Constants.userID).pipe(
            tap((payload) =>
              console.log('NGRX EFFECT - READ ALL DEGREES FROM DB')
            ),
            map((payload: Degree[]) => {
              // Delete all degrees
              this.degreeEntityDataStore.dispatch(
                degreeEntityDataActions.deleteDegrees({
                  ids: this.degreeDataIds,
                })
              );

              // ADD ALL DEGREES FROM THE BACKEND
              this.degreeEntityDataStore.dispatch(
                degreeEntityDataActions.addDegrees({
                  Degrees: payload,
                })
              );

              // SET CURRENT DEGREE
              this.degreeShellStore.dispatch(
                new degreeShellActions.SetOriginalDegreeFromDegreeEffects(
                  payload[0]
                )
              );
              this.degreeShellStore.dispatch(
                new degreeShellActions.SetCurrentDegreeFromDegreeEffects(
                  payload[0]
                )
              );

              // THROW SUCCESS ACTION
              return new degreeShellActions.LoadDegreesByProjectCreatorIDFromDBSuccess(
                payload
              );
            }),
            catchError((err) =>
              of(
                new degreeShellActions.LoadDegreesByProjectCreatorIDFromDBFail(
                  err
                )
              )
            )
          )
      )
    )
  );

  // SAVE DEGREE

  SaveNewDegree$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        degreeShellActions.DegreeActionTypes
          .SAVE_DEGREE_TO_DB_from_DegreeShellEdit
      ),
      mergeMap((action: degreeShellActions.SaveDegreeToDB) =>
        this.degreeService.createItem(this.currentDegree).pipe(

          tap((payload: Degree) =>
                console.log(
                  'NGRX EFFECT - SAVE DEGREE TO DB SUCCESSFUL: ',
                  payload
                )
              ),
              map((payload: Degree) => {
                // SAVE TO DATA
                this.degreeEntityDataStore.dispatch(
                  degreeEntityDataActions.addDegree({
                    Degree: payload,
                  })
                );

                return new degreeShellActions.SaveDegreeToDBSuccess(
                  payload
                );
              }),
              catchError((err) =>
                of(new degreeShellActions.SaveDegreeToDBFail(err))
              )
        )
      )
    )
  );
  // UPDATE DEGREE

  UpdateDegree$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        degreeShellActions.DegreeActionTypes
          .UPDATE_DEGREE_TO_DB_from_DegreeShellEdit
      ),
      mergeMap((action: degreeShellActions.UpdateDegreeToDB) =>
        this.degreeService.updateItem(this.currentDegree).pipe(
          tap((payload: Degree) =>
            console.log(
              'NGRX EFFECT - UPDATE DEGREE TO DB SUCCESSFUL: ',
              payload
            )
          ),
          map((payload: Degree) => {
            // CHANGE ENTITY DATA STORE
            this.degreeEntityDataStore.dispatch(
              degreeEntityDataActions.upsertDegree({
                Degree: payload,
              })
            );

            return new degreeShellActions.UpdateDegreeToDBSuccess(
              payload
            );
          }),
          catchError((err) =>
            of(new degreeShellActions.UpdateDegreeToDBFail(err))
          )
        )
      )
    )
  );
  // DELETE DEGREE

  DeleteDegree$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        degreeShellActions.DegreeActionTypes
          .DELETE_DEGREE_TO_DB_from_DegreeShellEdit
      ),
      mergeMap((action: degreeShellActions.DeleteDegreeToDB) =>
        this.degreeService
          .deleteItem(this.currentDegree?.id)
          .pipe(
            tap((payload: Degree) =>
              console.log('NGRX EFFECT - DELETED DEGREE: ', payload)
            ),

            map((payload: Degree) => {


              // CLEAR ENTITY DATA STORE Of CURRENT DEGREE AND SET NEW CURRENT DEGREE
              this.degreeEntityDataStore.dispatch(
                degreeEntityDataActions.deleteDegree({
                  id: payload.id,
                })
              );

              return new degreeShellActions.DeleteDegreeToDBSuccess(
                this.degreeData[0] as Degree
              );
            }),
            catchError((err) =>
              of(new degreeShellActions.DeleteDegreeToDBFail(err))
            )
          )
      )
    )
  );


}
