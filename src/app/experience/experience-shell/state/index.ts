import { createSelector } from '@ngrx/store';
import { selectExperienceModuleState, selectExperienceShellState } from '../..';
import * as fromRoot from '../../../state/app.state';
import * as fromExperienceShell from './experience-shell.reducer';
import * as fromExperiencesRoot from '../../index';


export interface ExperienceShellState extends fromExperiencesRoot.ExperienceModuleState{
    experienceShell: fromExperienceShell.ExperienceShellState;
}

export const getOrginalExperience = createSelector(
    selectExperienceShellState,
    state => state.originalExperience
);



export const getCurrentExperience = createSelector(
    selectExperienceShellState,
    state => {
        return {
            id: state.id,
            projectCreatorID: state.projectCreatorID,
            company: state.company,
            title: state.title as string,
            logoUrl: state.logoUrl as string,
            started: state.started as Date,
            completed: state.completed as Date,
            city: state.city,
            state: state.state,
            roles: state.roles,
        };
    }
);

export const getCurrentExperienceId = createSelector(
    selectExperienceShellState,
    state => state.id
);

export const getCurrentExperienceProjectCreator = createSelector(
    selectExperienceShellState,
    state => state.projectCreatorID
);

export const getCurrentExperienceCompany = createSelector(
    selectExperienceShellState,
    state => state.company
);

export const getCurrentExperienceTitle = createSelector(
    selectExperienceShellState,
    state => state.title
);

export const getCurrentExperienceLogoUrl = createSelector(
    selectExperienceShellState,
    state => state.logoUrl
);

export const getCurrentExperienceStartDate = createSelector(
    selectExperienceShellState,
    state => state.started
);

export const getCurrentExperienceCompleteDate = createSelector(
    selectExperienceShellState,
    state => state.completed
);

export const getCurrentExperienceCity = createSelector(
    selectExperienceShellState,
    state => state.city
);

export const getCurrentExperienceState = createSelector(
    selectExperienceShellState,
    state => state.state
);

export const getCurrentExperienceRoles = createSelector(
    selectExperienceShellState,
    state => state.roles
);