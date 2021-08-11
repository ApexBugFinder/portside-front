import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserComponent } from './user/user.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserComponent,


  // },
  children: [
      { path: '', redirectTo: 'view-profile', pathMatch: 'full' },
      {
        path: 'view-profile',
        component: ViewProfileComponent,
        outlet: 'profile',
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
         outlet: 'profile',
      },

    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
