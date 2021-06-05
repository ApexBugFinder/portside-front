import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { Constants } from 'src/app/helpers/Constants';
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

  constructor(
    private projectService: ProjectService,
    private editProjectStore: Store<fromEditProject.EditProjectState>,
    private projectStore: Store<fromProject.State>,
    public dialog: MatDialog
  ) {
    console.log(this.myProjects);
    this.userProjects$ = this.projectStore.pipe(
      select(fromProject.selectAllProjects)
    );
  }

  ngOnInit(): void {
    // this.projectService.readAll(Constants.userID).subscribe({
    //   next: (value) => {
    //     this.myProjects = (value);
    //     if (!value) {
    //       this.myProjects.push(defaultProject);
    //     }

    //     console.log('my projects in observable on project component', value);
    //    return value;
    //    },
    //   error: err => console.log('OOps sorry, error occured getting the user\'s projects from store in project component: ', err),
    //   complete: () => console.log('Completed getting user\'s projects from ngrx store in project component')

    // });
    this.userProjects$.subscribe({
      next: (value) => {
        this.myProjects = value;

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
