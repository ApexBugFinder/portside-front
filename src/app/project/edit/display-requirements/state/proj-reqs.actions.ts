import { createAction, props } from "@ngrx/store";
import { Update, EntityMap, EntityMapOne, Predicate } from "@ngrx/entity";

import { ProjectRequirement } from '../../../models/projectRequirement';

export const selectProjectRequirement = createAction(
  "[ProjectRequirements Page] Select ProjectRequirements",
  props<{ ProjectRequirementId: string }>()
);
export const selectProjectRequirementsByProjectorCreatorID = createAction(
  "[ProjectRequirements Page] Select ProjectRequirements By ProjectRequirementCreator",
  props<{ ProjectRequirementID: string }>()
);

export const loadProjectRequirements = createAction(
  "[ProjectRequirement/API] Load ProjectRequirements",
  props<{ ProjectRequirements: ProjectRequirement[] }>()
);
export const addProjectRequirement = createAction(
  "[ProjectRequirement/API] Add ProjectRequirement",
  props<{ ProjectRequirement: ProjectRequirement }>()
);
export const setProjectRequirement = createAction(
  "[ProjectRequirement/API] Set ProjectRequirement",
  props<{ ProjectRequirement: ProjectRequirement }>()
);
export const upsertProjectRequirement = createAction(
  "[ProjectRequirement/API] Upsert ProjectRequirement",
  props<{ ProjectRequirement: ProjectRequirement }>()
);
export const addProjectRequirements = createAction(
  "[ProjectRequirement/API] Add ProjectRequirements",
  props<{ ProjectRequirements: ProjectRequirement[] }>()
);
export const upsertProjectRequirements = createAction(
  "[ProjectRequirement/API] Upsert ProjectRequirements",
  props<{ ProjectRequirements: ProjectRequirement[] }>()
);
export const updateProjectRequirement = createAction(
  "[ProjectRequirement/API] Update ProjectRequirement",
  props<{ update: Update<ProjectRequirement> }>()
);
export const updateProjectRequirements = createAction(
  "[ProjectRequirement/API] Update ProjectRequirements",
  props<{ updates: Update<ProjectRequirement>[] }>()
);
export const mapProjectRequirement = createAction(
  "[ProjectRequirement/API] Map ProjectRequirement",
  props<{ entityMap: EntityMapOne<ProjectRequirement> }>()
);
export const mapProjectRequirements = createAction(
  "[ProjectRequirement/API] Map ProjectRequirements",
  props<{ entityMap: EntityMap<ProjectRequirement> }>()
);
export const deleteProjectRequirement = createAction(
  "[ProjectRequirement/API] Delete ProjectRequirement",
  props<{ id: string }>()
);
export const deleteProjectRequirements = createAction(
  "[ProjectRequirement/API] Delete ProjectRequirements",
  props<{ ids: string[] }>()
);
export const deleteProjectRequirementsByPredicate = createAction(
  "[ProjectRequirement/API] Delete ProjectRequirements By Predicate",
  props<{ predicate: Predicate<ProjectRequirement> }>()
);
export const clearProjectRequirements = createAction("[ProjectRequirement/API] Clear ProjectRequirements");
