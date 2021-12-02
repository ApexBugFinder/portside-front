import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ProjectLink, linkview } from '../../models/projectLink';
import {
  faPenSquare,
  faMinusCircle,
  faEye,
  faLightbulb,
  faTimesCircle

} from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import * as fromEditProject from '../../edit/state';
import * as edipProjectActions from '../../edit/state/edit-project.actions';
import { Observable } from 'rxjs';
import { ProjectCardComponent } from '../../project-card/project-card.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  faTimesCircle = faTimesCircle;

  @Input() editMode: boolean;
  @Output() openMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  menuOpen: boolean = false;

  // LINKS
  GitLink: ProjectLink[];
  SiteLink: ProjectLink[];


  linkView: linkview;
  linkEditor: linkview;

  projectLinks$: Observable<ProjectLink[]  | undefined>;
  projectLinksStore: ProjectLink[]  | undefined;
  projectID$: Observable<string  | undefined> ;
  projectIDStore: string  | undefined;
  projectCreatorID$: Observable<string  | undefined>;
  projectCreatorIDStore: string  | undefined;

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
    if (this.linkEditor == linkview.GIT) {
      this.menuOpen = true;
      this.openMenu.emit(this.menuOpen);
    } else {
      this.menuOpen = false;
      this.openMenu.emit(this.menuOpen);
    }

  }
  // DISPLAY SITE LINK EDITOR WHEN ICON IS CLICKED
  displaySiteLinkEditor() {

    this.linkEditor = this.linkEditor == linkview.SITE? linkview.NONE: linkview.SITE;
    if (this.linkEditor == linkview.SITE) {
      this.menuOpen = true;
      this.openMenu.emit(this.menuOpen);
    } else {
      this.menuOpen = false;
      this.openMenu.emit(this.menuOpen);
    }
  }

  closeOnClick() {
    console.log('close process begins');
    let message = "closeDialog";
    this.menuOpen = false;
    this.openMenu.emit(this.menuOpen);
    this.closeDialog.emit(message);
  }

  newGitLinkToProcess(link: ProjectLink) {
    console.log('ProjectLinks in store: ', this.projectLinksStore);
    this.projectLinksStore?.filter(i => i.id == link.id).pop();
    console.log('ProjectLinks in store: ', this.projectLinksStore);
    this.projectLinksStore?.push(link);
    console.log('ProjectLinks in store: ', this.projectLinksStore);
    // update using ngrx store
    if (this.projectLinksStore)
    this.editProjectStore.dispatch(new edipProjectActions.SetEditProjectProjectLinks(this.projectLinksStore));
  }

  newSiteLinkToProcess(link: ProjectLink) {
    console.log('ProjectLinks in store: ', this.projectLinksStore);
    this.projectLinksStore?.filter(i => i.id == link.id).pop();
    console.log('ProjectLinks in store: ', this.projectLinksStore);
    this.projectLinksStore?.push(link);
    console.log('ProjectLinks in store: ', this.projectLinksStore);
     // update using ngrx store
     if(this.projectLinksStore)
     this.editProjectStore.dispatch(new edipProjectActions.SetEditProjectProjectLinks(this.projectLinksStore));
  }

  initializeLinks(myProjectLinks: ProjectLink[] | undefined) {
    console.log('HELLO, lets initialize links');
    console.log(myProjectLinks);
    myProjectLinks?.forEach(uu => {
      if (uu.service == 'git') {
        this.GitLink.push(uu);
      }
      if (uu.service =='site') {
        this.SiteLink.push(uu);
      }

    });



    }

  }



