import { AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { defaultProject, Project, ProjectLink } from '../project';
import { faPenSquare, faMinusCircle, faEye, faLightbulb, } from '@fortawesome/free-solid-svg-icons';
import { EditProjectComponent } from '../edit-project/edit-project.component';


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

    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ViewProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ViewProjectDialogData
  ) {
    this.bkImg = '../../../assets/images/pngs/techDoc_banner_large.png';
  //  this.data.project.banner = this.bkImg;
  }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    console.log(this.data);

    console.log('PROJECT: \n', this.data.project);
   }
  editProject(): void {
    
    this.dialogRef.close();
    this.dialog.open(EditProjectComponent, {
      width: '980px',
      data: { project: this.data.project },
      panelClass: 'custom-modalbox'
    })
  }
  closeProject(): void {
    this.dialogRef.close();
  }

  gotToGitRepo() {
    const getGitLink: string | undefined = this.data.project?.projectLinks?.find(i=> i.service === 'git')?.link;
    console.log(getGitLink);
    let url: string = '';
    if (getGitLink != '') {
      if (!/^http[s]?:\/\//.test(JSON.stringify(getGitLink))) {
        url += 'http://';
    }
    url += getGitLink;
      window.open(url, '_blank');
    }
    

  }
  goToSite() {
    const getSiteLink: string | undefined = this.data.project.projectLinks.find(i => i.service === 'site')?.link;
    let url: string = '';
    if (getSiteLink != '') {
      if (!/^http[s]?:\/\//.test(JSON.stringify(getSiteLink))) {
        url += 'http://';
    }
    url += getSiteLink;
    window.open(url, '_blank');
    }
  }
}
