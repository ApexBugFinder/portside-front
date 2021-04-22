import { AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../project';
import { faPenSquare, faMinusCircle, faEye, faLightbulb, } from '@fortawesome/free-solid-svg-icons';


interface ViewProjectDialogData {
  project: Project;
}
@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss'],
})
export class ViewProjectComponent implements OnInit, AfterViewInit {
  @ViewChild('bannerContainer') banner: HTMLElement | undefined;
  bkImg: string = '../../../assets/images/pngs/techDoc_banner_large.png';
  // ICONS
  faEye = faEye;
  faDelete = faMinusCircle;
  faEdit = faPenSquare;
  faPublished = faLightbulb;

  constructor(

    public dialogRef: MatDialogRef<ViewProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ViewProjectDialogData
  ) {
    this.bkImg = '../../../assets/images/pngs/techDoc_banner_large.png';
    this.data.project.banner = this.bkImg;
  }
  ngAfterViewInit(): void {

    this.data.project.banner =
      '../../../assets/images/pngs/techDoc_banner_large.png';
  }

  ngOnInit(): void {
    console.log(this.data);
  //   this.bkImg =
  //     'url(' + '../../../assets/images/pngs/techDoc_banner_large.png' + ');';

   }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
