import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromEditProject from '../../edit/state';
import * as edipProjectActions from '../../edit/state/edit-project.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-project-status-section',
  templateUrl: './project-status-section.component.html',
  styleUrls: ['./project-status-section.component.scss']
})
export class ProjectStatusSectionComponent implements OnInit {
  @ViewChild('publishStatusButton') publishStatusButton: HTMLElement | null = document.getElementById('publishStatusButton');
  @ViewChild('startedId') startDate: HTMLElement | null = document.getElementById('startedId');
  @ViewChild('completedId') completeDate: HTMLElement | null = document.getElementById('completedId');

  started$: Observable<Date | undefined>;
  started: Date | undefined;

  completed$: Observable<Date | undefined>;
  completed: Date | undefined;

  published$: Observable<boolean  | undefined>;
  published: boolean  | undefined;


  startedAbstractControl: AbstractControl | null;
  completedAbstractControl: AbstractControl | null;
  publishedAbstractControl: AbstractControl | null;

  
  statusForm: FormGroup;
  constructor(private fb: FormBuilder, 
    private editProjectStore: Store<fromEditProject.EditProjectState>,
    private renderer: Renderer2) { 
   
      this.started$ = this.editProjectStore.pipe(select(fromEditProject.getEditProjectStartDate));
      this.completed$ = this.editProjectStore.pipe(select(fromEditProject.getEditProjectCompleteDate));
      this.published$ = this.editProjectStore.pipe(select(fromEditProject.getEditProjectIsPublished));
    this.statusForm = this.fb.group({
      started: [this.started],
      completed: [this.completed],
      published: [this.published]
    })
  }

  ngOnInit(): void {
    this.started$.subscribe({
      next: value => this.started = value,
      error: err => console.log('OOps sorry, error occured getting startDate from store in projectStatusSection component: ', err),
      complete: () => console.log('Completed getting startDate from ngrx store in projectStatusSection component')
    });
    this.completed$.subscribe({
      next: value => this.completed = value,
      error: err => console.log('OOps sorry, error occured getting completeDate from store in projectStatusSection component: ', err),
      complete: () => console.log('Completed getting completeDate from ngrx store in projectStatusSection component')
    });
    this.published$.subscribe({
      next: value =>{ 
        this.published = value
        
          this.publishStatusButton = document.getElementById('publishStatusButton');
          if (this.published) {
         
          this.renderer.addClass(this.publishStatusButton, 'publishStatusButtonTrue');
            this.renderer.setValue(this.publishStatusButton, 'true');
          } else {
          this.renderer.removeClass(this.publishStatusButton, 'publishStatusButtonTrue');
          this.renderer.setValue(this.publishStatusButton, 'false');
          }
      

      },
      error: err => console.log('OOps sorry, error occured getting IsPublished from store in projectStatusSection component: ', err),
      complete: () => console.log('Completed getting IsPublished from ngrx store in projectStatusSection component')
    });
    this.initializeControls();
    this.setControls();
    this.setDates();
    this.monitorForValueChanges();
    console.log('completed', this.completed);
    console.log(this.completed?.toString().split('T')[0]);
    (<HTMLInputElement>document.getElementById('completedId')).value = this.completed?.toString().split('T')[0] as string;
   
  }

  initializeControls() {
    this.startedAbstractControl = this.statusForm.get('started');
   

  
    this.completedAbstractControl = this.statusForm.get('completed');
    
    this.publishedAbstractControl = this.statusForm.get('published');
   
  }

  setControls() {
    this.startedAbstractControl?.setValue(this.started);
    this.completedAbstractControl?.setValue(this.completed);
    this.publishedAbstractControl?.setValue(this.published);
  }
  setDates() {

    
    (<HTMLInputElement>document.getElementById('startedId')).value = this.started?.toString().split('T')[0] as string; 
    (<HTMLInputElement>document.getElementById('completedId')).value = this.completed?.toString().split('T')[0] as string; 
    console.log(this.completed?.toString().split('T')[0]);
  
 
    
  }

  monitorForValueChanges() {
    this.startedAbstractControl?.valueChanges.subscribe({
      next: value => {
        this.editProjectStore.dispatch(new edipProjectActions.SetEditProjectStartDate(value));
      },
      error: err => console.log('OOPs, sorry there was an error changing start Date, ', err),
      complete: () => console.log('Completed: the value of the start date in project-status section has been changed')
    });

    this.completedAbstractControl?.valueChanges.subscribe({
      next: value => {
        this.editProjectStore.dispatch(new edipProjectActions.SetEditProjectCompleteDate(value));
      },
      error: err => console.log('OOPs, sorry there was an error changing Complete Date, ', err),
      complete: () => console.log('Completed: the value of the complete date in project-status section has been changed')
    });
    
  }
  publishChange() {
    console.log('HAHAHa date changed');
    
  }
}
