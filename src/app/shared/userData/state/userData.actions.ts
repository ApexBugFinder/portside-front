import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne, Predicate } from '@ngrx/entity';

import { UserState } from '../../../user/Models/user';

export const selectUser = createAction(
  '[Users Page] Select UserState',
  props<{ UserId: string }>()
);
export const selectUsersByProjectorCreatorID = createAction(
  '[Users Page] Select Users By UserCreator',
  props<{ userID: string }>()
);

export const loadUsers = createAction(
  '[UserState/API] Load Users',
  props<{ Users: UserState[] }>()
);
export const addUser = createAction(
  '[UserState/API] Add UserState',
  props<{ UserState: UserState }>()
);
export const setUser = createAction(
  '[UserState/API] Set UserState',
  props<{ UserState: UserState }>()
);
export const upsertUser = createAction(
  '[UserState/API] Upsert UserState',
  props<{ UserState: UserState }>()
);
export const addUsers = createAction(
  '[UserState/API] Add Users',
  props<{ Users: UserState[] }>()
);
export const upsertUsers = createAction(
  '[UserState/API] Upsert Users',
  props<{ Users: UserState[] }>()
);
export const updateUser = createAction(
  '[UserState/API] Update UserState',
  props<{ update: Update<UserState> }>()
);
export const updateUsers = createAction(
  '[UserState/API] Update Users',
  props<{ updates: Update<UserState>[] }>()
);
export const mapUser = createAction(
  '[UserState/API] Map UserState',
  props<{ entityMap: EntityMapOne<UserState> }>()
);
export const mapUsers = createAction(
  '[UserState/API] Map Users',
  props<{ entityMap: EntityMap<UserState> }>()
);
export const deleteUser = createAction(
  '[UserState/API] Delete UserState',
  props<{ id: string }>()
);
export const deleteUsers = createAction(
  '[UserState/API] Delete Users',
  props<{ ids: string[] }>()
);
export const deleteUsersByPredicate = createAction(
  '[UserState/API] Delete Users By Predicate',
  props<{ predicate: Predicate<UserState> }>()
);
export const clearUsers = createAction(
  '[UserState/API] Clear Users'
);