import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, pipe} from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { Constants } from '../helpers/Constants';
import { Experience } from './Models/experience';
import { printServiceInfo } from '../helpers/helperFunctions';
import { Store, select } from '@ngrx/store';
import * as fromShared from '../shared/state';


@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
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
    this.ctlrName = 'Experiences/';
    this.apiRt = Constants.apiRoot;
    this.apiAddress = this.apiRt + this.ctlrName;
    this.hdrs = new HttpHeaders();
    this.userStateStore
      .pipe(select(fromShared.getUserId))
        .subscribe((id:string) => this.userID = id);
    this.clientRt = Constants.clientRoot;

  }

  // CREATE EXPERIENCE
  public createItem(item: Experience | undefined) : Observable<Experience> {
    this.hdrs = new HttpHeaders();

        const address = this.apiAddress + "new";
        console.log('item to send: ', item);
        const hdrs = new HttpHeaders()
          .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, Constants.clientRoot])
          .set('Access-Control-Allow-Methods', ['PUT','POST',])
          .set('content-type', 'application/json');

        printServiceInfo(address, item, this.hdrs);
        return this.http.post<Experience>(
        address,
          item,
         {headers: hdrs}
        ).pipe(
          timeout(10000),
          map((newExperience: Experience) => {
          console.log('New Experience added to DB: ', newExperience);
          return newExperience;
        }));
      }


     // READ ALL ExperienceS BY USER

public readAll(): Observable<Experience[]> {

      const address = 'all/' + this.userID;
      const urlAddress = this.apiAddress + address;

      this.hdrs = new HttpHeaders()
      .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, Constants.clientRoot])
      .set('Access-Control-Allow-Methods', 'GET')
      .set('content-type', 'application/json');

      printServiceInfo(urlAddress, this.userID, this.hdrs);
      return this.http.get<Experience[]>(
        urlAddress,
        { headers: this.hdrs })
        .pipe(
          timeout(10000),
          map((usersExperiences: Experience[]) => {
          console.log('User\'s Experiences Found:  ' + usersExperiences );
          usersExperiences.forEach(exp => {
            exp.roles?.forEach(role => {
              let p = JSON.stringify(role.editState);
              role.stateHistory = [role.editState as string];
            });
          });


          return usersExperiences;
    } ));

}

  // GET Experience BY ID
public readItem(id: string): Observable<Experience> {

    const address = id;
    const urlAddress = this.apiAddress + address;


    this.hdrs = new HttpHeaders()
    .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, this.clientRt])
    .set('Access-Control-Allow-Methods', 'GET')
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .set('content-type', 'application/json');

    printServiceInfo(urlAddress, id, this.hdrs);
      return this.http.get<Experience>(
        urlAddress,
        {headers: this.hdrs}
      ).pipe(
        timeout(6000),
        map((item: Experience) => {
        console.log('Item Found: ' + item);
        return item;
      }));
}


//  UPDATE Experience
public updateItem(item: Experience | undefined) : Observable<Experience> {


  const urlAddress = this.apiAddress + item?.id;
  // item.projectCreatorID = Constants.userID as string;

  this.hdrs = new HttpHeaders()
  .set('Access-Control-Allow-Origin',  [this.apiRt, this.apiAddress, this.clientRt])
  .set('Access-Control-Allow-Methods', ['PUT','POST','DELETE', 'GET'])
  .set('Access-Control-Allow-Headers', 'Content-Type')
  .set('content-type', 'application/json');

  printServiceInfo(urlAddress, item, this.hdrs);

    return this.http.put<Experience>(
      urlAddress,
      item,
      { headers: this.hdrs }
    ).pipe(
      timeout(8000),
      map((updatedItem: Experience) => {
      console.log('Updated Item: ', updatedItem);
      return updatedItem;
    }));
  }


  // DELETE Experience
public deleteItem(id: string | undefined): Observable<Experience> {

    const address = id;
    const urlAddress = this.apiAddress + id;
    this.hdrs = new HttpHeaders();

    this.hdrs.set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, this.clientRt])
              .set('Access-Control-Allow-Methods', ['DELETE', 'GET', 'PUT'])
              .set('Access-Control-Allow-Headers', 'Content-Type');

    printServiceInfo(urlAddress, id, this.hdrs);


    return this.http.delete<Experience>(
      urlAddress,
      {headers: this.hdrs}
    ).pipe(
      timeout(6000),
      map((itemDeleted:Experience)=> {
      console.log('Item Deleted: ', itemDeleted);
      return itemDeleted;
    }));
  }


}
