import { Component, OnInit } from '@angular/core';
import {
  faPencilAlt
  } from '@fortawesome/free-solid-svg-icons';

// NGRX
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Experience } from '../Models/experience';
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
  

  constructor(private experienceShellStore: Store<fromExperienceShell.ExperienceShellState>) {
    this.currentExperience$ = this.experienceShellStore.pipe(select(fromExperienceShell.getCurrentExperience));
   }

  ngOnInit(): void {
  }

}
