import { Component, Inject, OnInit } from '@angular/core';
import { Constants } from 'src/app/helpers/Constants';
import { defaultProject, Project } from 'src/app/project/project';
import { ProjectService } from 'src/app/project/project.service';
import {
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { EditProjectComponent } from '../../project/edit-project/edit-project.component';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {

  faPlusCircle = faPlusCircle;
  myProjects: Project[]=[];

  
  constructor(@Inject('PROJECT_SERVICE') private projectService: ProjectService, public dialog: MatDialog) {
    this.getProjects();
  }

  ngOnInit(): void {}

  getProjects() {
    this.projectService.readAll(Constants.userID).subscribe((value) => {
      this.myProjects = value;
      console.log(JSON.stringify(this.myProjects));
    });
  }

  createProject(): void{
    const dialogRef = this.dialog.open(EditProjectComponent, {
      width: '980px',
      data: { project: this.myProjects[0]},
      panelClass: 'custom-modalbox'
    });
  }
}
