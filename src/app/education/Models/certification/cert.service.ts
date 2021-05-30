import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, pipe} from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { Constants } from '../../../helpers/Constants';
import { Certification  } from './certification';

@Injectable({
  providedIn: 'root'
})
export class CertService {
  private ctlrName;
  private apiAddress;
  private userID;
  private hdrs: HttpHeaders;
  private apiRt;
  private clientRt;

  constructor(private http: HttpClient) {
    this.ctlrName = 'certifications/';
    this.apiRt = Constants.apiRoot;
    this.apiAddress = this.apiRt + this.ctlrName;
    this.hdrs = new HttpHeaders();
    this.userID = Constants.userID;
    this.clientRt = Constants.clientRoot;
  }

// CREATE CERTIFCATION
public createItem(item: Certification) : Observable<Certification> {
  this.hdrs = new HttpHeaders();

      const address = this.apiAddress + "new";

      this.hdrs = new HttpHeaders()
        .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, Constants.clientRoot])
        .set('Access-Control-Allow-Methods', ['POST',])
        .set('content-type', 'application/json');

      this.printServiceInfo(address, item, this.hdrs);
      return this.http.post<Certification>(
      address,
        item,
       {headers: this.hdrs}
      ).pipe(
        timeout(2000),
        map((newCertification: Certification) => {
        console.log('New Certification added to DB: ', newCertification);
        return newCertification;
      }));

}
  // READ ALL CertificationS BY USER
public readAll(id: string): Observable<Certification[]> {

  const address = 'all/' + Constants.userID;
  const urlAddress = this.apiAddress + address;

  this.hdrs = new HttpHeaders()
  .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, Constants.clientRoot])
  .set('Access-Control-Allow-Methods', 'GET')
  .set('content-type', 'application/json');


  this.printServiceInfo(urlAddress, id, this.hdrs);
  return this.http.get<Certification[]>(
    urlAddress,
    { headers: this.hdrs })
    .pipe(
      timeout(2000),
      map((usersCertifications: Certification[]) => {
      console.log('User\'s Certifications Found:  ' + usersCertifications );



      return usersCertifications;
} ));

}

  // GET Certification BY ID
  public readItem(id: string): Observable<Certification> {

    const address = id;
    const urlAddress = this.apiAddress + address;


    this.hdrs = new HttpHeaders()
    .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, this.clientRt])
    .set('Access-Control-Allow-Methods', 'GET')
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .set('content-type', 'application/json');

    this.printServiceInfo(urlAddress, id, this.hdrs);
      return this.http.get<Certification>(
        urlAddress,
        {headers: this.hdrs}
      ).pipe(
        timeout(2000),
        map((item: Certification) => {
        console.log('Item Found: ' + item);
        return item;
      }));
}


//  UPDATE Certification
public updateItem(item: Certification) : Observable<Certification> {


  const urlAddress = this.apiAddress + item.id;
  item.projectCreatorID = Constants.userID;

  this.hdrs = new HttpHeaders()
  .set('Access-Control-Allow-Origin',  [this.apiRt, this.apiAddress, this.clientRt])
  .set('Access-Control-Allow-Methods', ['PUT','POST','DELETE', 'GET'])
  .set('Access-Control-Allow-Headers', 'Content-Type')
  .set('content-type', 'application/json');

  this.printServiceInfo(urlAddress, item, this.hdrs);

    return this.http.put<Certification>(
      urlAddress,
      item,
      { headers: this.hdrs }
    ).pipe(
      timeout(2000),
      map((updatedItem: Certification) => {
      console.log('Updated Item: ', updatedItem);
      return updatedItem;
    }));
  }


  // DELETE Certification
public deleteItem(id: string): Observable<Certification> {

    const address = id;
    const urlAddress = this.apiAddress + id;
    this.hdrs = new HttpHeaders();

    this.hdrs.set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, this.clientRt])
              .set('Access-Control-Allow-Methods', 'DELETE')
              .set('Access-Control-Allow-Headers', 'Content-Type');

    this.printServiceInfo(urlAddress, id, this.hdrs);


    return this.http.delete<Certification>(
      urlAddress,
      {headers: this.hdrs}
    ).pipe(
      timeout(2000),
      map((itemDeleted:Certification)=> {
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
