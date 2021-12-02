import { Component, Input, OnInit } from '@angular/core';
import { Degree } from '../../Models/degree/degree';
import { Store, select  } from '@ngrx/store';
import * as fromDegreeShell from '../state';
import * as DegreeActions from '../state/degree-shell.actions';
import { MatDialog } from '@angular/material/dialog';
import { EditDegreeShellComponent } from '../edit-degree-shell/edit-degree-shell.component';
import * as fromAuth from '../../../auth/state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-degree',
  templateUrl: './view-degree.component.html',
  styleUrls: ['./view-degree.component.scss']
})
export class ViewDegreeComponent implements OnInit {

  @Input() myDegree: Degree;
  isAuth$: Observable<boolean>;
  isAuth: boolean;
  constructor(
    private degreeShellStore: Store<fromDegreeShell.DegreeShellState>,
    private authStore: Store<fromAuth.State>,
    private dialog: MatDialog
  ) {
    this.isAuth$ = this.authStore.pipe(select(fromAuth.getIsAuthenticated));
   }

  ngOnInit(): void {
    this.isAuth$.subscribe( {
    next:(auth: boolean) =>{
      if (auth) {
        this.isAuth = auth;
      }
    },
    complete: () => console.log('Completed successful fetch of isAuth from the AuthState'),
    error: (err) => console.log('OOPs there was a problem fetching isAuth from the AuthState',err)}
    );
  }

  editDegree() {
    // set current Degree
    if (this.isAuth) {
        this.degreeShellStore.dispatch(
          new DegreeActions.SetCurrentDegreeFromViewDegree(this.myDegree)
        );
        const dialogRef = this.dialog.open(EditDegreeShellComponent, {
          panelClass: "custom-modalbox2",
        });
    }

  }
}
