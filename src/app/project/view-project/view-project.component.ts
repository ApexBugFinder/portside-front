import { AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  Project } from '../models/project';
import { faPenSquare, faMinusCircle, faEye, faLightbulb, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { EditShellComponent } from '../edit/edit-shell.component';
import { Store, select } from '@ngrx/store';
import * as fromEditProject from '../edit/state';
import * as editProjectActions from '../edit/state/edit-project.actions';

import * as fromAuth from '../../auth/state';

import * as fromShared from '../../shared/state';
import { Observable } from 'rxjs';
import { ProjectLink, linkview } from '../models/projectLink';

interface ViewProjectDialogData {
  project: Project;
}
@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewProjectComponent implements OnInit, AfterViewInit {
  @ViewChild('bannerContainer') banner: HTMLElement | undefined;
  bkImg: string = '../../../assets/images/pngs/techDoc_banner_large.png';
  // ICONS
  faEye = faEye;
  faDelete = faMinusCircle;
  faClose = faTimesCircle;
  faEdit = faPenSquare;
  faPublished = faLightbulb;
  linkview: linkview;
  defaultProjectPic: string;
  defaultProjectPic$: Observable<string>;
  viewProject$: Observable<Project | undefined>;
  viewProjectStore: Project | undefined;
  userViewedID$: Observable<string>;
  userAuthenticatedID$: Observable<string>;
  userAuthenticated$:Observable<boolean>;
  public siteLinks: ProjectLink[] ;
  public gitLinks: ProjectLink[] ;

  bannerLink: string;
  constructor(
    private editProjectStore: Store<fromEditProject.EditProjectState>,
    private sharedStore: Store<fromShared.SharedState>,
    private authStore: Store<fromAuth.State>,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ViewProjectComponent>,

  ) {
    this.bkImg = '../../../assets/images/pngs/techDoc_banner_large.png';
    this.defaultProjectPic$ = this.sharedStore.pipe(select(fromShared.getDefaultProjectPic));
    this.viewProject$ = this.editProjectStore.pipe(select(fromEditProject.getOriginalProject));
    this.userViewedID$ = this.sharedStore.pipe(select(fromShared.getUserId));
    this.userAuthenticatedID$ = this.authStore. pipe(select(fromAuth.getAuthenticatedUserId));
    this.userAuthenticated$ = this.authStore.pipe(select(fromAuth.getIsAuthenticated));
  }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

    this.defaultProjectPic$.subscribe({
      next: (value: string) => {
        this.defaultProjectPic = value;
      }
    })
    this.viewProject$.subscribe({
      next: (value: Project   | undefined) => {
        if (value) {
     this.viewProjectStore = value as Project;
        console.log(this.viewProjectStore.projectRequirements);
        if (this.defaultProjectPic && ((value?.banner === undefined || value?.banner ===""))) {
            this.bannerLink = this.defaultProjectPic;
        } else {
          this.bannerLink = value?.banner as string;
        }
        console.log('my projects in observable on viewProject component', value);

      this.siteLinks =  JSON.parse(JSON.stringify(this.viewProjectStore.projectLinks?.filter(i => i.service === 'site')));

        console.log('SITE LINKS To DISPLAY:', this.siteLinks);
       this.gitLinks = JSON.parse(JSON.stringify( this.viewProjectStore.projectLinks?.filter(i => i.service === 'git')));
        console.log("GIT LINKS To DISPLAY:", this.gitLinks);
        }

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

  gotToGitRepo(link: ProjectLink) {

      if (!(link.link == undefined) || !(link.link === '') )
      window.open(link.link, '_blank');
    }



  goToSite(link: ProjectLink) {

    // if (link.link != '') {
    //   if (!/^http[s]?:\/\//.test(JSON.stringify(link.link))) {
    //     link.link += 'http://';
    // }

    if ((link.link !== undefined) || (link.link !=="")){
    window.open(link.link, '_blank');
    }
  }


}
