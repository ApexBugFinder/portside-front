import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne, Predicate } from '@ngrx/entity';

import { User } from '../../Models/user';

export const selectUser = createAction(
  '[Users Page] Select User',
  props<{ UserId: string }>()
);
export const selectUsersByProjectorCreatorID = createAction(
  '[Users Page] Select Users By UserCreator',
  props<{ userID: string }>()
);

export const loadUsers = createAction(
  '[User/API] Load Users',
  props<{ Users: User[] }>()
);
export const addUser = createAction(
  '[User/API] Add User',
  props<{ User: User }>()
);
export const setUser = createAction(
  '[User/API] Set User',
  props<{ User: User }>()
);
export const upsertUser = createAction(
  '[User/API] Upsert User',
  props<{ User: User }>()
);
export const addUsers = createAction(
  '[User/API] Add Users',
  props<{ Users: User[] }>()
);
export const upsertUsers = createAction(
  '[User/API] Upsert Users',
  props<{ Users: User[] }>()
);
export const updateUser = createAction(
  '[User/API] Update User',
  props<{ update: Update<User> }>()
);
export const updateUsers = createAction(
  '[User/API] Update Users',
  props<{ updates: Update<User>[] }>()
);
export const mapUser = createAction(
  '[User/API] Map User',
  props<{ entityMap: EntityMapOne<User> }>()
);
export const mapUsers = createAction(
  '[User/API] Map Users',
  props<{ entityMap: EntityMap<User> }>()
);
export const deleteUser = createAction(
  '[User/API] Delete User',
  props<{ id: string }>()
);
export const deleteUsers = createAction(
  '[User/API] Delete Users',
  props<{ ids: string[] }>()
);
export const deleteUsersByPredicate = createAction(
  '[User/API] Delete Users By Predicate',
  props<{ predicate: Predicate<User> }>()
);
export const clearUsers = createAction(
  '[User/API] Clear Users'
);