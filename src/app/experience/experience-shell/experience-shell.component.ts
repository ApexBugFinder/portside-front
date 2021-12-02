import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  faPencilAlt
  } from '@fortawesome/free-solid-svg-icons';

// NGRX
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Executor } from 'selenium-webdriver';

import { EditModalShellComponent } from '../editModal/edit-modal-shell/edit-modal-shell.component';
import { Experience } from '../Models/experience';
import * as fromExperienceEntityData from '../state';
import * as fromExperienceShell from './state/';
import * as ExperienceShellActions from './state/experience-shell.actions';
import * as fromAuth from '../../auth/state';



@Component({
  selector: 'app-experience-shell',
  templateUrl: './experience-shell.component.html',
  styleUrls: ['./experience-shell.component.scss']
})
export class ExperienceShellComponent implements OnInit {
  editIcon = faPencilAlt;
  currentExperience$: Observable<Experience | undefined>;
  isAuth$: Observable<boolean>;
  isAuth: boolean;
  authUserID$: Observable<string>;
  authUserID: string;
  experience: Experience | undefined;
  constructor(
    private experienceShellStore: Store<fromExperienceShell.ExperienceShellState>,
    private renderer: Renderer2,
    private authStore: Store<fromAuth.State>,
    private experienceDataStore: Store<fromExperienceEntityData.ExperienceDataState>,
    public dialog: MatDialog) {
    this.currentExperience$ = this.experienceShellStore.pipe(select(fromExperienceShell.getCurrentExperience));
      this.isAuth$ = this.authStore.pipe(select(fromAuth.getIsAuthenticated));
      this.authUserID$ = this.authStore.pipe(select(fromAuth.getAuthenticatedUserId));
   }

  ngOnInit(): void {
    this.currentExperience$. subscribe( {
    next:(exp: Experience | undefined) =>this.experience = exp,
    complete: () => console.log('Completed successfully fetching the currentExperience from the ExperienceShell State'),
    error: (err) => console.log('OOPs something went wrong fetching the currentExperience from the ExperienceShell State',err)}
    );
      this.isAuth$. subscribe( {
      next:(auth: boolean) => this.isAuth = auth,
      complete: () => console.log('Completed Successfully fetching users authorization state from AuthState'),
      error: (err) => console.log('OOps somethign went wrong when fetching the users authorization state from the AuthState',err)}
      );
      this.authUserID$. subscribe( {
      next:(id: string) => this.authUserID = id,
      complete: () => console.log('Completed Successfully fetching authorized users ID from AuthState'),
      error: (err) => console.log('OOps somethign went wrong when fetching authorized users ID from AuthState ',err)}
      );
  }

  editExperience() {

  if(this.isAuth && (this.authUserID == this.experience?.projectCreatorID)) {
      const dialogRef = this.dialog.open(EditModalShellComponent, {
      panelClass: "custom-modalbox2",
  });
  }

  }


}
