import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';

import { defaultProject, Project } from 'src/app/project/models/project';
import { ProjectService } from 'src/app/project/project.service';
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


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  myProjects: (Project | undefined)[] = [];
  loadProj: Promise<Project[]>;
  pageClass = 'Project';
  userProjects$: Observable<(Project | undefined)[]>;
  userID$: Observable<string>;
  authenticatedUserID$: Observable<string>;
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
  }

  ngOnInit(): void {
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
    this.userProjects$.subscribe({
      next: (value) => {
        if (this.isAuthenticated) {
          this.myProjects = value;
        }
        else {
          this.myProjects = value.filter(i => i?.published == true);
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
    console.log('project to create: ', defaultProject);
    const dialogRef = this.dialog.open(EditShellComponent, {
      width: '980px',
      data: { project: defaultProject },
      panelClass: 'custom-modalbox',
    });
  }
}
