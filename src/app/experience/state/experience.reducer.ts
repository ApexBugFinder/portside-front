import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as  ExperienceActions   from './experience.actions';
import { Action, createReducer, createSelector, on } from '@ngrx/store';

// MODELs
import { Experience } from "../Models/experience";



export interface State extends EntityState<Experience> {
    ids: string[];
    entities: {[key: string]: Experience | undefined};
    selectedExperienceId: string | '';

}
export function selectedExperienceId(a: Experience): string {
    return a.id as string;
}
export function sortByDateStarted(a: Experience, b: Experience): number {
    let compare = (a.started?.valueOf()) as number - (b.started?.valueOf() as number);
    if (compare > 1) {
         return 1;
    }
    else if (compare < 1) {
        return -1
    }
    else {
        return 0;
    }
}

export const adapter: EntityAdapter<Experience> = createEntityAdapter<Experience>(
    {
        selectId: selectedExperienceId,
        sortComparer: sortByDateStarted
    }
);


export const initialState: State = adapter.getInitialState({
    selectedExperienceId: '',
    ids: [],
    entities: {},

});

const experienceReducer = createReducer(
    initialState,
    on(ExperienceActions.addExperience, (state, { experience }) => {
      return adapter.addOne(experience, state)
    }),
    on(ExperienceActions.setExperience, (state, { experience }) => {
      return adapter.setOne(experience, state)
    }),
    on(ExperienceActions.upsertExperience, (state, { experience }) => {
      return adapter.upsertOne(experience, state);
    }),
    on(ExperienceActions.addExperiences, (state, { experiences }) => {
      return adapter.addMany(experiences, state);
    }),
    on(ExperienceActions.upsertExperiences, (state, { experiences }) => {
      return adapter.upsertMany(experiences, state);
    }),
    on(ExperienceActions.updateExperience, (state, { update }) => {
      return adapter.updateOne(update, state);
    }),
    on(ExperienceActions.updateExperiences, (state, { updates }) => {
      return adapter.updateMany(updates, state);
    }),
    on(ExperienceActions.mapExperience, (state, { entityMap }) => {
      return adapter.mapOne(entityMap, state);
    }),
    on(ExperienceActions.mapExperiences, (state, { entityMap }) => {
      return adapter.map(entityMap, state);
    }),
    on(ExperienceActions.deleteExperience, (state, { id }) => {
      return adapter.removeOne(id, state);
    }),
    on(ExperienceActions.deleteExperiences, (state, { ids }) => {
      return adapter.removeMany(ids, state);
    }),
    on(ExperienceActions.deleteExperiencesByPredicate, (state, { predicate }) => {
      return adapter.removeMany(predicate, state);
    }),

    on(ExperienceActions.loadExperiences, (state, { experiences }) => {

      return adapter.setAll(experiences,state);
    }),

    on(ExperienceActions.clearExperiences, state => {
      return adapter.removeAll({ ...state, selectedExperienceId: '' });
    }),


  );
  export function reducer(state: State | undefined, action: Action) {
      return experienceReducer(state, action);
  }


//
