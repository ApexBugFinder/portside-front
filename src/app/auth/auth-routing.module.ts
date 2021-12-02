import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { AuthGuardService } from '../guards/auth-guard.service';

const routes: Routes = [
    {
        path: 'auth/auth-callback',
        component: AuthCallbackComponent,


    },
    // {   path: 'auth/auth-callback/:id_token:access_token',
    //     redirectTo: '/auth/auth-callback', pathMatch: 'full',
    // }

];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule {}
