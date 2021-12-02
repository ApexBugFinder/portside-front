import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee, faKey, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../auth/state';
import { AuthService } from '../auth/auth.service';
import * as fromShared from '../shared/state';
import * as SharedActions from '../shared/state/shared-actions';
import {isMobile } from '../helpers/helperFunctions';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faCoffee = faCoffee;
  fakey = faKey;
  faDoor = faDoorOpen;
  isAuth$: Observable<boolean>;
  isSideMenuOpen$: Observable<boolean>;
  isSideMenuOpen: boolean;
  sharedUserID$: Observable<string>;
  sharedUserId: string;
  constructor(private router: Router,
              private authService: AuthService,
              private authStore: Store<fromAuth.State>,
              private sharedStore: Store<fromShared.SharedState>) {
                this.isAuth$ = this.authStore.pipe(select(fromAuth.getIsAuthenticated));
                this.isSideMenuOpen$ = this.sharedStore.pipe(select(fromShared.getSideMenuState));
                this.sharedUserID$ = this.sharedStore.pipe(select(fromShared.getUserId));
              }

  ngOnInit(): void {
    this.sharedUserID$.subscribe( {
    next:(ID:string) =>{
      if(ID) {
        this.sharedUserId = ID;
      }
    },
    complete: () => console.log('Completed successful fetch of sharedUserId from SharedState'),
    error: (err) => console.log('OOps something went wrong fetching the sharedUserId from SharedState',err)}
    );
    this.isSideMenuOpen$.subscribe({
      next: (isOpen: boolean) => {

          this.isSideMenuOpen = isOpen;



      },
      complete: () => console.log('Completed: Fetching SideMenu State from the SharedState'),
      error: err => console.log('OOPS something went wrong when fetching the SideMenu State',err)
    })
  }

  logout() {
    this.authService.logout();
  }


  toggleMenu() {
    console.log('toggle Menu');
    let winWidth= window.innerWidth;
    console.log(winWidth);
    // If the screen is in mobile mode and the sideMenu is open => close sidemenu
 if (isMobile(winWidth) && this.sharedUserId == undefined) {
   this.sharedStore.dispatch(new SharedActions.HideSideMenu());
   this.router.navigate(['pages/home']);
 } else if (isMobile(winWidth) && !this.isSideMenuOpen) {
   // If the screen is in mobile mode and the sideMenu is closed => open sidenMenu
   console.log("SHOW");
   this.sharedStore.dispatch(new SharedActions.ShowSideMenu());
   return;
 } else if (isMobile(winWidth) && this.isSideMenuOpen) {
   this.sharedStore.dispatch(new SharedActions.HideSideMenu());
   return;
 } else {
   this.router.navigate(["pages/home"]);
   return;
 }

  }

}
