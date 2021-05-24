import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne, Predicate } from '@ngrx/entity';


import { Project } from '../models/project';

export const selectProject = createAction('[Projects Page] Select Project', props<{ projectId: string }>());
export const selectProjectsByProjectCreatorID = createAction('[Projects Page] Select Projects By ProjectCreator', props<{ projectCreatorID: string }>());

export const loadProjects = createAction('[Project/API] Load Projects', props<{ projects: Project[] }>());
export const addProject = createAction('[Project/API] Add Project', props<{ project: Project }>());
export const setProject = createAction('[Project/API] Set Project', props<{ project: Project }>());
export const upsertProject = createAction('[Project/API] Upsert Project', props<{ project: Project }>());
export const addProjects = createAction('[Project/API] Add Projects', props<{ projects: Project[] }>());
export const upsertProjects = createAction('[Project/API] Upsert Projects', props<{ projects: Project[] }>());
export const updateProject = createAction('[Project/API] Update Project', props<{ update: Update<Project> }>());
export const updateProjects = createAction('[Project/API] Update Projects', props<{ updates: Update<Project>[] }>());
export const mapProject = createAction('[Project/API] Map Project', props<{ entityMap: EntityMapOne<Project> }>());
export const mapProjects = createAction('[Project/API] Map Projects', props<{ entityMap: EntityMap<Project> }>());
export const deleteProject = createAction('[Project/API] Delete Project', props<{ id: string }>());
export const deleteProjects = createAction('[Project/API] Delete Projects', props<{ ids: string[] }>());
export const deleteProjectsByPredicate = createAction('[Project/API] Delete Projects By Predicate', props<{ predicate: Predicate<Project> }>());
export const clearProjects = createAction('[Project/API] Clear Projects');


// EFFECT ACTIONS



// REGULAR ACTIONs
