import * as fromRoot from '../../../state/app.state';
import * as fromEditProject from './edit-project.reducer';
import {createFeatureSelector, createSelector } from '@ngrx/store';



export interface EditProjectState extends fromRoot.State {
    editProject: fromEditProject.EditProjectState;

}

const getEditProjectFeatureState = createFeatureSelector<fromEditProject.EditProjectState>('editProject');

export const getOriginalProject = createSelector(
    getEditProjectFeatureState,
    state => state.originalProject
);

export const getEditProjectId = createSelector (
    getEditProjectFeatureState,
    state => state.id
);

export const getEditProjectProjectCreatorID = createSelector (
    getEditProjectFeatureState,
    state => state.projectCreatorID
);

export const getEditProjectProjectName = createSelector (
    getEditProjectFeatureState,
    state => state.projectName
)
export const getEditProjectStartDate = createSelector (
    getEditProjectFeatureState,
    state => state.started
);

export const getEditProjectCompleteDate = createSelector (
    getEditProjectFeatureState,
    state => state.completed
);
export const getEditProjectDescription = createSelector (
    getEditProjectFeatureState,
    state => state.description
);
export const getEditProjectBigBanner = createSelector (
    getEditProjectFeatureState,
    state => state.banner
);
export const getEditProjectSmallBanner = createSelector (
    getEditProjectFeatureState,
    state => state.smallBanner
);
export const getEditProjectIsPublished = createSelector (
    getEditProjectFeatureState,
    state => state.published
);
export const getEditProjectProjectRequirements = createSelector (
    getEditProjectFeatureState,
    state => state.projectRequirements
);
export const getEditProjectProjectLinks = createSelector (
    getEditProjectFeatureState,
    state => state.projectLinks
);

export const getEditProject = createSelector (
    getEditProjectFeatureState,
    state => {
        state.id,
        state.projectCreatorID,
        state.projectName,
        state.description,
        state.started,
        state.completed,
        state.banner,
        state.smallBanner,
        state.published,
        state.projectLinks,
        state.projectRequirements
        
    } 
);
