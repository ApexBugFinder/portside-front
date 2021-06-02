import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, pipe} from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { Constants } from '../helpers/Constants';
import { Project  } from './models/project';
import { ProjectRequirement } from './models/projectRequirement';
import { Store, select } from '@ngrx/store';
import * as fromProject from './state';
import * as projectActions from './state/project.actions';
import * as fromShare from '../shared/state';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private ctlrName;
  private apiAddress;
  private userID:string;
  private hdrs: HttpHeaders;
  private apiRt;
  private clientRt;

  constructor (
    private http: HttpClient,
    private projectStore: Store<fromProject.State>,
    private shareStore: Store<fromShare.SharedModuleState>
    ) {
      this.shareStore.pipe(select(fromShare.getUserId)).subscribe(value => this.userID = value);
    this.ctlrName = 'projects/';
    this.apiRt = Constants.apiRoot;
    this.apiAddress  = this.apiRt + this.ctlrName;
    this.hdrs = new HttpHeaders();

    this.clientRt = Constants.clientRoot;
  }


// CREATE PROJECT
  public createItem(item: Project | undefined) : Observable<Project> {
this.hdrs = new HttpHeaders();
  //  const urlAddress = this.apiAddress;
    const address = this.apiAddress + "new";

    const hdrs = new HttpHeaders()
      .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, Constants.clientRoot])
      .set('Access-Control-Allow-Methods', ['PUT','POST','DELETE', 'GET'])
      .set('content-type', 'application/json');

    console.log('addresss: ', address);
    console.log('HEADERS: ', this.hdrs);
    console.log('item to send:', item);
    return this.http.post<Project>(
    address,
      item,
     {headers: hdrs}
    ).pipe(
      timeout(2000),
      map((newProject: Project) => {
      console.log('New Project added to DB: ', newProject);
      return newProject;
    }));
  }
// CREATE LINKS

  // READ ALL PROJECTS BY USER
 public readAll(id: string | undefined): Observable<Project[]> {

    const address = 'all/' + Constants.userID;
    const urlAddress = this.apiAddress + address;

    const hdrs = new HttpHeaders()
  .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, Constants.clientRoot])
  .set('Access-Control-Allow-Methods', 'GET')
  .set('content-type', 'application/json');


    this.printServiceInfo(urlAddress, id, hdrs);
    return this.http.get<Project[]>(
      urlAddress,
      { headers: hdrs })
      .pipe(
        timeout(2000),
        map((usersProjects: Project[]) => {
        console.log('User\'s Projects Found:  ' + JSON.stringify(usersProjects) );
        // this.projectStore.dispatch(projectActions.addProjects({projects: usersProjects}));
        usersProjects.forEach(up => {up?.projectRequirements?.forEach((ij: ProjectRequirement) => {


          let p = JSON.stringify(ij.editState);
          console.log(p);

            ij.stateHistory = [ij.editState as string];


          console.log(ij.stateHistory);

        })
      });



        return usersProjects;
      } ));

  }


  // GET PROJECT BY ID
public readItem(id: string | undefined): Observable<Project> {

    const address = id;
    const urlAddress = this.apiAddress + address;


this.hdrs = new HttpHeaders()
  .set('Access-Control-Allow-Origin', [this.apiRt])
  .set('Access-Control-Allow-Methods', 'GET')
  .set('Access-Control-Allow-Headers', 'Content-Type')
  .set('content-type', 'application/json');

  this.printServiceInfo(urlAddress, id, this.hdrs);
    return this.http.get<Project>(
      urlAddress,
      {headers: this.hdrs}
    ).pipe(
      timeout(2000),
      map((item: Project) => {
      console.log('Item Found: ' + item);
      return item;
    }));
  }


//  UPDATE PROJECT
public updateItem(item: Project | undefined) : Observable<Project> {

    const urlAddress = this.apiAddress + item?.id;

 const hdrs = new HttpHeaders()
  .set('Access-Control-Allow-Origin',  [this.apiRt, this.apiAddress, Constants.clientRoot])
  .set('Access-Control-Allow-Methods', ['PUT','POST','DELETE', 'GET'])
  .set('Access-Control-Allow-Headers', 'Content-Type')
  .set('content-type', 'application/json');

  this.printServiceInfo(urlAddress, item, hdrs);

    return this.http.put<Project>(
      urlAddress,
      item,
      { headers: hdrs }
    ).pipe(
      timeout(2000),
      map((updatedItem: Project) => {
      console.log('Updated Item: ', updatedItem);
      return updatedItem;
    }));
  }


  // DELETE PROJECT
public deleteItem(id: string | undefined): Observable<Project> {
    console.log('HELLO');
    const address = id;
    const urlAddress = this.apiAddress + id;
    this.hdrs = new HttpHeaders();

    this.hdrs.set('Access-Control-Allow-Origin', [this.apiRt])
              .set('Access-Control-Allow-Methods', 'DELETE')
              .set('Access-Control-Allow-Headers', 'Content-Type');

    this.printServiceInfo(urlAddress, id, this.hdrs);


    return this.http.delete<Project>(
      urlAddress,
      {headers: this.hdrs}
    ).pipe(
      timeout(2000),
      map((itemDeleted:Project)=> {
      console.log('Item Deleted: ', itemDeleted);
      return itemDeleted;
    }));
  }

  public printServiceInfo(address: string, payload: any, httpHrd: HttpHeaders){

    console.log('urlAddress: ', address);
    console.log('HEADERS:', httpHrd);
    console.log('payload: ', payload);

  }
}


