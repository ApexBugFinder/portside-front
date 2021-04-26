import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, pipe, } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../helpers/Constants';
import { Project } from './project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private ctlrName;
  private apiAddress;
  private userID;
  private hdrs: HttpHeaders;
  private apiRt;


  constructor(private http: HttpClient) {
    this.ctlrName = 'Projects/';
    this.apiRt = Constants.apiRoot
    this.apiAddress  = this.apiRt + this.ctlrName;
    this.hdrs = new HttpHeaders();
    this.userID = Constants.userID;
  }

  public createItem(item: Project) : Observable<Project> {
this.hdrs = new HttpHeaders();
  //  const urlAddress = this.apiAddress;
    const address = this.apiAddress + "new";

    this.hdrs = new HttpHeaders()
      .set('Access-Control-Allow-Origin', [this.apiRt, Constants.clientRoot, this.apiAddress, address])
      .set('Access-Control-Allow-Methods', ['POST', 'GET', 'OPTIONS', 'DELETE', 'PUT'])
      .set('content-type', 'application/json');

    console.log('addresss: ', address);
    console.log('HEADERS: ', this.hdrs);
    return this.http.post<Project>(
    address,
      item,
      // {headers: this.hdrs}
    ).pipe(map((newProject: Project) => {
      console.log('New Project added to DB: ', newProject);
      return newProject;
    }));
  }

 public readAll(id: string): Observable<Project[]> {

    const address = 'all/' + Constants.userID;
    const urlAddress = this.apiAddress + address;

    const hdrs = new HttpHeaders()
  .set('Access-Control-Allow-Origin', [this.apiRt])
  .set('Access-Control-Allow-Methods', 'GET')
  .set('content-type', 'application/json');


console.log('address: ', urlAddress);
console.log('headers: ', hdrs);
    return this.http.get<Project[]>(
      urlAddress,
      { headers: this.hdrs })
      .pipe(map((usersProjects: Project[]) => {
        console.log('User\'s Projects Found:  ' + usersProjects );
        return usersProjects;
      } ));

  }
public readItem(id: string): Observable<Project> {

    const address = id;
    const urlAddress = this.apiAddress + address;


this.hdrs = new HttpHeaders()
  .set('Access-Control-Allow-Origin', [this.apiRt])
  .set('Access-Control-Allow-Methods', 'GET')
  .set('Access-Control-Allow-Headers', 'Content-Type')
  .set('content-type', 'application/json');

    return this.http.get<Project>(
      urlAddress,
      {headers: this.hdrs}
    ).pipe(map((item: Project) => {
      console.log('Item Found: ' + item);
      return item;
    }));
  }

public updateItem(item: Project) : Observable<Project> {


    const urlAddress = this.apiAddress + item.id;
item.projectCreatorID = Constants.userID;
this.hdrs = new HttpHeaders()
  .set('Access-Control-Allow-Origin', [this.apiRt ])
  .set('Access-Control-Allow-Methods', 'PUT')
  .set('Access-Control-Allow-Headers', 'Content-Type')
  .set('content-type', 'application/json');

  console.log('user ID:', item.projectCreatorID);
  console.log('urlAddress: ', urlAddress);
  console.log('headers: ', this.hdrs);
    return this.http.put<Project>(
      urlAddress,
      item,
      { headers: this.hdrs }
    ).pipe(map((updatedItem: Project) => {
      console.log('Updated Item: ', updatedItem);
      return updatedItem;
    }));
  }

public deleteItem(id: string) {

    const address = id;
    const urlAddress = this.apiAddress + id;
    this.hdrs = new HttpHeaders();

    this.hdrs.append('Access-Control-Allow-Origin', [this.apiRt]);
    this.hdrs.append('Access-Control-Allow-Methods', 'DELETE');
    this.hdrs.append('Access-Control-Allow-Headers', 'Content-Type');

    this.http.delete<Project>(
      urlAddress,
      {headers: this.hdrs}
    ).pipe(map((itemDeleted:Project)=> {
      console.log('Item Deleted: ', itemDeleted);
      return itemDeleted;
    }));
  }
}
