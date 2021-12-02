import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { LoggedInProfileComponent } from './user/logged-in-profile/logged-in-profile.component';
import { ViewProfileComponent } from './user/view-profile/view-profile.component';

const routes: Routes = [
  { path: "", redirectTo: "pages/home", pathMatch: "full" },
  //  {path: 'users', redirectTo: 'users', pathMatch: 'full'},
  {
    path: "pages",
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "users",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  // { path: '**', redirectTo: 'pages', pathMatch:'full'}
  {
    path: "view-profile",
    component: ViewProfileComponent,
    outlet: "profile",
  },
  {
    path: "edit-profile",
    component: EditProfileComponent,
    outlet: "profile",
  },
  {
    path: "loggedin-profile",
    component: LoggedInProfileComponent,
    outlet: "sidemenu",
  }

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {useHash: true}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
