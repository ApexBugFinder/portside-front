import
* as fromRoot
 from '../../../../state/app.state';

 import * as fromCertificationData from './cerfication.reducer';
 import { selectCertificationEntityDataState } from '../../../state';
 import * as fromEducationRoot from '../../../state';
import { createSelector } from '@ngrx/store';

 export interface CertificationDataState extends fromEducationRoot.EducationModuleState {
  certData: fromCertificationData.State;
 }


 export const selectCertificationIds = createSelector(
   selectCertificationEntityDataState,
   (state) => state.ids
 );

 export const selectCertificationEntities = createSelector(
   selectCertificationEntityDataState,
   (state) => state.entities
 );

 export const selectAllCertifications = createSelector(
   selectCertificationEntityDataState,
   (state) => Object.values(state.entities)
 );

 export const selectCertificationsTotal = createSelector(
   selectCertificationEntityDataState,
   (state) => Object.values(state.entities).length
 );

 export const selectCurrentCertificationId = createSelector(
   selectCertificationEntityDataState,
   (state) => state.selectedCertificationId
 );

 export const selectCurrentCertification = createSelector(
   selectCertificationEntities,
   selectCurrentCertificationId,
   (certificationEntities, certificationId) =>
     Object.values(certificationEntities).find((i) => i?.id == certificationId)
 );

 export const selectAll = createSelector(
   selectCertificationEntityDataState,
   (state) =>
     (state?.ids as Array<string | number>)?.map((id) => state?.entities[id])
 );
