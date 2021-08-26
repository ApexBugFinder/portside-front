import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User, UserState, ViewUserMatDialogData } from '../../Models/user';
import { ViewUserComponent } from '../../view-user/view-user.component';
import * as fromShared from '../../../shared/state';
import { Store, select } from '@ngrx/store';
import * as sharedActions from '../../../shared/state/shared-actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @Input() user: UserState;
  userData: User;
  profilePic$: Observable<string>;
  constructor(
    public dialog:MatDialog,
    private sharedStore: Store<fromShared.SharedState>
    ) {
      this.profilePic$ = this.sharedStore.pipe(select(fromShared.getDefaultProfilePic));
    }

  ngOnInit(): void {
    console.log(this.user);

    console.log(this.user.username);
  }
  viewUser() {
    this.sharedStore.dispatch(new sharedActions.SetUserId(this.user.id));
    this.sharedStore.dispatch(new sharedActions.SetUserProfilePic(this.user.userPicUrl));


    let myData: ViewUserMatDialogData = {
      user: this.user
    };
    const dialogRef= this.dialog.open(ViewUserComponent, {
      data: myData,
      width: 'auto',
      panelClass: 'custom-modalbox2'
    });
  }

}
