import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as sharedActions from '../../shared/state/shared-actions';
import * as fromShared from '../../shared/state';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userName: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
                      private sharedStore: Store<fromShared.SharedState>) { }

  ngOnInit(): void {
    // this.router.navigate(['users/view-profile']);
    const routeParams = this.route.snapshot.paramMap;
    console.log('this route: ', this.route.snapshot.url);
    const usernameFromRoute = routeParams.get('username');
    console.log('the username: ', usernameFromRoute);
     this.sharedStore.dispatch(new sharedActions.SetUsername(usernameFromRoute as string));
     this.sharedStore.dispatch(new sharedActions.LoadUserState(usernameFromRoute as string));
    // this.route.queryParams.subscribe(params => {
    //   this.userName = params['username'];
    //   console.log('MY username: ', this.userName);
    //   this.sharedStore.dispatch(new sharedActions.SetUsername(this.userName));
    //   this.sharedStore.dispatch(new sharedActions.LoadUserState(this.userName));
    // });
    this.router.navigate(["pages/projects"]);
  }

}
