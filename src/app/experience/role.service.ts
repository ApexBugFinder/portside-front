import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, pipe} from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { Constants } from '../helpers/Constants';
import { Role } from './Models/role';

import { Store, select } from '@ngrx/store';
import * as fromShared from '../shared/state';
import { printServiceInfo } from '../helpers/helperFunctions';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private ctlrName;
  private apiAddress;
  private userID: string;
  private hdrs: HttpHeaders;
  private apiRt;
  private clientRt;
  private userID$: Observable<string>;

  constructor(
    private http: HttpClient,
    private userStateStore: Store<fromShared.SharedState>
    ) {
    this.ctlrName = 'Roles/';
    this.apiRt = Constants.apiRoot;
    this.apiAddress = this.apiRt + this.ctlrName;
    this.hdrs = new HttpHeaders();
    this.userStateStore
      .pipe(select(fromShared.getUserId))
        .subscribe((id:string) => this.userID = id);
    this.clientRt = Constants.clientRoot;

  }

  // CREATE Role
  public createItem(item: Role | undefined) : Observable<Role[]> {
    this.hdrs = new HttpHeaders();

        const address = this.apiAddress + "new";
        console.log('item to send: ', item);
        const hdrs = new HttpHeaders()
          .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, Constants.clientRoot])
          .set('Access-Control-Allow-Methods', ['PUT','POST', 'GET'])
          .set('content-type', 'application/json');

        printServiceInfo(address, item, this.hdrs);
        return this.http.post<Role[]>(
        address,
          item,
         {headers: hdrs}
        ).pipe(
          timeout(10000),
          map((roles: Role[]) => {
          console.log('Roles in DB: ', roles);
          return roles;
        }));
      }


     // READ ALL RoleS BY Experience

public readAll(currentExpID: string): Observable<Role[]> {


      const address = 'all/' + currentExpID;
      const urlAddress = this.apiAddress + address;

      this.hdrs = new HttpHeaders()
      .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, Constants.clientRoot])
      .set('Access-Control-Allow-Methods', 'GET')
      .set('content-type', 'application/json');


      printServiceInfo(urlAddress, currentExpID, this.hdrs);
      return this.http.get<Role[]>(
        urlAddress,
        { headers: this.hdrs })
        .pipe(
          timeout(8000),
          map((Roles: Role[]) => {
          console.log('User\'s Roles Found:  ' + Roles );
          Roles.forEach(role => {

              let p = JSON.stringify(role.editState);
              role.stateHistory = [role.editState as string];

            });
            return Roles;
          }));





}

  // GET Experience BY ID
public readItem(id: string): Observable<Role> {

    const address = id;
    const urlAddress = this.apiAddress + address;


    this.hdrs = new HttpHeaders()
    .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, this.clientRt])
    .set('Access-Control-Allow-Methods', 'GET')
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .set('content-type', 'application/json');

    printServiceInfo(urlAddress, id, this.hdrs);
      return this.http.get<Role>(
        urlAddress,
        {headers: this.hdrs}
      ).pipe(
        timeout(8000),
        map((item: Role) => {
        console.log('Item Found: ' + item);
        return item;
      }));
}


//  UPDATE ROLE
public updateItem(item: Role | undefined) : Observable<Role[]> {


  const urlAddress = this.apiAddress + item?.id;
  // item.projectCreatorID = Constants.userID as string;

  this.hdrs = new HttpHeaders()
  .set('Access-Control-Allow-Origin',  [this.apiRt, this.apiAddress, this.clientRt])
  .set('Access-Control-Allow-Methods', ['PUT','POST','DELETE', 'GET'])
  .set('Access-Control-Allow-Headers', 'Content-Type')
  .set('content-type', 'application/json');

  printServiceInfo(urlAddress, item, this.hdrs);

    return this.http.put<Role[]>(
      urlAddress,
      item,
      { headers: this.hdrs }
    ).pipe(
      timeout(8000),
      map((updatedItem: Role[]) => {

      return updatedItem;
    }));
  }


  // DELETE Role
public deleteItem(id: string | undefined): Observable<Role[]> {


    const urlAddress = this.apiAddress + id;
    this.hdrs = new HttpHeaders();

    this.hdrs
      .set("Access-Control-Allow-Origin", [
        this.apiRt,
        this.apiAddress,
        this.clientRt,
      ])
      .set("Access-Control-Allow-Methods", ["DELETE", "GET"])
      .set("Access-Control-Allow-Headers", "Content-Type")
      .set("content-type", "application/json");

    printServiceInfo(urlAddress, id, this.hdrs);


    return this.http.delete<Role[]>(
      urlAddress,

      {headers: this.hdrs}
    ).pipe(
      timeout(8000),
      map((remainingRoles:Role[])=> {
      console.log('Item Deleted: ', remainingRoles);
      return remainingRoles;
    }));
  }


}
