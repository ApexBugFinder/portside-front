import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, pipe } from "rxjs";
import { map, timeout } from "rxjs/operators";
import { Constants } from "../../helpers/Constants";
import { Project } from "../models/project";
import { ProjectRequirement } from "../models/projectRequirement";
import { Store, select } from "@ngrx/store";
import * as fromProject from "../state";
import * as projectActions from "../state/project.actions";
import * as fromShare from "../../shared/state";
import { AuthService } from "../../auth/auth.service";
import { ProjectLink } from "../models/projectLink";
import { printServiceInfo } from "src/app/helpers/helperFunctions";

@Injectable({
  providedIn: 'root',
})
export class ProjectLinkService {
  private ctlrName;
  private apiAddress;
  private userID:string;
  private hdrs: HttpHeaders;
  private apiRt;
  private clientRt;

  constructor (
    private http: HttpClient,
    private projectStore: Store<fromProject.State>,
    private shareStore: Store<fromShare.SharedState>,
    private authService: AuthService
    ) {
      this.shareStore.pipe(select(fromShare.getUserId)).subscribe(value => this.userID = value);
    this.ctlrName = 'projectlinks/';
    this.apiRt = Constants.apiRoot;
    this.apiAddress  = this.apiRt + this.ctlrName;
    this.hdrs = new HttpHeaders();
    this.clientRt = Constants.clientRoot;
  }

  saveItem( link: ProjectLink) : Observable<ProjectLink[]> {
    let b: Observable<ProjectLink[]>;
    const urlAddress = this.apiAddress;

    this.hdrs = new HttpHeaders()
      .set('Access-Control-Allow-Origin', [
        this.apiRt,
        this.apiAddress,
        Constants.clientRoot
      ])
      .set('Access-Control-Allow-Methods', ['GET', 'POST', 'DELETE'])
      .set('Authorization', this.authService.getAuthorizationHeaderValue())
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('content-type', 'application/json');

      printServiceInfo(urlAddress, link, this.hdrs);
      return this.http.post<ProjectLink[]>(urlAddress, link, { headers: this.hdrs})
        .pipe(
          timeout(10000),
          map((projectLinks: ProjectLink[])=> {
          console.log(projectLinks);
          return projectLinks;
        } )
        );
  }
  updateItem(item: ProjectLink) : Observable<ProjectLink[]> {
    let b: Observable<ProjectLink[]>;
    const urlAddress = this.apiAddress + item.id;

    this.hdrs = new HttpHeaders()
      .set("Access-Control-Allow-Origin", [
        this.apiRt,
        this.apiAddress,
        Constants.clientRoot,
      ])
      .set("Access-Control-Allow-Methods", ["GET", "PUT", "DELETE"])
      .set("Authorization", this.authService.getAuthorizationHeaderValue())
      .set("Access-Control-Allow-Headers", "Content-Type")
      .set("content-type", "application/json");

      printServiceInfo(urlAddress, item, this.hdrs);

      return this.http.put<ProjectLink[]>(urlAddress, item, { headers: this.hdrs})
        .pipe(
          timeout(10000),
          map((projectLinks: ProjectLink[]) => {
            console.log(projectLinks);
            return projectLinks;
          })
          );

  }
  deleteItem(item: ProjectLink): Observable<ProjectLink[]> {
    let be: Observable<ProjectLink[]>;
    const urlAddress = this.apiAddress + item.id;

    this.hdrs = new HttpHeaders()
      .set("Access-Control-Allow-Origin", [
        this.apiRt,
        this.apiAddress,
        Constants.clientRoot,
      ])
      .set("Access-Control-Allow-Methods", ["GET", "PUT", "DELETE"])
      .set("Authorization", this.authService.getAuthorizationHeaderValue())
      .set("Access-Control-Allow-Headers", "Content-Type")
      .set("content-type", "application/json");

      printServiceInfo(urlAddress, item, this.hdrs);

      return this.http.delete<ProjectLink[]>(urlAddress, { headers: this.hdrs})
        .pipe(
          timeout(10000),
          map((projectLinks: ProjectLink[]) => {
            console.log('Project Links returned to service: ', projectLinks)
            return projectLinks;
          })
        );
  }
}