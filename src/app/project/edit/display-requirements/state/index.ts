import * as fromRoot from '../../../../state/app.state';
import * as fromProjReqs from './proj-reqs.reducer';
import {createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProject from '../../state'
import {ProjectModuleState, selectProjectModuleState} from '../../../state/'
import * as fromProjectRoot from '../../../state/'
import { state } from '@angular/animations';

export interface ProjectRequirementState extends fromRoot.State {
    projectReqs: fromProjReqs.State;

}

const getProjectReqFeatureState = createFeatureSelector<fromProjReqs.State>('projReqs');


export const selectProjReqState = createSelector(
    selectProjectModuleState,
    (state: ProjectModuleState) => state.projReqs
);

export const selectProjectRequirementIds = createSelector(
selectProjReqState,
  (state) => state.ids
);

export const selectProjectRequirementEntities = createSelector(
  selectProjReqState,
  (state) => state.entities
);

export const selectAllProjectRequirements = createSelector(
  selectProjReqState,
  (state) => Object.values(state.entities)
);

export const selectProjectRequirementsTotal = createSelector(
  selectProjReqState,
  (state) => Object.values(state.entities).length
);

export const selectCurrentProjectRequirementId = createSelector(
  selectProjReqState,
  (state) => state.selectedProjectRequirementId
);

export const selectCurrentProjectRequirement = createSelector(
  selectProjectRequirementEntities,
  selectCurrentProjectRequirementId,
  (ProjectRequirementEntities, ProjectRequirementId) =>
    Object.values(ProjectRequirementEntities).find((i) => i?.id == ProjectRequirementId)
);

export const selectAll = createSelector(
  selectProjReqState,
  (state) =>
    (state?.ids as Array<string | number>)?.map((id) => state?.entities[id])
);

