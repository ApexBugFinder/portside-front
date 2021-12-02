import { Injectable, OnDestroy } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as projectActions from '../../state/project.actions';
import * as fromProject from '../../state';

import * as editProjectActions from './edit-project.actions';
import * as fromEditProject from './';


import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { merge, Observable, of, Subscription } from "rxjs";
import { Update } from "@ngrx/entity";

import * as fromShared from '../../../shared/state';
import { ProjectReqService } from '../../services/projectreq.service';
import { ProjectRequirement } from '../../models/projectRequirement';
import { ProjectLinkService } from '../../services/projLink.service';


@Injectable()
export class EditProjectEffects {
  editProject$: Observable<Project | undefined>;
  editProject: Project | undefined;

  constructor(
    private actions$: Actions,
    private editProjectStore: Store<fromEditProject.EditProjectState>,
    private sharedStore: Store<fromShared.SharedState>,
    private projectStore: Store<fromProject.State>,
    private projReqService: ProjectReqService,
    private projectService: ProjectService,
    private projectLinkService: ProjectLinkService
  ) {
    this.editProject$ = this.editProjectStore.pipe(
      select(fromEditProject.getEditProject)
    );

    this.editProject$.subscribe((value) => (this.editProject = value));
  }

  SaveNewProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editProjectActions.EditProjectActionTypes.SAVE_EDITPROJECT_TO_DB),
      mergeMap((action: editProjectActions.SaveEditProjectToDB) =>
        this.projectService.createItem(this.editProject).pipe(
          tap(() => console.log(this.editProject)),
          tap((payload) =>
            console.log(
              "NGRX EFFECT - Save EditProject To DB return payload from BackEnd",
              payload
            )
          ),
          map((savedProject: Project) => {
            this.projectStore.dispatch(
              projectActions.upsertProject({ project: savedProject })
            );
            return new editProjectActions.SaveEditProjectToDBSuccess(
              savedProject
            );
          }),
          catchError((err) =>
            of(new editProjectActions.SaveEditProjectToDBFail(err))
          )
        )
      )
    )
  );

  UpdateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        editProjectActions.EditProjectActionTypes.UPDATE_EDITPROJECT_TO_DB
      ),
      mergeMap((action: editProjectActions.UpdateEditProjectToDB) =>
        this.projectService
          .updateItem(this.editProject)
          // this.projectService.updateItem(action.payload)
          .pipe(
            tap((payload) =>
              console.log(
                "NGRX EFFECT - Update EditProject To DB return payload from BackEnd",
                payload
              )
            ),
            map((savedProject) => {
              console.log("UPDATED Project: ", savedProject);
              // this.projectStore.dispatch(projectActions.deleteProject({ id: savedProject.id as string}))
              this.projectStore.dispatch(
                projectActions.upsertProject({ project: savedProject })
              );
              return new editProjectActions.UpdateEditProjectToDBSuccess(
                savedProject
              );
            }),
            catchError((err) =>
              of(new editProjectActions.UpdateEditProjectToDBFail(err))
            )
          )
      )
    )
  );

  UpdateProjectRequirements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        editProjectActions.EditProjectActionTypes
          .UPDATE_EDITPROJECT_PROJECT_REQUIREMENTS
      ),
      mergeMap(
        (action: editProjectActions.UpdateEditProjectProjectRequirements) =>
          this.projReqService
            .updateItems(action.payload)
            .pipe(
              tap((payload) =>
                console.log(
                  "NGRX EFFECT - Update EditProject PRS To DB return payload from BackEnd",
                  payload
                )
              ),
              map((savedPRs) => {
                let proj: Project = JSON.parse(
                  JSON.stringify(this.editProject)
                );

                savedPRs.forEach((i) => {
                  proj.projectRequirements?.push(i);
                });
                proj.projectRequirements = savedPRs;
                console.log(proj);
                this.projectStore.dispatch(
                  projectActions.upsertProject({ project: proj })
                );
                this.projectStore.dispatch(
                  new editProjectActions.SetEditProjectProjectRequirements(savedPRs));



                console.log("saved PRS: ", savedPRs);

                return new editProjectActions.UpdateEditProjectProjectRequirementsSuccess(
                  savedPRs
                );
              }),
              catchError((err) =>
                of(
                  new editProjectActions.UpdateEditProjectProjectRequirementsFail(
                    err
                  )
                )
              )
            )
      )
    )
  );

  LoadProjectRequirements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        editProjectActions.EditProjectActionTypes
          .LOAD_PROJECT_REQS_FROM_DB
      ),
      mergeMap(
        (action: editProjectActions.LoadEditProjectProjectRequirements) =>
          this.projReqService.loadItems(action.payload).pipe(
            tap((payload) =>
              console.log(
                "NGRX EFFECT - LOAD EditProject PRS To DB return payload from BackEnd",
                payload
              )
            ),
            map((savedPRs) => {
              let proj: Project = JSON.parse(JSON.stringify(this.editProject));
              if (savedPRs) {
                  proj.projectRequirements = [];
                    savedPRs.forEach(i=> {
                        proj.projectRequirements?.push(i);
                    });



              }

              console.log(proj);
              this.projectStore.dispatch(
                projectActions.upsertProject({ project: proj })
              );

              console.log("saved PRS: ", savedPRs);

              return new editProjectActions.LoadEditProjectProjectRequirementsSuccess(
                savedPRs
              );
            }),
            catchError((err) =>
              of(
                new editProjectActions.UpdateEditProjectProjectRequirementsFail(
                  err
                )
              )
            )
          )
      )
    )
  );
  SaveProjectRequirements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        editProjectActions.EditProjectActionTypes
          .SAVE_EDITPROJECT_PROJECT_REQUIREMENTS
      ),
      mergeMap(
        (action: editProjectActions.SaveEditProjectProjectRequirements) =>
          this.projReqService.saveItem(action.payload).pipe(
            tap((payload) =>
              console.log(
                "NGRX EFFECT - Update EditProject PRS To DB return payload from BackEnd",
                payload
              )
            ),
            map((savedPRs) => {
              let proj: Project = JSON.parse(JSON.stringify(this.editProject));

              proj.projectRequirements = [];
              savedPRs.forEach(i => {
                proj.projectRequirements?.push(i);
              })
              console.log(proj);
              this.projectStore.dispatch(
                projectActions.upsertProject({ project: proj })
              );

              console.log("saved PRS: ", savedPRs);

              return new editProjectActions.SaveEditProjectProjectRequirementsSuccess(
                savedPRs
              );
            }),
            catchError((err) =>
              of(
                new editProjectActions.UpdateEditProjectProjectRequirementsFail(
                  err
                )
              )
            )
          )
      )
    )
  );

  DeleteProjectRequirement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        editProjectActions.EditProjectActionTypes
          .DELETE_EDITPROJECT_PROJECT_REQUIREMENTS
      ),
      mergeMap(
        (action: editProjectActions.DeleteEditProjectProjectRequirements) =>
          this.projReqService.deleteItem(action.payload).pipe(
            tap((payload) =>
              console.log(
                "NGRX EFFECT - DELETE EditProject Project Requirement From DB return payload from BackEnd",
                payload
              )
            ),
            map((savedPRs: ProjectRequirement[]) => {
              let proj: Project = JSON.parse(JSON.stringify(this.editProject));
              if (savedPRs) {
                proj.projectRequirements = savedPRs;
              }

              console.log(proj);
              this.projectStore.dispatch(
                projectActions.upsertProject({ project: proj })
              );

              console.log("saved PRS: ", savedPRs);
              this.editProjectStore.dispatch(new editProjectActions.ClearEditProjectProjectRequirements());
              this.editProjectStore.dispatch(new editProjectActions.SetEditProjectProjectRequirements(savedPRs));
              return new editProjectActions.DeleteEditProjectProjectRequirementsSuccess(
                savedPRs
              );
            }),
            catchError((err) =>
              of(
                new editProjectActions.DeleteEditProjectProjectRequirementsFail(
                  err
                )
              )
            )
          )
      )
    )
  );
  SaveProjectLinks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        editProjectActions.EditProjectActionTypes.SAVE_EDITPROJECT_PROJECT_Links
      ),
      mergeMap((action: editProjectActions.SaveEditProjectProjectLinks) =>
        this.projectLinkService.saveItem(action.payload).pipe(
          tap((payload) =>
            console.log(
              "NGRX EFFECT - Save EditProject ProjectLinkS To DB return payload from BackEnd",
              payload
            )
          ),
          map((savedProjectLinks) => {
            let proj: Project = JSON.parse(JSON.stringify(this.editProject));

            proj.projectLinks = savedProjectLinks;
            console.log(proj);
            this.projectStore.dispatch(
              projectActions.upsertProject({ project: proj })
            );
            this.editProjectStore.dispatch(
              new editProjectActions.SetEditProjectProjectLinks(
                savedProjectLinks
              )
            );

            return new editProjectActions.SaveEditProjectProjectLinksSucess(
              savedProjectLinks
            );
          }),
          catchError((err) =>
            of(new editProjectActions.SaveEditProjectProjectLinksFail(err))
          )
        )
      )
    )
  );

  UpdateProjectLinks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        editProjectActions.EditProjectActionTypes
          .UPDATE_EDITPROJECT_PROJECT_Links
      ),
      mergeMap((action: editProjectActions.UpdateEditProjectProjectLinks) =>
        this.projectLinkService.updateItem(action.payload).pipe(
          tap((payload) =>
            console.log(
              "NGRX EFFECT - Save EditProject ProjectLinkS To DB return payload from BackEnd",
              payload
            )
          ),
          map((savedProjectLinks) => {
            let proj: Project = JSON.parse(JSON.stringify(this.editProject));

            proj.projectLinks = savedProjectLinks;
            console.log(proj);
            this.projectStore.dispatch(
              projectActions.upsertProject({ project: proj })
            );
            this.editProjectStore.dispatch(
              new editProjectActions.SetEditProjectProjectLinks(
                savedProjectLinks
              )
            );

            return new editProjectActions.UpdateEditProjectProjectLinksSucess(
              savedProjectLinks
            );
          }),
          catchError((err) =>
            of(new editProjectActions.UpdateEditProjectProjectLinksFail(err))
          )
        )
      )
    )
  );

  DeleteProjectLinks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        editProjectActions.EditProjectActionTypes
          .DELETE_EDITPROJECT_PROJECT_Links
      ),
      mergeMap((action: editProjectActions.UpdateEditProjectProjectLinks) =>
        this.projectLinkService.deleteItem(action.payload).pipe(
          tap((payload) =>
            console.log(
              "NGRX EFFECT - Save EditProject ProjectLinkS To DB return payload from BackEnd",
              payload
            )
          ),
          map((savedProjectLinks) => {
            let proj: Project = JSON.parse(JSON.stringify(this.editProject));

            proj.projectLinks = savedProjectLinks;
            console.log(proj);
            this.projectStore.dispatch(
              projectActions.upsertProject({ project: proj })
            );
            this.editProjectStore.dispatch(
              new editProjectActions.SetEditProjectProjectLinks(
                savedProjectLinks
              )
            );

            return new editProjectActions.DeleteEditProjectProjectLinksSucess(
              savedProjectLinks
            );
          }),
          catchError((err) =>
            of(new editProjectActions.DeleteEditProjectProjectLinksFail(err))
          )
        )
      )
    )
  );
  DeleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        editProjectActions.EditProjectActionTypes.DELETE_EDITPROJECT_TO_DB
      ),
      tap(() => console.log(this.editProject)),
      mergeMap((action: editProjectActions.DeleteEditProjectToDB) =>
        this.projectService
          .deleteItem(this.editProject?.id)
          // this.projectService.deleteItem(action.payload)
          .pipe(
            tap((payload: Project) =>
              console.log(
                "NGRX EFFECT - Delete EditProject to DB return payload",
                payload
              )
            ),
            map((deletedProject: Project) => {
              this.projectStore.dispatch(
                projectActions.deleteProject({
                  id: deletedProject.id as string,
                })
              );
              return new editProjectActions.DeleteEditProjectToDBSuccess(
                deletedProject
              );
            }),
            catchError((err) =>
              of(new editProjectActions.DeleteEditProjectToDBFail(err))
            )
          )
      )
    )
  );

  LoadProjectsFromDB$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editProjectActions.EditProjectActionTypes.LOAD_PROJECTS_FROM_DB),

      mergeMap(
        (action: editProjectActions.LoadProjectsByProjectCreatorIDFromDB) =>
          this.projectService.readAll().pipe(
            tap((payload: Project[]) =>
              console.log(
                "NGRX EFFECT - LOad User Projects from DB return payload",
                payload
              )
            ),
            map((payload: Project[]) => {
              console.log("payload: ", payload);
              this.projectStore.dispatch(projectActions.clearProjects());
              this.projectStore.dispatch(
                projectActions.addProjects({ projects: payload })
              );

              return new editProjectActions.LoadProjectsByProjectCreatorIDFromDBSuccess(
                payload
              );
            }),
            catchError((err) =>
              of(
                new editProjectActions.LoadProjectsByProjectCreatorIDFromDBFail(
                  err
                )
              )
            )
          )
      )
    )
  );
}