import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, SelectControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
import { faPlusCircle, faRecycle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ProjectLink, linkview } from '../../models/projectLink';
import * as fromEditProject from '../state';
import {select, Store} from '@ngrx/store';
import * as editProjectActions from '../state/edit-project.actions';
import { MakeGuid } from 'src/app/helpers/make-guid';

@Component({
  selector: "app-git-link",
  templateUrl: "./git-link.component.html",
  styleUrls: ["./git-link.component.scss"],
})
export class GitLinkComponent implements OnInit {
  faAdd = faPlusCircle;
  faUpdate = faRecycle;
  faDelete = faTrashAlt;

  @Input() gitLinks: ProjectLink[];
  projectLinks$: Observable<ProjectLink[] | undefined>;
  @Output() newGitToSave: EventEmitter<ProjectLink> =
    new EventEmitter<ProjectLink>();
  newGit: ProjectLink;
  private projectID: string;
  @Output() closeGitEditor: EventEmitter<string> = new EventEmitter<string>();
  gitForm: FormGroup;
  projectID$: Observable<string | undefined>;
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
    this.gitForm = this.fb.group({
      link: [""],
      title: [""],
      description: [""],
    });
  }

  ngOnInit(): void {
    console.log("my gitlink: ", this.gitLinks);
    this.initControls();

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
    this.linkAbstractControl = this.gitForm.get("link");
    this.titleAbstractControl = this.gitForm.get("title");
    this.descriptionAbstractControl = this.gitForm.get("description")
  }

  onSave() {
    let gitty: ProjectLink = {
      link: this.linkAbstractControl?.value,
      projectID: this.projectID,
      title: this.titleAbstractControl?.value,
      description: this.descriptionAbstractControl?.value,
      service: linkview.GIT,
      id: JSON.parse(JSON.stringify(new MakeGuid().id.toString())),
    };

    this.editProjectStore.dispatch(
      new editProjectActions.SaveEditProjectProjectLinks(gitty)
    );

    // EMIT NEW GIT PROJECT LINK
    // this.newGitToSave.emit(gitty);
    // CLOSE GIT LINK EDITOR
    this.closeGitEditor.emit(linkview.NONE);
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
    let deletee = JSON.parse(JSON.stringify(link));
    this.editProjectStore.dispatch(
      new editProjectActions.DeleteEditProjectProjectLinks(deletee)
    );
  }
}
