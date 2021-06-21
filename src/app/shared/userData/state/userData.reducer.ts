import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, createSelector, on } from '@ngrx/store';
import * as searchBarResultsActions from './userData.actions';
// MODELS
import { UserState }  from '../../../user/Models/user';

export interface State extends EntityState<UserState> {
  ids: string[];
  entities: { [key: string]: UserState | undefined };
  selectedUserId: string |  '';
}

export function selectedUserId(a: UserState): string {
  return a.id as string;
}


export function sortByUserName(a: UserState, b: UserState): number {
 
  if ( a.username > b.username) {
    return 1;
  } else if (a.username < b.username) {
    return -1;
  } else {
    return 0;
  }
}

export function sortByUserId(a: UserState, b: UserState): number {
  
   if (a.id > b.id) {
     return 1;
   } else if (a.id < b.id) {
     return -1;
   } else {
     return 0;
   }
}
export const adapter: EntityAdapter<UserState> =
  createEntityAdapter<UserState>({
    selectId: selectedUserId,
    sortComparer: sortByUserName
  });


  export const initialState: State = adapter.getInitialState({
    selectedUserId: '',
    ids: [],
    entities: {},
  });

  const userReducer = createReducer(
    initialState,
    on(searchBarResultsActions.addUser, (state, { UserState }) => {
      return adapter.addOne(UserState, state);
    }),

    on(searchBarResultsActions.setUser, (state, { UserState }) => {
      return adapter.setOne(UserState, state);
    }),
    on(searchBarResultsActions.upsertUser, (state, { UserState }) => {
      return adapter.upsertOne(UserState, state);
    }),
    on(searchBarResultsActions.addUsers, (state, { Users }) => {
      return adapter.addMany(Users, state);
    }),
    on(searchBarResultsActions.upsertUsers, (state, { Users }) => {
      return adapter.upsertMany(Users, state);
    }),
    on(searchBarResultsActions.updateUser, (state, { update }) => {
      return adapter.updateOne(update, state);
    }),
    on(searchBarResultsActions.updateUsers, (state, { updates }) => {
      return adapter.updateMany(updates, state);
    }),
    on(searchBarResultsActions.mapUser, (state, { entityMap }) => {
      return adapter.mapOne(entityMap, state);
    }),
    on(searchBarResultsActions.mapUsers, (state, { entityMap }) => {
      return adapter.map(entityMap, state);
    }),
    on(searchBarResultsActions.deleteUser, (state, { id }) => {
      return adapter.removeOne(id, state);
    }),
    on(searchBarResultsActions.deleteUsers, (state, { ids }) => {
      return adapter.removeMany(ids, state);
    }),
    on(
      searchBarResultsActions.deleteUsersByPredicate,
      (state, { predicate }) => {
        return adapter.removeMany(predicate, state);
      }
    ),
    
    on(searchBarResultsActions.loadUsers, (state, { Users }) => {
      return adapter.setAll(Users, state);
    }),

    on(searchBarResultsActions.clearUsers, (state) => {
      return adapter.removeAll({ ...state, selectedUserId: '' });
    })
  );
  export function reducer(state: State | undefined, action: Action) {
    return userReducer(state, action);
  }
