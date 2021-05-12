import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ExperienceModule } from './experience.module';
import * as fromExperienceData from './state/experience.reducer';
import * as fromExperienceShell from './experience-shell/state/experience-shell.reducer';
export interface ExperienceModuleState {
    experienceData: fromExperienceData.State,
    experienceShell: fromExperienceShell.ExperienceShellState
}


export const experienceReducers: ActionReducerMap<ExperienceModuleState, any> = {
    experienceData: fromExperienceData.reducer,
    experienceShell: fromExperienceShell.experienceReducer
}

export const selectExperienceModuleState = createFeatureSelector<ExperienceModuleState>('experiences');


export const selectExperienceEntityDataState = createSelector(
    selectExperienceModuleState,
    (state: ExperienceModuleState) => state.experienceData
);

export const selectExperienceShellState = createSelector(
    selectExperienceModuleState,
    (state: ExperienceModuleState) => state.experienceShell

);