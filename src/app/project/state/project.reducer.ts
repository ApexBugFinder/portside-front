import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { defaultProject, Project }     from '../project';
import { Action, createReducer, on } from '@ngrx/store';
import * as ProjectActions from '../state/project.actions';


export interface State extends EntityState<Project> {
  
   ids: string[];
   entities: {[key: string]:Project | undefined};
  // additional state property
  selectedProjectId: string;

  
}
 
export function selectProjectId(a:Project): string {
    return a.id as string;
}
export function sortByDateStarted(a: Project, b: Project): number {
    let c = a.started as Date;
    if ((a.started as Date).getDate > (b.started as Date).getDate) {
         return 1;
    }else {
        return 0;
    }
}
export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>(
    {
        selectId: selectProjectId,
        
        // sortComparer: sortByDateStarted,
    }
);

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    selectedProjectId: '',
    ids: [],
    entities: {  }


  });
   
  const projectReducer = createReducer(
    initialState,
    on(ProjectActions.addProject, (state, { project }) => {
      return adapter.addOne(project, state)
    }),
    on(ProjectActions.setProject, (state, { project }) => {
      return adapter.setOne(project, state)
    }),
    on(ProjectActions.upsertProject, (state, { project }) => {
      return adapter.upsertOne(project, state);
    }),
    on(ProjectActions.addProjects, (state, { projects }) => {
      return adapter.addMany(projects, state);
    }),
    on(ProjectActions.upsertProjects, (state, { projects }) => {
      return adapter.upsertMany(projects, state);
    }),
    on(ProjectActions.updateProject, (state, { update }) => {
      return adapter.updateOne(update, state);
    }),
    on(ProjectActions.updateProjects, (state, { updates }) => {
      return adapter.updateMany(updates, state);
    }),
    on(ProjectActions.mapProject, (state, { entityMap }) => {
      return adapter.mapOne(entityMap, state);
    }),
    on(ProjectActions.mapProjects, (state, { entityMap }) => {
      return adapter.map(entityMap, state);
    }),
    on(ProjectActions.deleteProject, (state, { id }) => {
      return adapter.removeOne(id, state);
    }),
    on(ProjectActions.deleteProjects, (state, { ids }) => {
      return adapter.removeMany(ids, state);
    }),
    on(ProjectActions.deleteProjectsByPredicate, (state, { predicate }) => {
      return adapter.removeMany(predicate, state);
    }),
  
    on(ProjectActions.loadProjects, (state, { projects }) => {
      return adapter.setAll(projects,state);
    }),
    
    on(ProjectActions.clearProjects, state => {
      return adapter.removeAll({ ...state, selectedProjectId: '' });
    }),
 
    
  );
   
   
  export function reducer(state: State | undefined, action: Action) {
    return projectReducer(state, action);
  }

  export const getSelectedProjectId = (state: State) => state.selectedProjectId;
  export const getentities = (state: State) => Object.values(state.entities);

 export const selectAlld = (state: State) => {
   const allProjects = Object.values(state.entities);
   console.log(allProjects);
   return allProjects;
 }
// get the selectors
// const {
  
//   selectIds,
//   selectEntities,
//   selectAll,
//   selectTotal,
// } = adapter.getSelectors();
 
// select the array of project ids
// export const selectProjectIds = selectIds;
 
// // select the dictionary of project entities
// export const selectProjectEntities = selectEntities;
 
// // select the array of projects
// export const selectAllProjects = selectAll;
 
// // select the total project count
// export const selectProjectTotal = selectTotal;

