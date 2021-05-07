import * as fromEditProject from '../edit/state/edit-project.reducer';
import * as fromRoot from '../../state/app.state';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProjectModuleState {
    editProject: fromEditProject.EditProjectState
}

export interface State extends fromRoot.State {
    projectModule: ProjectModuleState
}

export const projectReducers: ActionReducerMap<ProjectModuleState, any> = {
    editProject: fromEditProject.editProjectReducer
};




export const selectProjectModuleState = createFeatureSelector<ProjectModuleState>('projectModule');

export const selectEditProjectState = createSelector (
    selectProjectModuleState,
    (state: ProjectModuleState) => state.editProject
)





