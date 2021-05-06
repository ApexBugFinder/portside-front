import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, pipe} from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { Constants } from '../helpers/Constants';
import { Experience } from './experience';


@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private ctlrName;
  private apiAddress;
  private userID;
  private hdrs: HttpHeaders;
  private apiRt;
  private clientRt;

  constructor(private http: HttpClient) { 
    this.ctlrName = 'experiences/';
    this.apiRt = Constants.apiRoot;
    this.apiAddress = this.apiRt + this.ctlrName;
    this.hdrs = new HttpHeaders();
    this.userID = Constants.userID;
    this.clientRt = Constants.clientRoot;

  }

  // CREATE EXPERIENCE
  public createItem(item: Experience) : Observable<Experience> {
    this.hdrs = new HttpHeaders();

        const address = this.apiAddress + "new";
    
        this.hdrs = new HttpHeaders()
          .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, Constants.clientRoot])
          .set('Access-Control-Allow-Methods', ['PUT','POST','DELETE', 'GET'])
          .set('content-type', 'application/json');
    
        this.printServiceInfo(address, item, this.hdrs);
        return this.http.post<Experience>(
        address,
          item,
         {headers: this.hdrs}
        ).pipe(
          timeout(2000),
          map((newExperience: Experience) => {
          console.log('New Experience added to DB: ', newExperience);
          return newExperience;
        }));
      }


     // READ ALL ExperienceS BY USER
 
public readAll(id: string): Observable<Experience[]> {

      const address = 'all/' + Constants.userID;
      const urlAddress = this.apiAddress + address;

      this.hdrs = new HttpHeaders()
      .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, Constants.clientRoot])
      .set('Access-Control-Allow-Methods', 'GET')
      .set('content-type', 'application/json');


      this.printServiceInfo(urlAddress, id, this.hdrs);
      return this.http.get<Experience[]>(
        urlAddress,
        { headers: this.hdrs })
        .pipe(
          timeout(2000),
          map((usersExperiences: Experience[]) => {
          console.log('User\'s Experiences Found:  ' + usersExperiences );
          
      
          
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

    this.printServiceInfo(urlAddress, id, this.hdrs);
      return this.http.get<Experience>(
        urlAddress,
        {headers: this.hdrs}
      ).pipe(
        timeout(2000),
        map((item: Experience) => {
        console.log('Item Found: ' + item);
        return item;
      }));
}


//  UPDATE Experience
public updateItem(item: Experience) : Observable<Experience> {


  const urlAddress = this.apiAddress + item.id;
  item.projectCreatorID = Constants.userID;
  
  this.hdrs = new HttpHeaders()
  .set('Access-Control-Allow-Origin',  [this.apiRt, this.apiAddress, this.clientRt])
  .set('Access-Control-Allow-Methods', ['PUT','POST','DELETE', 'GET'])
  .set('Access-Control-Allow-Headers', 'Content-Type')
  .set('content-type', 'application/json');

  this.printServiceInfo(urlAddress, item, this.hdrs);
  
    return this.http.put<Experience>(
      urlAddress,
      item,
      { headers: this.hdrs }
    ).pipe(
      timeout(2000),
      map((updatedItem: Experience) => {
      console.log('Updated Item: ', updatedItem);
      return updatedItem;
    }));
  }


  // DELETE Experience
public deleteItem(id: string): Observable<Experience> {

    const address = id;
    const urlAddress = this.apiAddress + id;
    this.hdrs = new HttpHeaders();

    this.hdrs.set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, this.clientRt])
              .set('Access-Control-Allow-Methods', 'DELETE')
              .set('Access-Control-Allow-Headers', 'Content-Type');

    this.printServiceInfo(urlAddress, id, this.hdrs);


    return this.http.delete<Experience>(
      urlAddress,
      {headers: this.hdrs}
    ).pipe(
      timeout(2000),
      map((itemDeleted:Experience)=> {
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
