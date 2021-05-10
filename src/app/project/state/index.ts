import * as fromEditProject from '../edit/state/edit-project.reducer';
import * as fromRoot from '../../state/app.state';
import * as fromProject from '../state/project.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProjectModuleState {
    editProject: fromEditProject.EditProjectState;
    projects: fromProject.State;


}

export interface State extends fromRoot.State {
    projectModule: ProjectModuleState
    
}

export const projectReducers: ActionReducerMap<ProjectModuleState, any> = {
    editProject: fromEditProject.editProjectReducer,
    projects: fromProject.reducer
};




export const selectProjectModuleState = createFeatureSelector<ProjectModuleState>('projects');

export const selectEditProjectState = createSelector (
    selectProjectModuleState,
    (state: ProjectModuleState) => state.editProject
);

export const selectProjectStateFromMod = createSelector (
  selectProjectModuleState,
  (state: ProjectModuleState) => state.projects
)


export const selectProjectIds = createSelector(
    selectProjectStateFromMod,
    (state) => state.ids // shorthand for projectsState => fromProject.selectProjectIds(projectsState)
  );
  export const selectProjectEntities = createSelector(
    selectProjectStateFromMod,
    (state) => state.entities
  );
  export const selectAllProjects = createSelector(
    selectProjectStateFromMod,
    state => {
      
      // const allProjects = Object.values(state.entities);
      return Object.values(state.entities);
    }
  );
  
  export const selectProjectTotal = createSelector(
    selectProjectStateFromMod,
    (state) => {
      return Object.values(state?.entities).length;
    }
  );
  export const selectCurrentProjectId = createSelector(
    selectProjectStateFromMod,
    (state) => {
      return state.selectedProjectId;
    }
  );
   
  export const selectCurrentProject = createSelector(
    selectProjectEntities,
    selectCurrentProjectId,
    (projectEntities, projectId) => projectEntities[projectId]
  );


  export const selectAll = createSelector(selectProjectStateFromMod, (state) => (state?.ids as Array<string|number>)?.map(id => state?.entities[id]));


  // export const selectIds = createSelector(
  //   selectProjectState,
  //   (state: State) => state?.ids);
  // )