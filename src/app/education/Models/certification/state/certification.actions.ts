import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne, Predicate } from '@ngrx/entity';

import { Certification } from '../certification';

export const selectCertification = createAction(
  '[Certifications Page] Select Certification',
  props<{ CertificationId: string }>()
);
export const selectCertificationsByProjectorCreatorID = createAction(
  '[Certifications Page] Select Certifications By CertificationCreator',
  props<{ CertificationCreatorID: string }>()
);

export const loadCertifications = createAction(
  '[Certification/API] Load Certifications',
  props<{ Certifications: Certification[] }>()
);
export const addCertification = createAction(
  '[Certification/API] Add Certification',
  props<{ Certification: Certification }>()
);
export const setCertification = createAction(
  '[Certification/API] Set Certification',
  props<{ Certification: Certification }>()
);
export const upsertCertification = createAction(
  '[Certification/API] Upsert Certification',
  props<{ Certification: Certification }>()
);
export const addCertifications = createAction(
  '[Certification/API] Add Certifications',
  props<{ Certifications: Certification[] }>()
);
export const upsertCertifications = createAction(
  '[Certification/API] Upsert Certifications',
  props<{ Certifications: Certification[] }>()
);
export const updateCertification = createAction(
  '[Certification/API] Update Certification',
  props<{ update: Update<Certification> }>()
);
export const updateCertifications = createAction(
  '[Certification/API] Update Certifications',
  props<{ updates: Update<Certification>[] }>()
);
export const mapCertification = createAction(
  '[Certification/API] Map Certification',
  props<{ entityMap: EntityMapOne<Certification> }>()
);
export const mapCertifications = createAction(
  '[Certification/API] Map Certifications',
  props<{ entityMap: EntityMap<Certification> }>()
);
export const deleteCertification = createAction(
  '[Certification/API] Delete Certification',
  props<{ id: string }>()
);
export const deleteCertifications = createAction(
  '[Certification/API] Delete Certifications',
  props<{ ids: string[] }>()
);
export const deleteCertificationsByPredicate = createAction(
  '[Certification/API] Delete Certifications By Predicate',
  props<{ predicate: Predicate<Certification> }>()
);
export const clearCertifications = createAction(
  '[Certification/API] Clear Certifications'
);
