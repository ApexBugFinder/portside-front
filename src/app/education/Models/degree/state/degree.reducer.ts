import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, createSelector, on } from '@ngrx/store';
import * as DegreeActions from './degree.actions';
// MODELS
import { Degree }  from '../degree';

export interface State extends EntityState<Degree> {
  ids: string[];
  entities: { [key: string]: Degree | undefined };
  selectedDegreeId: string | '';
}

export function selectedDegreeId(a: Degree): string {
  return a.id as string;
}


export function sortByDateStarted(a: Degree, b: Degree): number {
  let compare =
    (a.graduationYear?.valueOf() as number) - (b.graduationYear?.valueOf() as number);
  if (compare > 1) {
    return 1;
  } else if (compare < 1) {
    return -1;
  } else {
    return 0;
  }
}
export function sortByName(a: Degree, b: Degree): number {
  let compare = a.degreeName.localeCompare(b.degreeName);
  if (compare > 1) {
    return 1;
  } else if (compare < 1) {
    return -1;
  } else {
    return 0;
  }
}

export const adapter: EntityAdapter<Degree> =
  createEntityAdapter<Degree>({
    selectId: selectedDegreeId,
    sortComparer: sortByName,
  });


  export const initialState: State = adapter.getInitialState({
    selectedDegreeId: '',
    ids: [],
    entities: {},
  });

  const degreeReducer = createReducer(
    initialState,
    on(DegreeActions.addDegree, (state, { Degree }) => {
      return adapter.addOne(Degree, state);
    }),
    on(DegreeActions.setDegree, (state, { Degree }) => {
      return adapter.setOne(Degree, state);
    }),
    on(DegreeActions.upsertDegree, (state, { Degree }) => {
      return adapter.upsertOne(Degree, state);
    }),
    on(DegreeActions.addDegrees, (state, { Degrees }) => {
      return adapter.addMany(Degrees, state);
    }),
    on(DegreeActions.upsertDegrees, (state, { Degrees }) => {
      return adapter.upsertMany(Degrees, state);
    }),
    on(DegreeActions.updateDegree, (state, { update }) => {
      return adapter.updateOne(update, state);
    }),
    on(DegreeActions.updateDegrees, (state, { updates }) => {
      return adapter.updateMany(updates, state);
    }),
    on(DegreeActions.mapDegree, (state, { entityMap }) => {
      return adapter.mapOne(entityMap, state);
    }),
    on(DegreeActions.mapDegrees, (state, { entityMap }) => {
      return adapter.map(entityMap, state);
    }),
    on(DegreeActions.deleteDegree, (state, { id }) => {
      return adapter.removeOne(id, state);
    }),
    on(DegreeActions.deleteDegrees, (state, { ids }) => {
      return adapter.removeMany(ids, state);
    }),
    on(
      DegreeActions.deleteDegreesByPredicate,
      (state, { predicate }) => {
        return adapter.removeMany(predicate, state);
      }
    ),

    on(DegreeActions.loadDegrees, (state, { Degrees }) => {
      return adapter.setAll(Degrees, state);
    }),

    on(DegreeActions.clearDegrees, (state) => {
      return adapter.removeAll({ ...state, selectedDegreeId: '' });
    })
  );
  export function reducer(state: State | undefined, action: Action) {
    return degreeReducer(state, action);
  }
