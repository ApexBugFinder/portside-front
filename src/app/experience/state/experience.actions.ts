import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne, Predicate } from '@ngrx/entity';


import { Experience } from '../Models/experience';

export const selectExperience = createAction('[Experiences Page] Select Experience', props<{ experienceId: string }>());
export const selectExperiencesByExperienceCreatorID = createAction('[Experiences Page] Select Experiences By ExperienceCreator', props<{ experienceCreatorID: string }>());

export const loadExperiences = createAction('[Experience/API] Load Experiences', props<{ experiences: Experience[] }>());
export const addExperience = createAction('[Experience/API] Add Experience', props<{ experience: Experience }>());
export const setExperience = createAction('[Experience/API] Set Experience', props<{ experience: Experience }>());
export const upsertExperience = createAction('[Experience/API] Upsert Experience', props<{ experience: Experience }>());
export const addExperiences = createAction('[Experience/API] Add Experiences', props<{ experiences: Experience[] }>());
export const upsertExperiences = createAction('[Experience/API] Upsert Experiences', props<{ experiences: Experience[] }>());
export const updateExperience = createAction('[Experience/API] Update Experience', props<{ update: Update<Experience> }>());
export const updateExperiences = createAction('[Experience/API] Update Experiences', props<{ updates: Update<Experience>[] }>());
export const mapExperience = createAction('[Experience/API] Map Experience', props<{ entityMap: EntityMapOne<Experience> }>());
export const mapExperiences = createAction('[Experience/API] Map Experiences', props<{ entityMap: EntityMap<Experience> }>());
export const deleteExperience = createAction('[Experience/API] Delete Experience', props<{ id: string}>());
export const deleteExperiences = createAction('[Experience/API] Delete Experiences', props<{ ids: string[] }>());
export const deleteExperiencesByPredicate = createAction('[Experience/API] Delete Experiences By Predicate', props<{ predicate: Predicate<Experience> }>());
export const clearExperiences = createAction('[Experience/API] Clear Experiences');




// EFFECT ACTION

