import { AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  Project } from '../models/project';
import { faPenSquare, faMinusCircle, faEye, faLightbulb, } from '@fortawesome/free-solid-svg-icons';

import { EditShellComponent } from '../edit/edit-shell.component';
import { Store, select } from '@ngrx/store';
import * as fromEditProject from '../edit/state';
import * as editProjectActions from '../edit/state/edit-project.actions';
import { Observable } from 'rxjs';

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

  viewProject$: Observable<Project | undefined>;
  viewProjectStore: Project | undefined;

  constructor(
    private editProjectStore: Store<fromEditProject.EditProjectState>,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ViewProjectComponent>,

  ) {
    this.bkImg = '../../../assets/images/pngs/techDoc_banner_large.png';

    this.viewProject$ = this.editProjectStore.pipe(select(fromEditProject.getOriginalProject));
  }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

    this.viewProject$.subscribe({
      next: (value: Project   | undefined) => {
        this.viewProjectStore = value as Project;

        console.log('my projects in observable on viewProject component', value);
       return value;
       },
      error: err => console.log('OOps sorry, error occured getting the user\'s project from store in viewProject component: ', err),
      complete: () => console.log('Completed getting user\'s projects from ngrx store in viewProject component')
    });
    console.log('PROJECT: \n', this.viewProjectStore);
   }
  editProject(): void {

    this.dialogRef.close();



    this.dialog.open(EditShellComponent, {
      width: '600px',

      panelClass: 'custom-modalbox'
    })
  }
  closeProject(): void {
    this.dialogRef.close();
  }

  gotToGitRepo() {
    const getGitLink: string | undefined = this.viewProjectStore?.projectLinks?.find(i=> i.service === 'git')?.link;
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
    const getSiteLink: string | undefined = this.viewProjectStore?.projectLinks?.find(i => i.service === 'site')?.link;
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
