import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { ProjectRequirement } from '../../models/projectRequirement';
import { editState } from '../../../shared/models/shared';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import * as fromEditProject from '../../edit/state';
import * as edipProjectActions from '../../edit/state/edit-project.actions';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-display-requirements',
  templateUrl: './display-requirements.component.html',
  styleUrls: ['./display-requirements.component.scss']
})
export class DisplayRequirementsComponent implements OnInit {

  projectID$: Observable<string | undefined>;
  projectIDStore: string | undefined;
  
  projectRequirements$: Observable<ProjectRequirement[] | undefined>;
  projectRequirementsStore: ProjectRequirement[];

  requirementForm: FormGroup;
  requirementAbstractControl: AbstractControl | null;
  faDelete = faTrash;
  constructor(private fb: FormBuilder, private editProjectStore: Store<fromEditProject.EditProjectState>) {
    this.projectRequirements$ = this.editProjectStore.pipe(select(fromEditProject.getEditProjectProjectRequirements));
    this.projectID$ = this.editProjectStore.pipe(select(fromEditProject.getEditProjectId));
    this.requirementForm = this.fb.group({
      requirement: ['']
    });
    
  }

  ngOnInit(): void {
    this.projectRequirements$.subscribe({
      next: value => { 
        console.log(value);
        this.projectRequirementsStore = JSON.parse(JSON.stringify(value)) as ProjectRequirement[];
      },
      error: err => console.log('OOps, sorry an error has occurred getting the project requirements from the ngrx store in the display Requirements component'),
      complete: () => console.log('Completed: getting the project requirements ffrom the ngrx store in the display requirements component')
    });
    this.projectID$.subscribe({
      next: value => this.projectIDStore = value,
      error: err => console.log('OOps sorry, error occured getting projectId from store in DisplayRequirements component: ', err),
      complete: () => console.log('Completed getting projectID from ngrx store in DisplayRequirements component')
    });
    
    console.log(this.projectIDStore);
   // this.initializeProjectRequirements();
    
    this.initControls();
  }



// INITIALIZE REQUIREMENTS
initializeProjectRequirements() {
  console.log(this.projectRequirementsStore.length);
  this.projectRequirementsStore.forEach(j => {
    console.log(j.editState);
      j.editState = editState.OK;
      j.stateHistory?.push(j.editState);
      console.log('pre: ', j.stateHistory);
      
      console.log('post: ', j.stateHistory);
      
    });
    console.log('ProjectRequirements after Augment from initializeProjectRequirements: ', this.projectRequirementsStore);
}




  // ADD A REQUIREMENT

addRequirement() {
  let newReq: ProjectRequirement = this.createRequirement();
  this.projectRequirementsStore.push(newReq);
  this.updatePRStore();
  this.requirementAbstractControl?.setValue('');
  
}

// AUGMENT REQUIREMENTS

toggleRemoveRequirement(a: ProjectRequirement) {
    console.log(a);

    // DO A DEEP COPY OF the PR because it is readonly because of NGRX
    let b = JSON.parse(JSON.stringify(a)) ;

  if (b.stateHistory[0] === editState.OK) {
    console.log('HERE');
    // TOGGLE STATE
    b.editState = a.editState == editState.OK? editState.REMOVE: editState.OK; }
 
  else {
    console.log('THERE', a);
    // TOGGLE STATE
    b.editState = a.editState == editState.ADD? editState.REMOVE: editState.ADD;

  }
    // ADD TO STATE HISTORY
    b.stateHistory?.push(b.editState);
    console.log('pre', this.projectRequirementsStore);
    
    // DROP a FROM PRStore and replace it with b
    this.projectRequirementsStore = this.projectRequirementsStore.filter(i => i.id !== a.id);
    this.projectRequirementsStore.push(b);
    console.log('post filter & push', this.projectRequirementsStore);
    
    // UPDATE STORE
   this.updatePRStore();
  
  
    console.log('the requirement ' + b.id + ' is marked for removal: ' + b.editState);

   }
  

  getReqState(b: string): string {
      switch (b) {
        case editState.ADD: 
          return 'markedForAdd';
        case editState.REMOVE:
          return 'markedForRemoval'
        case editState.OK:
          return 'unmarked';
        default:
          return 'unmarked';
      }
}


  updatePRStore() {
    this.editProjectStore.dispatch(new edipProjectActions.SetEditProjectProjectRequirements(this.projectRequirementsStore));
    console.log('post dispatch', this.projectRequirementsStore);
  }


  createRequirement(): ProjectRequirement {
    let thisRequirement: ProjectRequirement = {
      id: Guid.create().toString(),
      projectID: this.projectIDStore as string,
      requirement: this.requirementAbstractControl?.value,
      editState: editState.ADD,
      stateHistory: [editState.ADD] 
    };
    return thisRequirement;
  }

  initControls() {
    this.requirementAbstractControl = this.requirementForm.get('requirement');
  }
}
