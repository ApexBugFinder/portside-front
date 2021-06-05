import { Component, Input, OnInit } from '@angular/core';
import { Degree } from '../../Models/degree/degree';
import { Store, select  } from '@ngrx/store';
import * as fromDegreeShell from '../state';
import * as DegreeActions from '../state/degree-shell.actions';
import { MatDialog } from '@angular/material/dialog';
import { EditDegreeShellComponent } from '../edit-degree-shell/edit-degree-shell.component';
@Component({
  selector: 'app-view-degree',
  templateUrl: './view-degree.component.html',
  styleUrls: ['./view-degree.component.scss']
})
export class ViewDegreeComponent implements OnInit {

  @Input() myDegree: Degree;
  constructor(
    private degreeShellStore: Store<fromDegreeShell.DegreeShellState>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.myDegree.degreeName);
  }

  editDegree() {
    // set current Degree
    this.degreeShellStore.dispatch(new DegreeActions.SetCurrentDegreeFromViewDegree(this.myDegree))
    const dialogRef = this.dialog.open(EditDegreeShellComponent, {

      panelClass: 'custom-modalbox2',
    });
  }
}
