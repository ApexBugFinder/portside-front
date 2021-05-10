import { Injectable, OnDestroy } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as projectActions from '../../state/project.actions';
import * as fromProject from '../../state';

import * as editProjectActions from './edit-project.actions';
import * as fromEditProject from './';


import { ProjectService } from '../../project.service';
import { Project } from '../../project';
import { merge, Observable, of } from "rxjs";
import { Update } from "@ngrx/entity";


@Injectable()
export class EditProjectEffects implements OnDestroy {

    editProject$: Observable<Project | undefined>;
    editProject: Project  | undefined;

    constructor(private actions$: Actions,
            private editProjectStore: Store<fromEditProject.EditProjectState>,
            private projectStore: Store<fromProject.State>,
            private projectService: ProjectService) {
                this.editProject$ = this.editProjectStore.pipe(select(fromEditProject.getEditProject));
                this.editProject$.subscribe(value => this.editProject = value);
            }
    ngOnDestroy(): void {
        
        throw new Error("Method not implemented.");
    }


    SaveNewProject$ = createEffect(() => this.actions$.pipe(
        ofType(editProjectActions.EditProjectActionTypes.SAVE_EDITPROJECT_TO_DB),
        mergeMap((action: editProjectActions.SaveEditProjectToDB) => 
            this.projectService.createItem(this.editProject)
                .pipe(
                    tap(() => console.log(this.editProject)),
                    tap(payload => console.log('NGRX EFFECT - Save EditProject To DB return payload from BackEnd', payload)),
                    map(savedProject => (new editProjectActions.SaveEditProjectToDBSuccess(savedProject))),
                    catchError(err => of(new editProjectActions.SaveEditProjectToDBFail(err)))
        ))
    ));

    UpdateProject$ = createEffect(() => this.actions$.pipe(
        ofType(editProjectActions.EditProjectActionTypes.UPDATE_EDITPROJECT_TO_DB),
        mergeMap((action: editProjectActions.UpdateEditProjectToDB) =>
            this.projectService.updateItem(this.editProject)
            // this.projectService.updateItem(action.payload)
                .pipe(
                    tap(payload => console.log('NGRX EFFECT - Update EditProject To DB return payload from BackEnd', payload)),
                    map((savedProject) => {
                        this.projectStore.dispatch(projectActions.deleteProject({ id: savedProject.id as string}))
                        this.projectStore.dispatch(projectActions.setProject({project: savedProject}))
                        return new editProjectActions.UpdateEditProjectToDBSuccess(savedProject);
                    }),
                    catchError(err => of(new editProjectActions.UpdateEditProjectToDBFail(err)))
                ))
    ));

    DeleteProject$ = createEffect(() => this.actions$.pipe(
        ofType(editProjectActions.EditProjectActionTypes.DELETE_EDITPROJECT_TO_DB),
        tap(()=> console.log(this.editProject)),
        mergeMap((action: editProjectActions.DeleteEditProjectToDB) => 
             this.projectService.deleteItem(this.editProject?.id)
            // this.projectService.deleteItem(action.payload)
                .pipe(
                    tap((payload: Project) => console.log('NGRX EFFECT - Delete EditProject to DB return payload', payload)),
                    map((deletedProject: Project) => {
                        this.projectStore.dispatch(projectActions.deleteProject({ id: deletedProject.id as string}));
                        return new editProjectActions.DeleteEditProjectToDBSuccess(deletedProject);
                    }),
                    catchError(err => of(new editProjectActions.DeleteEditProjectToDBFail(err)))

                ))
    ));

    LoadProjectsFromDB$ = createEffect(() => this.actions$.pipe(
        ofType(editProjectActions.EditProjectActionTypes.LOAD_PROJECTS_FROM_DB),

        mergeMap((action: editProjectActions.LoadProjectsByProjectCreatorIDFromDB) => 
        
        this.projectService.readAll(action.payload)
            .pipe(
                tap((payload: Project[]) => console.log('NGRX EFFECT - LOad User Projects from DB return payload', payload)),
                map((payload: Project[])=> {
                    this.projectStore.dispatch(projectActions.addProjects({projects: payload}));
                    return new editProjectActions.LoadProjectsByProjectCreatorIDFromDBSuccess(payload)                        
                    
                })
                
            ))
    ));
    
    //     mergeMap((action: editProjectActions.LoadProjectsByProjectCreatorIDFromDBSuccess) =>
    //         this.projectService.readAll(action.payload)
    //         .pipe(
    //             switchMap((res) => [
                    
    //             ])
    //         )
    //     switchMap((res) => [
    //         new projectActions.addProjects(res),
    //         new editProjectActions.LoadProjectsByProjectCreatorIDFromDBSuccess(res)
    //     ])

        
    // );
}