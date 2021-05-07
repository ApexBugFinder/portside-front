import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, pipe} from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { Constants } from '../../helpers/Constants';
import { Degree } from './degree';
@Injectable({
  providedIn: 'root'
})
export class DegreeService {
  private ctlrName;
  private apiAddress;
  private userID;
  private hdrs: HttpHeaders;
  private apiRt;
  private clientRt;

  constructor(private http: HttpClient) {
    this.ctlrName = 'Degrees/';
    this.apiRt = Constants.apiRoot;
    this.apiAddress = this.apiRt + this.ctlrName;
    this.hdrs = new HttpHeaders();
    this.userID = Constants.userID;
    this.clientRt = Constants.clientRoot;
   }


   // CREATE Degree
   public createItem(item: Degree) : Observable<Degree> {
    this.hdrs = new HttpHeaders();

        const address = this.apiAddress + "new";
    
        this.hdrs = new HttpHeaders()
          .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, Constants.clientRoot])
          .set('Access-Control-Allow-Methods', ['PUT','POST','DELETE', 'GET'])
          .set('content-type', 'application/json');
    
        this.printServiceInfo(address, item, this.hdrs);
        return this.http.post<Degree>(
        address,
          item,
         {headers: this.hdrs}
        ).pipe(
          timeout(2000),
          map((newDegree: Degree) => {
          console.log('New Degree added to DB: ', newDegree);
          return newDegree;
        }));
      }


     // READ ALL DegreeS BY USER
 
public readAll(id: string): Observable<Degree[]> {

      const address = 'all/' + this.userID;
      const urlAddress = this.apiAddress + address;

      this.hdrs = new HttpHeaders()
      .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, Constants.clientRoot])
      .set('Access-Control-Allow-Methods', 'GET')
      .set('content-type', 'application/json');


      this.printServiceInfo(urlAddress, id, this.hdrs);
      return this.http.get<Degree[]>(
        urlAddress,
        { headers: this.hdrs })
        .pipe(
          timeout(2000),
          map((usersDegrees: Degree[]) => {
          console.log('User\'s Degrees Found:  ' + usersDegrees );
          
      
          
          return usersDegrees;
    } ));

} 

  // GET Degree BY ID
public readItem(id: string): Observable<Degree> {

    const address = id;
    const urlAddress = this.apiAddress + address;


    this.hdrs = new HttpHeaders()
    .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, this.clientRt])
    .set('Access-Control-Allow-Methods', 'GET')
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .set('content-type', 'application/json');

    this.printServiceInfo(urlAddress, id, this.hdrs);
      return this.http.get<Degree>(
        urlAddress,
        {headers: this.hdrs}
      ).pipe(
        timeout(2000),
        map((item: Degree) => {
        console.log('Item Found: ' + item);
        return item;
      }));
}


//  UPDATE Degree
public updateItem(item: Degree) : Observable<Degree> {


  const urlAddress = this.apiAddress + item.id;
  item.projectCreatorID = Constants.userID;
  
  this.hdrs = new HttpHeaders()
  .set('Access-Control-Allow-Origin',  [this.apiRt, this.apiAddress, this.clientRt])
  .set('Access-Control-Allow-Methods', ['PUT','POST','DELETE', 'GET'])
  .set('Access-Control-Allow-Headers', 'Content-Type')
  .set('content-type', 'application/json');

  this.printServiceInfo(urlAddress, item, this.hdrs);
  
    return this.http.put<Degree>(
      urlAddress,
      item,
      { headers: this.hdrs }
    ).pipe(
      timeout(2000),
      map((updatedItem: Degree) => {
      console.log('Updated Item: ', updatedItem);
      return updatedItem;
    }));
  }


  // DELETE Degree
public deleteItem(id: string): Observable<Degree> {

    const address = id;
    const urlAddress = this.apiAddress + id;
    this.hdrs = new HttpHeaders();

    this.hdrs.set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, this.clientRt])
              .set('Access-Control-Allow-Methods', 'DELETE')
              .set('Access-Control-Allow-Headers', 'Content-Type');

    this.printServiceInfo(urlAddress, id, this.hdrs);


    return this.http.delete<Degree>(
      urlAddress,
      {headers: this.hdrs}
    ).pipe(
      timeout(2000),
      map((itemDeleted:Degree)=> {
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
