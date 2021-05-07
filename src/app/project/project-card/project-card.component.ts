import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { defaultProject, Project } from '../project';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ViewProjectComponent } from '../view-project/view-project.component';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit, AfterViewInit {
@Input() project: Project=defaultProject;
  constructor(public dialog: MatDialog) {

  }
  ngAfterViewInit(): void {
    console.log(this.project.description);
    console.log(this.project);

  }

  ngOnInit(): void {

  }
  viewProject(id: string): void {
    console.log(id);
    console.log('this is the project to post: ', this.project);
    this.project.projectRequirements.forEach(ij => {
      let p = JSON.stringify(ij.editState);
      console.log(p);
      
        ij.stateHistory = [ij.editState]
   
      
      console.log(ij.stateHistory);
    });
    console.log('HELLO: ', this.project);
    const dialogRef = this.dialog.open(ViewProjectComponent, {
      width: '980px',
      data: {project: this.project as Project},
      panelClass: 'custom-modalbox'
    });

  }

}
