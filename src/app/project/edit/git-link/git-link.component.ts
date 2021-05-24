import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, SelectControlValueAccessor } from '@angular/forms';

import { ProjectLink, linkview } from '../../models/projectLink';

@Component({
  selector: 'app-git-link',
  templateUrl: './git-link.component.html',
  styleUrls: ['./git-link.component.scss']
})
export class GitLinkComponent implements OnInit {

  @Input() gitLink:ProjectLink;
  @Output() newGitToSave: EventEmitter<ProjectLink> = new EventEmitter<ProjectLink>();
  newGit: ProjectLink;
  @Output() closeGitEditor: EventEmitter<string> = new EventEmitter<string>();
  gitForm: FormGroup;
  gitAbstractControl: AbstractControl | null;
  constructor(private fb: FormBuilder) { 

    this.gitForm = this.fb.group({
      git: ['']
    })

  }

  ngOnInit(): void {
    console.log('my gitlink: ', this.gitLink);
    this.initControls();
    this.setControls();
    this.newGit = JSON.parse(JSON.stringify(this.gitLink));
  }


  initControls() {
    this.gitAbstractControl = this.gitForm.get('git');
  }
  
  setControls() {
    this.gitAbstractControl?.setValue(this.gitLink.link);
  }

  onSave() {
    this.newGit.link = this.gitAbstractControl?.value
    console.log(this.newGit);
    // EMIT NEW GIT PROJECT LINK
    this.newGitToSave.emit(this.newGit);
    // CLOSE GIT LINK EDITOR
    this.closeGitEditor.emit(linkview.NONE)
  }
  
}
