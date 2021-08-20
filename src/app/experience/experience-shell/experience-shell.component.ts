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



@Component({
  selector: 'app-experience-shell',
  templateUrl: './experience-shell.component.html',
  styleUrls: ['./experience-shell.component.scss']
})
export class ExperienceShellComponent implements OnInit {
  editIcon = faPencilAlt;
  currentExperience$: Observable<Experience | undefined>;


  constructor(
    private experienceShellStore: Store<fromExperienceShell.ExperienceShellState>,
    private renderer: Renderer2,
    private experienceDataStore: Store<fromExperienceEntityData.ExperienceDataState>,
    public dialog: MatDialog) {
    this.currentExperience$ = this.experienceShellStore.pipe(select(fromExperienceShell.getCurrentExperience));

   }

  ngOnInit(): void {

  }

  editExperience() {
    const dialogRef = this.dialog.open(EditModalShellComponent, {
      width: '900px',
      panelClass: 'custom-modalbox3'
    });
  }


}
