import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromEditProject from '../../project/edit/state';
import * as editProjectActions from '../../project/edit/state/edit-project.actions';
import { Observable } from 'rxjs';
import { Project } from 'src/app/project/models/project';
import { ThisReceiver } from '@angular/compiler';
import { Constants } from 'src/app/helpers/Constants';

@Component({
  selector: 'app-page-shell',
  templateUrl: './page-shell.component.html',
  styleUrls: ['./page-shell.component.scss']
})
export class PageShellComponent implements OnInit {

  userProject$: Observable<Project[]>
  constructor( private editProjectStore: Store<fromEditProject.EditProjectState>,) { 

    this.editProjectStore.dispatch(new editProjectActions.LoadProjectsByProjectCreatorIDFromDB(Constants.userID));
  }

  ngOnInit(): void {
  }

}
