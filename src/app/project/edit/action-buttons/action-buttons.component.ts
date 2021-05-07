import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromEditProject from '../../edit/state';
import * as editProjectActions from '../../edit/state/edit-project.actions';
import { Observable } from 'rxjs';
import { Project } from '../../project';


@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit {

  @Output() closeDialog: EventEmitter<string> = new EventEmitter<string>();
  finalProject$: Observable<any>;
  finalProjectStore: Project;

  editProjectPublished$: Observable<boolean>;
  editProjectPublishedStore: boolean;

  constructor(private editProjectStore: Store<fromEditProject.EditProjectState>) {
    this.finalProject$ = this.editProjectStore.pipe(select(fromEditProject.getEditProject));
    this.editProjectPublished$ = this.editProjectStore.pipe(select(fromEditProject.getEditProjectIsPublished));
   }

  ngOnInit(): void {
    this.finalProject$.subscribe({
      next: value => {
        this.finalProjectStore = (value) as Project;
      },
      error: err => console.log('OOps, sorry there was an error retrieveing' + 
                    'the editProject from the ngrx store in the actionsButton component'),
      complete: () => console.log('Completed: retrieving your editProject from' +
                    'the Edit Project ngrx store in the ActionButtons Component')
    });

    this.editProjectPublished$.subscribe({
      next: value => {
        this.editProjectPublishedStore = value;
      },
      error: err => console.log('OOps, sorry there was an error retrieveing' + 
                    'the editProject IsPublished from the ngrx store in the actionsButton component'),
      complete: () => console.log('Completed: retrieving your editProject IsPublished from' +
                    'the Edit Project ngrx store in the ActionButtons Component')
    });
  }
 // CLEAR FORM

 clearChanges() {
 
  this.editProjectStore.dispatch(new editProjectActions.ResetEditProject());
}

// DELETE PROJECT
deleteProject() {
  // EFFECTS
// console.log('Beginning DELETE PROCESS for project: ', this.localProject.id);
// this.projectService.deleteItem(this.localProject.id).subscribe(i => {
//   this.dialogRef.close();
// });

}

// MANAGE FORM
// PUBLISH PROJECT && SAVE
publishToggleProject() {
  
  this.updateIsPublished().then(() => {
    this.saveProject();

  })
 
}

// UPDATE PROJECT AND SAVE
saveProject() {
  
  console.log('edit Project that will be saved to DB', this.finalProjectStore);

  // first Save Project to DB
  // EFFECTS
  
  // then close Dialog
  this.closeEditShellDialog();
 
 
 
  // this.finalProject = this.buildFinalProject();
  
  // // IF new proect Create Project if updating project Update Project
  // if (this.finalProject.id == '') {
  //   console.log(
  //     'this is the new project to be saved to DB: ',
  //     JSON.stringify(this.finalProject)
  //   );
  //   this.createNewProject(this.finalProject);
    
  // } else {
  //   console.log(
  //     'this is the project to be updated in the DB: ',
  //     JSON.stringify(this.finalProject)
  //   );
  //   this.updateProject(this.finalProject);
  // }
}

updateIsPublished(): Promise<any> {
  const myPublishPromise = new Promise((resolve, reject) => {
    try{
      this.editProjectStore.dispatch(new editProjectActions.SetEditProjectIsPublished(!this.editProjectPublishedStore));
      resolve;
    } catch(err) {
      reject(err);
    }
   
    
  });
  return myPublishPromise;
} 


closeEditShellDialog() {
  console.log('close process begins');
  let message = "closeDialog";
  this.closeDialog.emit(message);
}
}
