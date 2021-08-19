import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './user/view-profile/view-profile.component';

const routes: Routes = [
   { path: '', redirectTo: 'pages/home', pathMatch: 'full' },
  //  {path: 'users', redirectTo: 'users', pathMatch: 'full'},
  { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m=> m.PagesModule)},
  { path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  // { path: '**', redirectTo: 'pages', pathMatch:'full'}
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
