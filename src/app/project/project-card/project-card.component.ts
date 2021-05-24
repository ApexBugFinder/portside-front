import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { defaultProject, Project } from '../models/project';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ViewProjectComponent } from '../view-project/view-project.component';
import { Store, select } from '@ngrx/store';
import * as fromEditProject from '../edit/state/edit-project.reducer';
import * as editProjectActions from '../edit/state/edit-project.actions';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit, AfterViewInit {


  @Input() project: Project;


  constructor(public dialog: MatDialog,
    private editProjectStore: Store<fromEditProject.EditProjectState>,
    ) {
      console.log(this.project);
  }
  ngAfterViewInit(): void {
  

  }

  ngOnInit(): void {
    console.log(this.project);
  }
  viewProject(id: string): void {
    console.log(id);
    console.log('this is the project to post: ', this.project);
    // this.project.projectRequirements.forEach(ij => {
    //   let p = JSON.stringify(ij.editState);
    //   console.log(p);
      
    //     ij.stateHistory = [ij.editState]
   
      
    //   console.log(ij.stateHistory);
    // });
    console.log('HELLO: ', this.project);


    this.editProjectStore.dispatch(new editProjectActions.SetOriginalProject(this.project));
    const dialogRef = this.dialog.open(ViewProjectComponent, {
      width: '980px',
      data: {project: this.project},
      panelClass: 'custom-modalbox'
    });

  }

}
