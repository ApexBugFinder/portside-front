import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on, Action } from "@ngrx/store";
import { ProjectRequirement } from "src/app/project/models/projectRequirement";
import *  as projReqActions from './proj-reqs.actions';

export interface State extends EntityState<ProjectRequirement> {
  ids: string[];
  entities: { [key: string]: ProjectRequirement | undefined };
  selectedProjectRequirementId: string | "";
}

export function selectedProjectRequirementId(a: ProjectRequirement): string {
  return a.id as string;
}



export function sortByProjectRequirementId(a: ProjectRequirement, b: ProjectRequirement): number {
  if (a.id > b.id) {
    return 1;
  } else if (a.id < b.id) {
    return -1;
  } else {
    return 0;
  }
}
export const adapter: EntityAdapter<ProjectRequirement> = createEntityAdapter<ProjectRequirement>(
  {
    selectId: selectedProjectRequirementId,
    sortComparer: sortByProjectRequirementId,
  }
);

export const initialState: State = adapter.getInitialState({
  selectedProjectRequirementId: "",
  ids: [],
  entities: {},
});

const ProjectRequirementReducer = createReducer(
  initialState,
  on(projReqActions.addProjectRequirement, (state, { ProjectRequirement }) => {
    return adapter.addOne(ProjectRequirement, state);
  }),

  on(projReqActions.setProjectRequirement, (state, { ProjectRequirement }) => {
    return adapter.setOne(ProjectRequirement, state);
  }),
  on(projReqActions.upsertProjectRequirement, (state, { ProjectRequirement }) => {
    return adapter.upsertOne(ProjectRequirement, state);
  }),
  on(projReqActions.addProjectRequirements, (state, { ProjectRequirements }) => {
    return adapter.addMany(ProjectRequirements, state);
  }),
  on(projReqActions.upsertProjectRequirements, (state, { ProjectRequirements }) => {
    return adapter.upsertMany(ProjectRequirements, state);
  }),
  on(projReqActions.updateProjectRequirement, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),
  on(projReqActions.updateProjectRequirements, (state, { updates }) => {
    return adapter.updateMany(updates, state);
  }),
  on(projReqActions.mapProjectRequirement, (state, { entityMap }) => {
    return adapter.mapOne(entityMap, state);
  }),
  on(projReqActions.mapProjectRequirements, (state, { entityMap }) => {
    return adapter.map(entityMap, state);
  }),
  on(projReqActions.deleteProjectRequirement, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(projReqActions.deleteProjectRequirements, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(projReqActions.deleteProjectRequirementsByPredicate, (state, { predicate }) => {
    return adapter.removeMany(predicate, state);
  }),

  on(projReqActions.loadProjectRequirements, (state, { ProjectRequirements }) => {
    return adapter.setAll(ProjectRequirements, state);
  }),

  on(projReqActions.clearProjectRequirements, (state) => {
    return adapter.removeAll({ ...state, selectedProjectRequirementId: "" });
  })
);
export function reducer(state: State | undefined, action: Action) {
  return ProjectRequirementReducer(state, action);
}
