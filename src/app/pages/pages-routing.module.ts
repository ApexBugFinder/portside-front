import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditModeComponent } from './edit-mode/edit-mode.component';

import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { HomeComponent } from './home/home.component';
import { PageShellComponent } from './page-shell/page-shell.component';
import { ProjectComponent } from './project/project.component';
import { AuthGuardService } from '../guards/auth-guard.service';
const routes: Routes = [

  { path: 'pages', component: PageShellComponent, children: [
     { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'projects', component: ProjectComponent },
    { path: 'experiences', component: ExperienceComponent },
    { path: 'education', component: EducationComponent },
    { path: 'editMode', 
      component: EditModeComponent,
      canActivate: [AuthGuardService]},
    { path: '**', component: HomeComponent }
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
