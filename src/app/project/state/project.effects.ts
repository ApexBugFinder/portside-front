import { Injectable } from "@angular/core";
import { Project } from '../models/project';
import * as fromProject from './';
import * as projectActions from './project.actions';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect } from "@ngrx/effects";

@Injectable()
export class ProjectEffects {

    constructor(private projectStore: Store<fromProject.State>, 
            private actions$: Actions) {}


    // LoadProjectForProjectCreator$ = createEffect(() => this.actions$.pipe(
    //     ofType(projectActions.loadProjectsFromDB),
    //     mergeMap((action: projectActions.loadProjectsFromDB())))
    // ))
}