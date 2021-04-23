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

  createItem(item: Project) : Observable<Project>{
    const address = '';
    const urlAddress = this.apiAddress + address;

    this.hdrs.append('Access-Control-Allow-Origin', [this.apiRt]);
    this.hdrs.append('Access-Control-Allow-Methods', 'POST');
    this.hdrs.append('Access-Control-Allow-Headers', 'Content-Type');
    return this.http.post<Project>(
      urlAddress,
      item,
      {headers: this.hdrs}
    ).pipe(map((newProject: Project) => {
      console.log('New Project added to DB: ', newProject);
      return newProject;
    }));
  }

  readAll(id: string): Observable<Project[]> {

    const address = 'all/' + Constants.userID;
    const urlAddress = this.apiAddress + address;

  this.hdrs.append('Access-Control-Allow-Origin', [this.apiRt]);
  this.hdrs.append('Access-Control-Allow-Methods', 'GET');
  this.hdrs.append('Access-Control-Allow-Headers', 'Content-Type');

    return this.http.get<Project[]>(
      urlAddress,
      { headers: this.hdrs })
      .pipe(map((usersProjects: Project[]) => {
        console.log('User\'s Projects Found:  ' + usersProjects );
        return usersProjects;
      } ));

  }
  readItem(id: string): Observable<Project> {

    const address = id;
    const urlAddress = this.apiAddress + address;

      this.hdrs.append('Access-Control-Allow-Origin', [this.apiRt]);
  this.hdrs.append('Access-Control-Allow-Methods', 'GET');
  this.hdrs.append('Access-Control-Allow-Headers', 'Content-Type');

    return this.http.get<Project>(
      urlAddress,
      {headers: this.hdrs}
    ).pipe(map((item: Project) => {
      console.log('Item Found: ' + item);
      return item;
    }));
  }

  updateItem(item: Project)  {

    const address = this.userID;
    const urlAddress = this.apiAddress + this.userID;


    this.hdrs.append('Access-Control-Allow-Origin', [this.apiRt]);
    this.hdrs.append('Access-Control-Allow-Methods', 'GET');
    this.hdrs.append('Access-Control-Allow-Headers', 'Content-Type');
    return this.http.put<Project>(
      urlAddress,
      item,
      { headers: this.hdrs }
    ).pipe(map((updatedItem: Project) => {
      console.log('Updated Item: ', updatedItem);
      return updatedItem;
    }));
  }

  deleteItem(id: string) {

    const address = id;
    const urlAddress = this.apiAddress + id;

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
