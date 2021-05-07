import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { editState, Project, ProjectRequirement } from '../../project';
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

  projectID$: Observable<string>;
  projectIDStore: string;
  
  projectRequirements$: Observable<ProjectRequirement[]>;
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
    this.projectIDStore = '1234';
    console.log(this.projectIDStore);
    this.initializeProjectRequirements();
    
    this.initControls();
  }



// INITIALIZE REQUIREMENTS
initializeProjectRequirements() {
  console.log(this.projectRequirementsStore.length);
  this.projectRequirementsStore.forEach(j => {
    console.log(j.editState);
      j.editState = editState.ADD;
      j.stateHistory.push(j.editState);
      console.log('pre: ', j.stateHistory);
      
      console.log('post: ', j.stateHistory);
      
    });
    console.log('ProjectRequirements after Augment from initializeProjectRequirements: ', this.projectRequirementsStore);
}




  // ADD A REQUIREMENT

addRequirement() {
  let newReq: ProjectRequirement = this.createRequirement();
  // GET DEEP COPY OF PROJECT REQUIREMENTS AND ADD NEW  PROJECT REQ
  // THEN UPDATE NGRX STORE
  let reqs: ProjectRequirement[] = JSON.parse(JSON.stringify(this.projectRequirementsStore));
  reqs.push(newReq);
  this.editProjectStore.dispatch(new edipProjectActions.SetEditProjectProjectRequirements(reqs));
  
  
}

// AUGMENT REQUIREMENTS

// toggleRemoveRequirement(a: ProjectRequirement) {
//   console.log(a);
//   a = JSON.parse(JSON.stringify(a)) as ProjectRequirement;
// if (a.stateHistory[0] == editState.OK) {
//   console.log('HERE');
//   a.editState = a.editState == editState.OK? editState.REMOVE: editState.OK;
//   console.log(a);
// }
// else {
//   console.log('THERE', a);
//   a.editState = a.editState == editState.ADD? editState.REMOVE: editState.ADD;
//   console.log(a);
// }

//   console.log('the requirement ' + a.id + ' is marked for removal: ' + a.editState);
//  }
// // 
//   getReqState(b: string) {

//     console.log('HELLO MARKY MARK & THE FUNKY BUNCH', b);
//     switch (b) {
//       case editState.ADD: 
//         return 'markedForAdd';
//       case editState.REMOVE:
//         return 'markedForRemoval'
//       case editState.OK:
//         return 'unmarked';
//       default:
//         return 'unmarked';
//     }
//   }





  toggleRemoveRequirement(a: ProjectRequirement) {
    console.log(a);
    let b = JSON.parse(JSON.stringify(a)) as ProjectRequirement;
  if (b.stateHistory[0] === editState.OK) {
    console.log('HERE');
    b.editState = b.editState == editState.OK? editState.REMOVE: editState.OK;
    console.log('pre', this.projectRequirementsStore);
    this.projectRequirementsStore.pop(); 
    let _projectRequirementsStore = this.projectRequirementsStore.filter(i => i.id === b.id).pop() ;
    console.log('post', this.projectRequirementsStore);
    this.projectRequirementsStore.push(b);
    console.log(b);
    console.log(this.projectRequirementsStore);
  }
  else {
    console.log('THERE', a);
    a.editState = a.editState == editState.ADD? editState.REMOVE: editState.ADD;
    console.log(a);
  }
  
    console.log('the requirement ' + b.id + ' is marked for removal: ' + b.editState);
   }
  // 
    getReqState(b: string) {
  
      console.log('HELLO MARKY MARK & THE FUNKY BUNCH', this.projectRequirementsStore);
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





  createRequirement(): ProjectRequirement {
    let thisRequirement: ProjectRequirement = {
      id: Guid.create().toString(),
      projectID: this.projectIDStore,
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
