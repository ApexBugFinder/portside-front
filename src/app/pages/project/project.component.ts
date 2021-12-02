import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';

import { defaultProject, Project } from 'src/app/project/models/project';
import { ProjectService } from 'src/app/project/services/project.service';
import {
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { EditShellComponent } from '../../project/edit/edit-shell.component';
import * as fromProject from '../../project/state';
import {Store, select } from '@ngrx/store';
import * as projectActions from '../../project/state/project.actions';

import * as fromEditProject from '../../project/edit/state/edit-project.reducer';
import * as editProjectActions from '../../project/edit/state/edit-project.actions';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';
import * as fromAuth from '../../auth/state';
import * as fromShared from '../../shared/state';
import * as SharedActions from '../../shared/state/shared-actions';
import { isMobile, makeid } from 'src/app/helpers/helperFunctions';
import { MakeGuid } from 'src/app/helpers/make-guid';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  loggedInMenuOpen$: Observable<boolean>;
  faPlusCircle = faPlusCircle;
  myProjects: (Project | undefined)[] = [];
  loadProj: Promise<Project[]>;
  pageClass = 'Project';
  userProjects$: Observable<(Project | undefined)[]>;
  userID$: Observable<string>;
  userID: string;
  authenticatedUserID$: Observable<string>;
  authenticatedUserID: string;
  isAuthenticated$: Observable<boolean>;
  isAuthenticated: boolean;

  constructor(
    private projectService: ProjectService,
    private editProjectStore: Store<fromEditProject.EditProjectState>,
    private projectStore: Store<fromProject.State>,
    private authStore: Store<fromAuth.State>,

    private sharedStore: Store<fromShared.SharedState>,
    public dialog: MatDialog
  ) {
    console.log(this.myProjects);
    this.userProjects$ = this.projectStore.pipe(
      select(fromProject.selectAllProjects)
    );
    this.isAuthenticated$ = this.authStore.pipe(select(fromAuth.getIsAuthenticated));
    this.authenticatedUserID$ = this.authStore.pipe(select(fromAuth.getAuthenticatedUserId));
    this.userID$ = this.sharedStore.pipe(select(fromShared.getUserId));
    this.loggedInMenuOpen$ = this.sharedStore.pipe(select(fromShared.getSideMenuState));
  }

  ngOnInit(): void {
  
     this.userID$.subscribe({
       next: (value) => {
         this.userID = value;

         console.log("User ID on project component", value);
         return value;
       },
       error: (err) =>
         console.log(
           "OOps sorry, error occured getting the user's ID from sharedstore in project component: ",
           err
         ),
       complete: () =>
         console.log(
           "Completed getting user's isAuthenticated from ngrx Authstore in project component"
         ),
     });
    this.isAuthenticated$.subscribe({
      next: (value) => {
        this.isAuthenticated = value;

        console.log('User isAuthenticated on project component', value);
        return value;
      },
      error: (err) =>
        console.log(
          "OOps sorry, error occured getting the user's isAuthenticated from Authstore in project component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed getting user's isAuthenticated from ngrx Authstore in project component"
        ),
    });
    this.authenticatedUserID$.subscribe({
      next: (value) => {
        this.authenticatedUserID = value;

        console.log("Authenticated UserID on project component", value);
        return value;
      },
      error: (err) =>
        console.log(
          "OOps sorry, error occured getting the Authenticated UserID from Authstore in project component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed getting Authenticated UserID from ngrx Authstore in project component"
        ),
    });
    this.userProjects$.subscribe({
      next: (value) => {
        if (this.isAuthenticated) {
          this.myProjects = value;
          // if (this.myProjects.length === 0 && (this.userID !== null && this.userID !== undefined)) {
          //   this.editProjectStore.dispatch(
          //     new editProjectActions.LoadProjectsByProjectCreatorIDFromDB(this.userID)
          //   );
          // }
        }
        else {
          // this.myProjects = value.filter(i => i?.published == true);
          this.myProjects = value;
        }


        console.log('my projects in observable on project component', value);
        return value;
      },
      error: (err) =>
        console.log(
          "OOps sorry, error occured getting the user's projects from store in project component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed getting user's projects from ngrx store in project component"
        ),
    });
  }

  createProject(): void {
let createNew: Project = JSON.parse(JSON.stringify(defaultProject));
var id = new MakeGuid().id;
createNew.id = JSON.parse(JSON.stringify(id.toString()));
  createNew.projectCreatorID = this.authenticatedUserID;
  console.log('New Project ID: ', createNew.id);
  createNew.projectName = 'New Project - ' + createNew.id;
    // CREATE NEW PROJECT

    console.log('Save New Edit Project: ', createNew);

    // SAVE TO DB
    this.editProjectStore.dispatch(
      new editProjectActions.SetEditProject(createNew)
    );
    this.editProjectStore.dispatch(new editProjectActions.SaveEditProjectToDB)
    // OPEN EDIT SHELL


    const dialogRef = this.dialog.open(EditShellComponent, {
      width: '980px',

      panelClass: 'custom-modalbox',
    });
  }


}
