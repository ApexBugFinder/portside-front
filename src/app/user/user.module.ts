import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { UserService } from './Models/user.service';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/user.reducer';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SharedModule } from '../shared/shared.module';
import { SearchbarResultsComponent } from './searchbar-results/searchbar-results.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user.effects';
import { SearchBarEffects } from './searchbar/state/searchbar.effects';
import { userReducers } from '.';
import { ResultComponent } from './searchbar-results/result/result.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileButtonsComponent } from './profile-buttons/profile-buttons.component';
import { LoggedInProfileComponent } from './logged-in-profile/logged-in-profile.component';

@NgModule({
  declarations: [
    UserComponent,
    SearchbarComponent,
    SearchbarResultsComponent,
    ResultComponent,
    ViewUserComponent,
    ViewProfileComponent,
    EditProfileComponent,
    ProfileButtonsComponent,
    LoggedInProfileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    StoreModule.forFeature('userState', userReducers),
    EffectsModule.forFeature([UserEffects, SearchBarEffects]),
  ],
  entryComponents: [ViewUserComponent],

  exports: [SearchbarComponent, SearchbarResultsComponent, LoggedInProfileComponent],
  providers: [{ provide: 'USER_SERVICE', useValue: UserService }],
  // bootstrap: [ViewUserComponent],
})
export class UserModule {}
