import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromEditProject from '../../edit/state';
import * as editProjectActions from '../../edit/state/edit-project.actions';
import { Observable } from 'rxjs';
import { Project } from '../../models/project';


@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit {

  @Output() closeDialog: EventEmitter<string> = new EventEmitter<string>();
  finalProject$: Observable<any>;
  finalProjectStore: Project;

  editProjectPublished$: Observable<boolean | undefined>;
  editProjectPublishedStore: boolean | undefined;

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
  this.closeEditShellDialog();
}

// DELETE PROJECT
deleteProject() {

  this.editProjectStore.dispatch(new editProjectActions.DeleteEditProjectToDB(this.finalProjectStore.id as string));
  this.closeEditShellDialog()

}

// MANAGE FORM
// PUBLISH PROJECT && SAVE
publishToggleProject() {
  console.log('HELLO');
  this.updateIsPublished().then(() => {
    console.log('HELLO');
    this.saveProject();

  })
 
}

// UPDATE PROJECT AND SAVE
saveProject() {
  
  console.log('edit Project that will be saved to DB', this.finalProjectStore);

  // first Save Project to DB
  // EFFECTS
  if (this.finalProjectStore.id === '') {
    this.editProjectStore.dispatch(new editProjectActions.SaveEditProjectToDB()); 
  } else {

    
    this.editProjectStore.dispatch(new editProjectActions.UpdateEditProjectToDB(this.finalProjectStore));
  }
  
  // then close Dialog
  this.closeEditShellDialog();
 
}

updateIsPublished(): Promise<any> {
  const myPublishPromise = new Promise((resolve, reject) => {
    try{
      let newpublished = !this.editProjectPublishedStore;
      this.editProjectStore.dispatch(new editProjectActions.SetEditProjectIsPublished(newpublished));
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
