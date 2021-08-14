import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store'
import * as fromUser from './user.reducer';
import * as fromUserRoot from '../index';
import * as fromSearchBar from '../searchbar/state/searchbar.reducer';
import * as fromSearchBarResults from '../searchbar-results/state/searchbar-results.reducer';
import { User } from '../Models/user';
import { UserModuleState } from '..';
import * as fromRoot from '../../state/app.state';
import { UserModule } from '../user.module';

export interface UserState extends fromUserRoot.State {
    user: fromUser.UserState;
}

export const getUserId = createSelector(
    fromUserRoot.selectUserState,
    state => state.id
);

export const getUsername = createSelector(
    fromUserRoot.selectUserState,
    state => state.username
);

export const getUserEmailAddress = createSelector(
    fromUserRoot.selectUserState,
    state => state.email
);

export const getProfilePicUrl = createSelector(
  fromUserRoot.selectUserState,
  state => state.userPicUrl
);
export const getCurrentUserInfo = createSelector(
    fromUserRoot.selectUserState,
    state => {
        return {
            username: state.username,
            email: state.email,
            id: state.id,
            userPicUrl: state.userPicUrl
        };
        }

);
