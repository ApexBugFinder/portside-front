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

@Injectable({
  providedIn: "root",
})
export class ProjectReqService {
  private ctlrName;
  private apiAddress;
  private userID: string;
  private hdrs: HttpHeaders;
  private apiRt;
  private clientRt;

  constructor(
    private http: HttpClient,
    private projectStore: Store<fromProject.State>,
    private shareStore: Store<fromShare.SharedState>,
    private authService: AuthService
  ) {
    this.shareStore
      .pipe(select(fromShare.getUserId))
      .subscribe((value) => (this.userID = value));
    this.ctlrName = "projectrequirements/";
    this.apiRt = Constants.apiRoot;
    this.apiAddress = this.apiRt + this.ctlrName;
    this.hdrs = new HttpHeaders();
    this.clientRt = Constants.clientRoot;
  }

  public createItem(item: ProjectRequirement): Observable<ProjectRequirement[]> {
    const address = this.apiAddress;
    this.hdrs = new HttpHeaders()
      .set("Access-Control-Allow-Origin", [
        this.apiRt,
        this.apiAddress,
        Constants.clientRoot,
      ])
      .set("Authorization", this.authService.getAuthorizationHeaderValue())
      .set("Access-Contol-Allow-Methods", ["POST", "GET"])
      .set("content-type", "application/json");
    this.printServiceInfo(address, item, this.hdrs);
    return this.http
      .post<ProjectRequirement[]>(address, item, { headers: this.hdrs })
      .pipe(
        timeout(8000),
        map((ProjReqs: ProjectRequirement[]) => {
          console.log(
            "Project Requirements returned from database: ",
            ProjReqs
          );
          return ProjReqs;
        })
      );
  }
  public createItems(items: ProjectRequirement[]): Observable<ProjectRequirement> {
    const address = this.apiAddress + "new";
    this.hdrs = new HttpHeaders()
      .set("Access-Control-Allow-Origin", [
        this.apiRt,
        this.apiAddress,
        Constants.clientRoot,
      ])
      .set("Authorization", this.authService.getAuthorizationHeaderValue())
      .set("Access-Contol-Allow-Methods", ["POST", "GET"])
      .set("content-type", "application/json");
    this.printServiceInfo(address, items, this.hdrs);
    return this.http
      .post<ProjectRequirement>(address, items, { headers: this.hdrs })
      .pipe(
        timeout(8000),
        map((newProjReq: ProjectRequirement) => {
          console.log(
            "New Project Requirement returned from database: ",
            newProjReq
          );
          return newProjReq;
        })
      );
  }
  // CREATE PROJECT REQ
  public saveItem(
    item: ProjectRequirement | undefined
  ): Observable<ProjectRequirement[]> {
    this.hdrs = new HttpHeaders();
    //  const urlAddress = this.apiAddress;
    const address = this.apiAddress;

    this.hdrs = new HttpHeaders()
      .set("Access-Control-Allow-Origin", [
        this.apiRt,
        this.apiAddress,
        Constants.clientRoot,
      ])
      .set("Authorization", this.authService.getAuthorizationHeaderValue())
      .set("Access-Control-Allow-Methods", ["PUT", "POST", "DELETE", "GET"])
      .set("content-type", "application/json");

    return this.http
      .post<ProjectRequirement[]>(address, item, { headers: this.hdrs })
      .pipe(
        timeout(8000),
        map((newProject: ProjectRequirement[]) => {
          console.log("New Project added to DB: ", newProject);
          return newProject;
        })
      );
  }

  // READ ALL PROJECTREQUIREMENTS BY USER
  public readAll(): Observable<ProjectRequirement[]> {
    const address = "all/" + this.userID;
    const urlAddress = this.apiAddress + address;

    this.hdrs = new HttpHeaders()
      .set("Access-Control-Allow-Origin", [
        this.apiRt,
        this.apiAddress,
        Constants.clientRoot,
      ])
      .set("Access-Control-Allow-Methods", "GET")
      .set("content-type", "application/json");

    this.printServiceInfo(urlAddress, this.userID, this.hdrs);
    return this.http
      .get<ProjectRequirement[]>(urlAddress, { headers: this.hdrs })
      .pipe(
        timeout(2000),
        map((usersProjectRequirements: ProjectRequirement[]) => {
          console.log(
            "User's Projects Found:  " +
              JSON.stringify(usersProjectRequirements)
          );
          // this.projectStore.dispatch(projectActions.addProjects({projects: usersProjects}));
          usersProjectRequirements.forEach((ij: ProjectRequirement) => {
            let p = JSON.stringify(ij.editState);
            console.log(p);

            ij.stateHistory = [ij.editState as string];

            console.log(ij.stateHistory);
          });

          return usersProjectRequirements;
        })
      );
  }

  //  UPDATE PROJECT REQUIREMENTS
  public updateItems(
    item: ProjectRequirement[] | undefined
  ): Observable<ProjectRequirement[]> {
    // FIX URL ADDRESS
    const urlAddress = this.apiAddress + "updateRange";

    this.hdrs = new HttpHeaders()
      .set("Access-Control-Allow-Origin", [
        this.apiRt,
        this.apiAddress,
        Constants.clientRoot,
      ])
      .set("Authorization", this.authService.getAuthorizationHeaderValue())
      .set("Access-Control-Allow-Methods", ["PUT", "POST", "DELETE", "GET"])
      .set("Access-Control-Allow-Headers", "Content-Type")
      .set("content-type", "application/json");

    this.printServiceInfo(urlAddress, item, this.hdrs);

    return this.http
      .put<ProjectRequirement[]>(urlAddress, item, { headers: this.hdrs })
      .pipe(
        timeout(8000),
        map((updatedItem: ProjectRequirement[]) => {
          console.log("Updated Item: ", updatedItem);
          return updatedItem;
        })
      );
  }

  // DELETE PROJECTREQUIREMENT
  public deleteItem(id: string | undefined): Observable<ProjectRequirement[]> {
    console.log("HELLO");
    const address = id;
    const urlAddress = this.apiAddress + id;
    this.hdrs = new HttpHeaders()
      .set("Access-Control-Allow-Origin", [
        this.apiRt,
        this.apiAddress,
        Constants.clientRoot,
      ])
      .set("Access-Control-Allow-Methods", ["DELETE", "GET", "PUT"])
      .set("Access-Control-Allow-Headers", "Content-Type")
      .set("content-type", "application/json");

    this.printServiceInfo(urlAddress, id, this.hdrs);

    return this.http
      .delete<ProjectRequirement[]>(urlAddress, { headers: this.hdrs })
      .pipe(
        timeout(2000),
        map((itemsLeft: ProjectRequirement[]) => {
          console.log("Project Requirements in Project: ", itemsLeft);
          return itemsLeft;
        })
      );
  }

  public loadItems(projectID: string): Observable<ProjectRequirement[]> {
    const urlAddress = this.apiAddress + 'project/' + projectID;

    this.hdrs = new HttpHeaders()
      .set("Access-Control-Allow-Origin", [
        this.apiRt,
        this.apiAddress,
        Constants.clientRoot,
      ])
      .set("Access-Control-Allow-Methods", [ "GET", "PUT"])
      .set("Access-Control-Allow-Headers", "Content-Type")
      .set("content-type", "application/json");

      return this.http.get<ProjectRequirement[]>(urlAddress, { headers: this.hdrs })
      .pipe(
        timeout(10000),
        map((reqs: ProjectRequirement[]) => {
          console.log("Project Requirements in Project: ", reqs);
          return reqs;
        })

      );
  }
  public printServiceInfo(address: string, payload: any, httpHrd: HttpHeaders) {
    console.log("urlAddress: ", address);
    console.log("HEADERS:", httpHrd);
    console.log("payload: ", payload);
  }

  public processReqs(reqs: ProjectRequirement[]) {
    let reqsToAdd: ProjectRequirement[] = [];
    let reqsToDelete: ProjectRequirement[] = [];
    let reqsNoChange: ProjectRequirement[] = [];

    reqs.forEach((i) => {
      if (i.editState == "ok") {
        reqsNoChange.push(i);
      } else if (i.editState == "add") {
        reqsToAdd.push(i);
      } else {
        reqsToDelete.push(i);
      }
    });

    this.createItems(reqsToAdd);
  }
}