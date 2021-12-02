import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User, UserState, ViewUserMatDialogData } from '../../Models/user';
import { ViewUserComponent } from '../../view-user/view-user.component';
import * as fromShared from '../../../shared/state';
import { Store, select } from '@ngrx/store';
import * as sharedActions from '../../../shared/state/shared-actions';
import { Observable } from 'rxjs';
import * as fromSharedData from '../../../shared/userData/state';
import * as sharedDataActions from '../../../shared/userData/state/userData.actions';

//  Data that is Inputted is packaged into the ViewUserMatDialogData object and
// Sent to ViewUserComponent
// Also sharedState UserId is Set

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  private innerWidth: number;
  @Input() user: UserState;
  userData: User;
  profilePic$: Observable<string>;
  constructor(
    public dialog:MatDialog,
    private sharedStore: Store<fromShared.SharedState>,
    private userDataStore: Store<fromSharedData.SharedUserDataState>

    ) {
      this.profilePic$ = this.sharedStore.pipe(select(fromShared.getDefaultProfilePic));
    }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    console.log(this.user);

    console.log(this.user.username);
  }
  viewUser() {

    this.sharedStore.dispatch(new sharedActions.SetUserId(this.user.id));
    this.userDataStore.dispatch(sharedDataActions.selectUser({UserId: this.user.id}));
    
    this.sharedStore.dispatch(new sharedActions.SetUserProfilePic(this.user.userPicUrl));
    let panelSize = '600px';
    let config: MatDialogConfig;


    let myData: ViewUserMatDialogData = {
      user: this.user
    };
     if (this.innerWidth < 600) {
      config =  {
      width: panelSize,
      panelClass: 'custom-modalbox2',
      data: myData,
      hasBackdrop: true
      }
    } else {
      config = {
        width: panelSize,
        panelClass: 'custom-modalbox2',
        data: myData,
        hasBackdrop: true,
      };
    }

    const dialogRef= this.dialog.open(ViewUserComponent, config);
  }

}
