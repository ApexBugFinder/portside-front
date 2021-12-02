import { Component, OnInit, Renderer2, DoCheck } from "@angular/core";
import { Store, select } from "@ngrx/store";

import { Observable } from "rxjs";
import { Project } from "src/app/project/models/project";

import * as fromShared from "../../shared/state";

@Component({
  selector: "app-page-shell",
  templateUrl: "./page-shell.component.html",
  styleUrls: ["./page-shell.component.scss"],
})
export class PageShellComponent implements OnInit {
  private userID: string = "";
  isAuth$: Observable<boolean>;
  userProject$: Observable<Project[]>;
  sideMenuIsOpen$: Observable<boolean>;
  isSideMenuOpen: boolean;
  constructor(private sharedStore: Store<fromShared.SharedState>) {
    this.sharedStore
      .pipe(select(fromShared.getUserId))
      .subscribe((id: string) => (this.userID = id));
    this.sideMenuIsOpen$ = this.sharedStore.pipe(
      select(fromShared.getSideMenuState)
    );
  }

  ngOnInit(): void {

  }
  ngDoCheck(): void {
this.sideMenuIsOpen$.subscribe({
  next: (isOpen: boolean) => {
    console.log(isOpen);
    this.isSideMenuOpen = isOpen;
  },
  complete: () =>
    console.log(
      "Completed Successfully fetching the SideMenu State from Shared State"
    ),
  error: (err) =>
    console.log(
      "OOPS there was an error fetching SideMenu State from the Shared State",
      err
    ),
});
  }
}
