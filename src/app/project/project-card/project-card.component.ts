import { AfterViewInit, Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { defaultProject, Project } from '../models/project';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ViewProjectComponent } from '../view-project/view-project.component';
import { Store, select } from '@ngrx/store';
import * as fromEditProject from '../edit/state';
import * as editProjectActions from '../edit/state/edit-project.actions';
import * as fromShared from '../../shared/state/';
import { Observable } from 'rxjs';
@Component({
  selector: "app-project-card",
  templateUrl: "./project-card.component.html",
  styleUrls: ["./project-card.component.scss"],
})
export class ProjectCardComponent implements OnInit, AfterViewInit {
  @Input() project: Project;
  @ViewChild("title") title: HTMLElement | undefined;
  defaultProjectPic$: Observable<string>;
  defaultProjectPic: string;
  project$: Observable<Project>;

  constructor(
    public dialog: MatDialog,
    private editProjectStore: Store<fromEditProject.EditProjectState>,
    private sharedStore: Store<fromShared.SharedState>

  ) {
    console.log(this.project);
    this.title?.innerHTML.substring(0, 30);
    this.defaultProjectPic$ = this.sharedStore.pipe(select(fromShared.getDefaultProjectPic));
    this.project$ = this.editProjectStore.pipe(select(fromEditProject.getEditProject));


  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    console.log(this.project);
    this.defaultProjectPic$.subscribe({
      next: value => {
        this.defaultProjectPic = value;

      }
    });
  }
  viewProject(id: string): void {
    console.log(id);
    console.log("this is the project to post: ", this.project);
    let proj: Project = JSON.parse(JSON.stringify(this.project));
    // this.project.projectRequirements.forEach(ij => {
    //   let p = JSON.stringify(ij.editState);
    //   console.log(p);

    //     ij.stateHistory = [ij.editState]

    //   console.log(ij.stateHistory);
    // });
    console.log("HELLO: ", this.project);

    this.editProjectStore.dispatch(
      new editProjectActions.SetOriginalProject(proj)
    );

    const dialogRef = this.dialog.open(ViewProjectComponent, {
      width: "600px",

      panelClass: "custom-modalbox",
    });
  }
}
