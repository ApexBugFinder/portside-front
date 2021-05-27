import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromExperienceData from './state/experience.reducer';

import * as fromExperienceShell from './experience-shell/state/experience-shell.reducer';
import * as fromRoot from '../state/app.state';

export interface ExperienceModuleState {
    experienceData: fromExperienceData.State,
    experienceShell: fromExperienceShell.ExperienceShellState
}

export interface State extends fromRoot.State {
    experienceModule: ExperienceModuleState
}

export const experienceReducers: ActionReducerMap<ExperienceModuleState, any> = {
    experienceData: fromExperienceData.reducer,
    experienceShell: fromExperienceShell.experienceReducer
}

export const selectExperienceModuleState = createFeatureSelector<ExperienceModuleState>('experienceState');


export const selectExperienceEntityDataState = createSelector(
    selectExperienceModuleState,
    (state: ExperienceModuleState) => state.experienceData
);

export const selectExperienceShellState = createSelector(
    selectExperienceModuleState,
    (state: ExperienceModuleState) => state.experienceShell

);
