import
* as fromRoot
 from '../../../../state/app.state';

 import * as fromDegreeData from './degree.reducer';
 import { selectDegreeEntityDataState } from '../../../state';
 import * as fromDegreeRoot from '../../../state';
import { createSelector } from '@ngrx/store';

 export interface DegreeDataState extends fromDegreeRoot.EducationModuleState {
   degreeData: fromDegreeData.State;
 }


 export const selectDegreeIds = createSelector(
   selectDegreeEntityDataState,
   (state) => state.ids
 );

 export const selectDegreeEntities = createSelector(
   selectDegreeEntityDataState,
   (state) => state.entities
 );

 export const selectAllDegrees = createSelector(
   selectDegreeEntityDataState,
   (state) => Object.values(state.entities)
 );

 export const selectDegreesTotal = createSelector(
   selectDegreeEntityDataState,
   (state) => Object.values(state.entities).length
 );

 export const selectCurrentDegreeId = createSelector(
   selectDegreeEntityDataState,
   (state) => state.selectedDegreeId
 );

 export const selectCurrentDegree = createSelector(
   selectDegreeEntities,
   selectCurrentDegreeId,
   (degreeEntities, degreeId) =>
     Object.values(degreeEntities).find((i) => i?.id == degreeId)
 );

 export const selectAll = createSelector(
   selectDegreeEntityDataState,
   (state) =>
     (state?.ids as Array<string | number>)?.map((id) => state?.entities[id])
 );
