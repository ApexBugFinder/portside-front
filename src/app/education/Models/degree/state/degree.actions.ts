import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne, Predicate } from '@ngrx/entity';

import { Degree } from '../degree';

export const selectDegree = createAction(
  '[Degrees Page] Select Degree',
  props<{ DegreeId: string }>()
);
export const selectDegreesByProjectorCreatorID = createAction(
  '[Degrees Page] Select Degrees By DegreeCreator',
  props<{ DegreeCreatorID: string }>()
);

export const loadDegrees = createAction(
  '[Degree/API] Load Degrees',
  props<{ Degrees: Degree[] }>()
);
export const addDegree = createAction(
  '[Degree/API] Add Degree',
  props<{ Degree: Degree }>()
);
export const setDegree = createAction(
  '[Degree/API] Set Degree',
  props<{ Degree: Degree }>()
);
export const upsertDegree = createAction(
  '[Degree/API] Upsert Degree',
  props<{ Degree: Degree }>()
);
export const addDegrees = createAction(
  '[Degree/API] Add Degrees',
  props<{ Degrees: Degree[] }>()
);
export const upsertDegrees = createAction(
  '[Degree/API] Upsert Degrees',
  props<{ Degrees: Degree[] }>()
);
export const updateDegree = createAction(
  '[Degree/API] Update Degree',
  props<{ update: Update<Degree> }>()
);
export const updateDegrees = createAction(
  '[Degree/API] Update Degrees',
  props<{ updates: Update<Degree>[] }>()
);
export const mapDegree = createAction(
  '[Degree/API] Map Degree',
  props<{ entityMap: EntityMapOne<Degree> }>()
);
export const mapDegrees = createAction(
  '[Degree/API] Map Degrees',
  props<{ entityMap: EntityMap<Degree> }>()
);
export const deleteDegree = createAction(
  '[Degree/API] Delete Degree',
  props<{ id: string }>()
);
export const deleteDegrees = createAction(
  '[Degree/API] Delete Degrees',
  props<{ ids: string[] }>()
);
export const deleteDegreesByPredicate = createAction(
  '[Degree/API] Delete Degrees By Predicate',
  props<{ predicate: Predicate<Degree> }>()
);
export const clearDegrees = createAction(
  '[Degree/API] Clear Degrees'
);
