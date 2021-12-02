import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectLink, linkview } from '../../models/projectLink';
import * as fromEditProject from "../state";
import { select, Store } from "@ngrx/store";
import * as editProjectActions from "../state/edit-project.actions";
import { MakeGuid } from "src/app/helpers/make-guid";
import {
  faPlusCircle,
  faRecycle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: "app-site-link",
  templateUrl: "./site-link.component.html",
  styleUrls: ["./site-link.component.scss"],
})
export class SiteLinkComponent implements OnInit {
  @Input() siteLinks: ProjectLink[];
  projectLinks$: Observable<ProjectLink[] | undefined>;
  projectID$: Observable<string | undefined>;
  projectID: string;
  faAdd = faPlusCircle;
  faUpdate = faRecycle;
  faDelete = faTrashAlt;

  @Output() newSiteToSave: EventEmitter<ProjectLink> =
    new EventEmitter<ProjectLink>();
  @Output() closeSiteEditor: EventEmitter<string> = new EventEmitter<string>();

  newSite: ProjectLink;
  siteForm: FormGroup;
  linkAbstractControl: AbstractControl | null;
  titleAbstractControl: AbstractControl | null;
  descriptionAbstractControl: AbstractControl | null;

  constructor(
    private fb: FormBuilder,
    private editProjectStore: Store<fromEditProject.EditProjectState>
  ) {
    this.projectLinks$ = this.editProjectStore.pipe(
      select(fromEditProject.getEditProjectProjectLinks)
    );
    this.projectID$ = this.editProjectStore.pipe(
      select(fromEditProject.getEditProjectId)
    );
    this.siteForm = this.fb.group({
      link: [""],
      title: [""],
      description: [""],
    });
  }

  ngOnInit(): void {
    this.initControls();
    this.setControls();
    this.projectID$.subscribe({
      next: (value: string | undefined) => {
        if (value) this.projectID = value;
        return value;
      },
      error: (err) =>
        console.log(
          "Oops something went wrong getting the ProjectID in the GitLink Component"
        ),
      complete: () =>
        console.log(
          "Completed getting the ProjectID for the GitLink Component from the Edit Project Store"
        ),
    });
  }

  initControls() {
    this.linkAbstractControl = this.siteForm.get("link");
    this.titleAbstractControl = this.siteForm.get("title");
    
    this.descriptionAbstractControl = this.siteForm.get("description");
  }

  setControls() {}

  // EMIT NEW SITE LINK VALUE and Close SITE LINK EDITOR
  onSave() {
    let newSite: ProjectLink = {
      link: this.linkAbstractControl?.value,
      projectID: this.projectID,
      title: this.titleAbstractControl?.value,
      description: this.descriptionAbstractControl?.value,
      service: linkview.SITE,
      id: JSON.parse(JSON.stringify(new MakeGuid().id.toString())),
    };
    this.editProjectStore.dispatch(
      new editProjectActions.SaveEditProjectProjectLinks(newSite)
    );
    // this.newSiteToSave.emit(this.newSite);
    this.closeSiteEditor.emit(linkview.NONE);
  }

  onUpdate(link: ProjectLink) {
    let update: ProjectLink = {
      id: link.id,
      projectID: link.projectID,
      link: link.link,
      service: link.service,
      title: link.title,
      description: link.description,
    };
    this.editProjectStore.dispatch(
      new editProjectActions.UpdateEditProjectProjectLinks(update)
    );
  }

  onDelete(link: ProjectLink) {
    let toDelete: ProjectLink = {
      id: link.id,
      projectID: link.projectID,
      link: link.link,
      service: link.service,
      title: link.title,
      description: link.description,
    };
    this.editProjectStore.dispatch(
      new editProjectActions.DeleteEditProjectProjectLinks(toDelete)
    );
  }
}
