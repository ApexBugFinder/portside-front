import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, createSelector, on } from '@ngrx/store';
import * as CertificationActions from './certification.actions';
// MODELS
import { Certification }  from '../certification';

export interface State extends EntityState<Certification> {
  ids: string[];
  entities: { [key: string]: Certification | undefined };
  selectedCertificationId: string |  '';
}

export function selectedCertificationId(a: Certification): string {
  return a.id as string;
}


export function sortByDateStarted(a: Certification, b: Certification): number {
  let compare =
    (a.issuedDate?.valueOf() as number) - (b.issuedDate?.valueOf() as number);
  if (compare > 1) {
    return 1;
  } else if (compare < 1) {
    return -1;
  } else {
    return 0;
  }
}

export function sortByName(a: Certification, b: Certification): number {
  let compare =
  a.certName.localeCompare(b.certName);
   if (compare > 1) {
     return 1;
   } else if (compare < 1) {
     return -1;
   } else {
     return 0;
   }
}
export const adapter: EntityAdapter<Certification> =
  createEntityAdapter<Certification>({
    selectId: selectedCertificationId,
    sortComparer: sortByName
  });


  export const initialState: State = adapter.getInitialState({
    selectedCertificationId: '',
    ids: [],
    entities: {},
  });

  const certificationReducer = createReducer(
    initialState,
    on(CertificationActions.addCertification, (state, { Certification }) => {
      return adapter.addOne(Certification, state);
    }),
    on(CertificationActions.setCertification, (state, { Certification }) => {
      return adapter.setOne(Certification, state);
    }),
    on(CertificationActions.upsertCertification, (state, { Certification }) => {
      return adapter.upsertOne(Certification, state);
    }),
    on(CertificationActions.addCertifications, (state, { Certifications }) => {
      return adapter.addMany(Certifications, state);
    }),
    on(CertificationActions.upsertCertifications, (state, { Certifications }) => {
      return adapter.upsertMany(Certifications, state);
    }),
    on(CertificationActions.updateCertification, (state, { update }) => {
      return adapter.updateOne(update, state);
    }),
    on(CertificationActions.updateCertifications, (state, { updates }) => {
      return adapter.updateMany(updates, state);
    }),
    on(CertificationActions.mapCertification, (state, { entityMap }) => {
      return adapter.mapOne(entityMap, state);
    }),
    on(CertificationActions.mapCertifications, (state, { entityMap }) => {
      return adapter.map(entityMap, state);
    }),
    on(CertificationActions.deleteCertification, (state, { id }) => {
      return adapter.removeOne(id, state);
    }),
    on(CertificationActions.deleteCertifications, (state, { ids }) => {
      return adapter.removeMany(ids, state);
    }),
    on(
      CertificationActions.deleteCertificationsByPredicate,
      (state, { predicate }) => {
        return adapter.removeMany(predicate, state);
      }
    ),

    on(CertificationActions.loadCertifications, (state, { Certifications }) => {
      return adapter.setAll(Certifications, state);
    }),

    on(CertificationActions.clearCertifications, (state) => {
      return adapter.removeAll({ ...state, selectedCertificationId: '' });
    })
  );
  export function reducer(state: State | undefined, action: Action) {
    return certificationReducer(state, action);
  }
