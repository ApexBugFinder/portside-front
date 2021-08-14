import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';

import * as fromUserState from '../state';
import * as UserActions from '../state/user.actions';
import { User } from '../Models/user';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  iconSave = faSave;
  editProfileForm: FormGroup;
  userToEdit$: Observable<User>;
  userToEdit: User;
  origUserToEdit: User;
  userNameAbstractControl: AbstractControl|null;
  emailAbstractControl: AbstractControl | null;
  constructor(
    private fb: FormBuilder,
    private userStore: Store<fromUserState.UserState>
  ) {
    this.userToEdit$ = this.userStore.pipe(select(fromUserState.getCurrentUserInfo));
    this.editProfileForm = this.fb.group({
      username: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    this.userToEdit$.subscribe({
      next: (value: User) => {
        if (value) {

          this.userToEdit = JSON.parse(JSON.stringify(value));
          this.origUserToEdit = value;
        }
      },
      error: (err) =>
        console.log(
          "OOps sorry, error occured getting a User's Information from the user store Profile Edit Shell component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed gettinga User's Information from the user store Profile Edit Shell component"
        ),
    });
    this.initControls();
    this.setControls();
    this.monitorAndControl();
  }

  initControls() {
    this.emailAbstractControl = this.editProfileForm.get('email');
    this.userNameAbstractControl = this.editProfileForm.get('username')
  }
  setControls() {
    this.emailAbstractControl?.setValue(this.userToEdit.email);
    this.userNameAbstractControl?.setValue(this.userToEdit.username);
  }
  monitorAndControl() {
    this.emailAbstractControl?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (value: string|undefined) => {
          if (value) {
            console.log(value);
            this.userStore.dispatch(new UserActions.SetUserEmail(
              value as string
              ));
          }
        },
         error: (err) =>
        console.log(
          "OOps sorry, error occured setting a User's Email Information from the user store Profile Edit Shell component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed setting a User's Email Information from the user store Profile Edit Shell component"
        )

      });

      this.userNameAbstractControl?.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe({
          next: (value: string | undefined) => {
            if (value) {
              this.userStore.dispatch(
                new UserActions.SetUserStateUsername(
                  value as string
                  ));
            }
          },
          error: (err) =>
            console.log(
              "OOps sorry, error occured setting a User's Username Information from the user store Profile Edit Shell component: ",
              err
            ),
          complete: () =>
            console.log(
              "Completed setting a User's Username Information from the user store Profile Edit Shell component"
            ),
        });

  }
}
