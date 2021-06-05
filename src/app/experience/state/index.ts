import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExperienceModuleState } from '..';
import * as fromRoot from '../../state/app.state';
import * as fromExperienceData from './experience.reducer';
import {  selectExperienceEntityDataState } from '../index';
import { selectCurrentProjectId } from 'src/app/project/state';
import * as fromExperienceRoot from '../index';



// SELECTors

export interface ExperienceDataState extends fromExperienceRoot.ExperienceModuleState {
    experienceData: fromExperienceData.State;
}

export const selectExperienceIds = createSelector(
    selectExperienceEntityDataState,
    (state) => state.ids
);



export const selectExperienceEntities = createSelector(
    selectExperienceEntityDataState,
    (state) => state.entities
);

export const selectAllExperiences = createSelector(
    selectExperienceEntityDataState,
    (state) => Object.values(state.entities)
);

export const selectExperiencesTotal = createSelector (
    selectExperienceEntityDataState,
    (state) => Object.values(state.entities).length
);

export const selectCurrentExperienceId = createSelector(
    selectExperienceEntityDataState,
    (state) => state.selectedExperienceId
);

export const selectCurrentExperience = createSelector(
    selectExperienceEntities,
    selectCurrentExperienceId,
    (experienceEntities, experienceId) => Object.values(experienceEntities).find(i=> i?.id == experienceId)
);

export const selectAll = createSelector(
    selectExperienceEntityDataState,
    (state) =>  (state?.ids as Array<string|number>)?.map(id => state?.entities[id])
);
