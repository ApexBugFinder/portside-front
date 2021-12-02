import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as certificationShellActions from './certification-shell.actions';
import * as fromCertificationShell from '.';

import * as certificationEntityDataActions from '../../Models/certification/state/certification.actions';
import * as fromCertificationEntityData from '../../Models/certification/state';

import { merge, Observable, of } from 'rxjs';
import { Certification } from '../../Models/certification/certification';
import { CertService } from '../../Models/certification/cert.service';
import { Constants } from '../../../helpers/Constants';

@Injectable()
export class CertificationShellEffects {
  currentCertification$: Observable<Certification>;
  currentCertification: Certification;

  certificationData$: Observable<(Certification | undefined)[]>;
  certificationData: (Certification | undefined)[];
  certificationDataIds$: Observable<string[]>;
  certificationDataIds: string[];

  constructor(
    private actions$: Actions,
    private certificationShellStore: Store<fromCertificationShell.CertificationShellState>,
    private certificationEntityDataStore: Store<fromCertificationEntityData.CertificationDataState>,
    private certificationService: CertService
  ) {
    this.certificationData$ = this.certificationEntityDataStore.pipe(
      select(fromCertificationEntityData.selectAllCertifications)
    );
    this.certificationData$.subscribe((i: (Certification | undefined)[]) => {
      this.certificationData = i;
    });
    this.currentCertification$ = this.certificationShellStore.pipe(
      select(fromCertificationShell.getCurrentCertification)
    );
    this.currentCertification$.subscribe(
      (value) => (this.currentCertification = value)
    );
    this.certificationDataIds$ = this.certificationEntityDataStore.pipe(
      select(fromCertificationEntityData.selectCertificationIds)
    );
    this.certificationDataIds$.subscribe(
      (value) => (this.certificationDataIds = value)
    );
  }

  // LOAD CERTIFICATIONS TO ADAPTER
  LoadCertifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        certificationShellActions.CertificationActionTypes
          .LOAD_CERTIFICATIONS_FROM_DB_on_PAGESHELL
      ),
      mergeMap(
        (
          action: certificationShellActions.LoadCertificationsByProjectCreatorIDFromDB
        ) =>
          this.certificationService.readAll().pipe(
            tap((payload) =>
              console.log('NGRX EFFECT - READ ALL CERTIFICATIONS FROM DB')
            ),
            map((payload: Certification[]) => {
              // Delete all certifications
              this.certificationEntityDataStore.dispatch(
                certificationEntityDataActions.deleteCertifications({
                  ids: this.certificationDataIds,
                })
              );

              // ADD ALL CERTIFICATIONS FROM THE BACKEND
              this.certificationEntityDataStore.dispatch(
                certificationEntityDataActions.addCertifications({
                  Certifications: payload,
                })
              );

              // SET CURRENT CERTIFICATION
              this.certificationShellStore.dispatch(
                new certificationShellActions.SetOriginalCertificationFromCertEffects(
                  payload[0]
                )
              );
              this.certificationShellStore.dispatch(
                new certificationShellActions.SetCurrentCertificationFromCertEffects(
                  payload[0]
                )
              );

              // THROW SUCCESS ACTION
              return new certificationShellActions.LoadCertificationsByProjectCreatorIDFromDBSuccess(
                payload
              );
            }),
            catchError((err) =>
              of(
                new certificationShellActions.LoadCertificationsByProjectCreatorIDFromDBFail(
                  err
                )
              )
            )
          )
      )
    )
  );

  // SAVE CERTIFICATION

  SaveNewCertification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        certificationShellActions.CertificationActionTypes
          .SAVE_CERTIFICATION_TO_DB_from_CertShellEdit
      ),
      mergeMap((action: certificationShellActions.SaveCertificationToDB) =>
        this.certificationService.createItem(action.payload).pipe(

          tap((payload: Certification) =>
                console.log(
                  'NGRX EFFECT - SAVE CERTIFICATION TO DB SUCCESSFUL: ',
                  payload
                )
              ),
              map((payload: Certification) => {
                // SAVE TO DATA
                this.certificationEntityDataStore.dispatch(
                  certificationEntityDataActions.addCertification({
                    Certification: payload,
                  })
                );

                return new certificationShellActions.SaveCertificationToDBSuccess(
                  payload
                );
              }),
              catchError((err) =>
                of(new certificationShellActions.SaveCertificationToDBFail(err))
              )
        )
      )
    )
  );
  // UPDATE CERTIFICATION

  UpdateCertification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        certificationShellActions.CertificationActionTypes
          .UPDATE_CERTIFICATION_TO_DB_from_CertShellEdit
      ), tap(i => console.log('current Cert in CertEffects: ', this.currentCertification)),
      mergeMap((action: certificationShellActions.UpdateCertificationToDB) =>

        this.certificationService.updateItem(this.currentCertification).pipe(
          tap((payload: Certification) =>
            console.log(
              'NGRX EFFECT - UPDATE CERTIFICATION TO DB SUCCESSFUL: ',
              payload
            )
          ),
          map((payload: Certification) => {
            // CHANGE ENTITY DATA STORE

            this.certificationEntityDataStore.dispatch(
              certificationEntityDataActions.upsertCertification({
                Certification: payload,
              })
            );
              console.log('update return payload: ', payload);
            return new certificationShellActions.UpdateCertificationToDBSuccess(
              payload
            );
          }),
          catchError((err) =>
            of(new certificationShellActions.UpdateCertificationToDBFail(err))
          )
        )
      )
    )
  );
  // DELETE CERTIFICATION

  DeleteCertification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        certificationShellActions.CertificationActionTypes
          .DELETE_CERTIFICATION_TO_DB_from_CertShellEdit
      ),
      mergeMap((action: certificationShellActions.DeleteCertificationToDB) =>
        this.certificationService
          .deleteItem(this.currentCertification?.id)
          .pipe(
            tap((payload: Certification) =>
              console.log('NGRX EFFECT - DELETED CERTIFICATION: ', payload)
            ),

            map((payload: Certification) => {


              // CLEAR ENTITY DATA STORE Of CURRENT CERTIFICATION AND SET NEW CURRENT CERTIFICATION
              this.certificationEntityDataStore.dispatch(
                certificationEntityDataActions.deleteCertification({
                  id: payload.id,
                })
              );

              return new certificationShellActions.DeleteCertificationToDBSuccess(
                this.certificationData[0] as Certification
              );
            }),
            catchError((err) =>
              of(new certificationShellActions.DeleteCertificationToDBFail(err))
            )
          )
      )
    )
  );


}
