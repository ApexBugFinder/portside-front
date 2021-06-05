import * as fromRoot from '../../../state/app.state';
import * as fromEditProject from './edit-project.reducer';
import {createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProject from '../../state'
import {ProjectModuleState, selectProjectModuleState} from '../../state'


export interface EditProjectState extends fromRoot.State {
    editProject: fromEditProject.EditProjectState;

}

const getEditProjectFeatureState = createFeatureSelector<fromEditProject.EditProjectState>('editProject');

export const getOriginalProject = createSelector(
    selectProjectModuleState,
    state => state.editProject.originalProject
);

export const getEditProjectId = createSelector (
    selectProjectModuleState,
    state => state.editProject.id
);

export const getEditProjectProjectCreatorID = createSelector (
    selectProjectModuleState,
    state => state.editProject.projectCreatorID
);

export const getEditProjectProjectName = createSelector (
    selectProjectModuleState,
    state => state.editProject.projectName
)
export const getEditProjectStartDate = createSelector (
    selectProjectModuleState,
    state => state.editProject.started
);

export const getEditProjectCompleteDate = createSelector (
    selectProjectModuleState,
    state => state.editProject.completed
);
export const getEditProjectDescription = createSelector (
    selectProjectModuleState,
    state => state.editProject.description
);
export const getEditProjectBigBanner = createSelector (
    selectProjectModuleState,
    state => state.editProject.banner
);
export const getEditProjectSmallBanner = createSelector (
    selectProjectModuleState,
    state => state.editProject.smallBanner
);
export const getEditProjectIsPublished = createSelector (
    selectProjectModuleState,
    state => state.editProject.published
);
export const getEditProjectProjectRequirements = createSelector (
    selectProjectModuleState,
    state => state.editProject.projectRequirements
);
export const getEditProjectProjectLinks = createSelector (
    selectProjectModuleState,
    state => state.editProject.projectLinks
);

export const getEditProject = createSelector (
    selectProjectModuleState,
    state => {
     return {   
        id: state.editProject.id,
        projectCreatorID: state.editProject.projectCreatorID,
        projectName: state.editProject.projectName,
        description: state.editProject.description,
        started: state.editProject.started,
        completed: state.editProject.completed,
        banner: state.editProject.banner,
        smallBanner: state.editProject.smallBanner,
        published: state.editProject.published,
        projectLinks: state.editProject.projectLinks,
        projectRequirements: state.editProject.projectRequirements
     }
    } 
);
