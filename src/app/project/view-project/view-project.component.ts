import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../project';
import { faPenSquare, faMinusCircle, faEye, faLightbulb, } from '@fortawesome/free-solid-svg-icons';

interface ViewProjectDialogData {
  project: Project;
}
@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {
faEye = faEye;
faDelete = faMinusCircle;
faEdit = faPenSquare;
faPublished = faLightbulb;
  constructor(public dialogRef: MatDialogRef<ViewProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ViewProjectDialogData) {


    }

  ngOnInit(): void {
    console.log(this.data);
  }

}
