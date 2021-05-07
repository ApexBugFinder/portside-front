import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { linkview, ProjectLink } from '../../project';
import {
  faPenSquare,
  faMinusCircle,
  faEye,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import * as fromEditProject from '../../edit/state';
import * as edipProjectActions from '../../edit/state/edit-project.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-icons-section',
  templateUrl: './icons-section.component.html',
  styleUrls: ['./icons-section.component.scss']
})
export class IconsSectionComponent implements OnInit {
  // ICONS
  faEye = faEye;
  faDelete = faMinusCircle;
  faEdit = faPenSquare;
  faPublished = faLightbulb;

  @Input() editMode: boolean;

  // LINKS
  GitLink: ProjectLink;
  SiteLink: ProjectLink;

  
  linkView = linkview;
  linkEditor: linkview;
  
  projectLinks$: Observable<ProjectLink[]>;
  projectLinksStore: ProjectLink[];
  projectID$: Observable<string>;
  projectIDStore: string;
  projectCreatorID$: Observable<string>;
  projectCreatorIDStore: string;
  
  @Output() closeDialog: EventEmitter<string> = new EventEmitter<string>();
  
  constructor(private editProjectStore: Store<fromEditProject.EditProjectState>) {
    this.projectLinks$ = this.editProjectStore.pipe(select(fromEditProject.getEditProjectProjectLinks));
    this.projectID$ = this.editProjectStore.pipe(select(fromEditProject.getEditProjectId));
    this.projectCreatorID$ = this.editProjectStore.pipe(select(fromEditProject.getEditProjectProjectCreatorID));
   }

  ngOnInit(): void {
    
    this.projectLinks$.subscribe({
      next: links => {
        this.initializeLinks(links);
      },
      error: err => {},
      complete: () => {}
    });

    this.projectID$.subscribe({
      next: id => this.projectIDStore = id,
      error: err => { console.log('OOPs error: ', err);},
      complete: () => { console.log('completed getting ProjectID icons-section componenet')}
    });

    this.projectCreatorID$.subscribe({
      next: projectCreatorID => this.projectCreatorIDStore = projectCreatorID,
      error: err => console.log('OOps sorry there was an NGRX error getting projectCreatorID: ', err),
      complete: () => console.log('Completed getting projectCreatorID in icons-section component')
    });
  }
  linkViewTogglerClicked(message: string) {

    // TOGGLE CLOSED EITHER THE GIT LINK EDITOR OR THE SITE LINK EDITOR
     if(message === linkview.NONE) {
       this.linkEditor = linkview.NONE;
     }
    
    
  }
  // DISPLAY GIT LINK EDITOR WHEN ICON IS CLICKED
  displayGitLinkEditor() {
    this.linkEditor= this.linkEditor == linkview.GIT? linkview.NONE: linkview.GIT;
  }
  // DISPLAY SITE LINK EDITOR WHEN ICON IS CLICKED
  displaySiteLinkEditor() {
    this.linkEditor = this.linkEditor == linkview.SITE? linkview.NONE: linkview.SITE;
  }
   
  closeOnClick() {
    console.log('close process begins');
    let message = "closeDialog";
    this.closeDialog.emit(message);
  }

  newGitLinkToProcess(link: ProjectLink) {
    console.log('ProjectLinks in store: ', this.projectLinksStore);
    this.projectLinksStore.filter(i => i.id == link.id).pop();
    console.log('ProjectLinks in store: ', this.projectLinksStore);
    this.projectLinksStore.push(link);
    console.log('ProjectLinks in store: ', this.projectLinksStore);
    // update using ngrx store
    this.editProjectStore.dispatch(new edipProjectActions.SetEditProjectProjectLinks(this.projectLinksStore));
  }

  newSiteLinkToProcess(link: ProjectLink) {
    console.log('ProjectLinks in store: ', this.projectLinksStore);
    this.projectLinksStore.filter(i => i.id == link.id).pop();
    console.log('ProjectLinks in store: ', this.projectLinksStore);
    this.projectLinksStore.push(link);
    console.log('ProjectLinks in store: ', this.projectLinksStore);
     // update using ngrx store
     this.editProjectStore.dispatch(new edipProjectActions.SetEditProjectProjectLinks(this.projectLinksStore));
  }

  initializeLinks(myProjectLinks: ProjectLink[]) {
    console.log('HELLO, lets initialize links');
    console.log(myProjectLinks);
    myProjectLinks.forEach(uu => {
      if (uu.service == 'git') {
        this.GitLink = uu;
      }
      if (uu.service =='site') {
        this.SiteLink = uu
      }
  
    });
    if (myProjectLinks.filter(i=> i.service =='git').length == 0){
      let newGitLink: ProjectLink = {
        id: '',
        projectID: this.projectIDStore,
        service: 'git',
        link: ''
  
      };
      this.GitLink = newGitLink;
      myProjectLinks.push(newGitLink);
    }
    if (myProjectLinks.filter(i => i.service == 'site').length == 0) {
      let newSiteLink: ProjectLink = {
        id: '',
        projectID: this.projectIDStore,
        service: 'site',
        link: ''
      };
      this.SiteLink = newSiteLink;
      myProjectLinks.push(newSiteLink);
    }
    console.log('HELLO, links initialized');
    this.projectLinksStore = myProjectLinks;
  }
  
}

