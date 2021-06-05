import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { printServiceInfo } from "src/app/helpers/helperFunctions";
import { Store, select } from '@ngrx/store';
import { Observable } from "rxjs";
import { Constants } from "src/app/helpers/Constants";
import * as fromShare from '../../shared/state';
import { UserState} from './user';
import { map, timeout } from "rxjs/operators";
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private ctlrName: string;
  private apiAddress: string;
  private userID:string;
  private hdrs: HttpHeaders;
  private apiRt;
  private clientRt: string;
  constructor(private http: HttpClient) {
    this.ctlrName = 'projectcreator/'
    this.apiRt = Constants.apiRoot;
    this.apiAddress = this.apiRt + this.ctlrName;
    this.clientRt = Constants.clientRoot;

}

public getUserInfo(userName: string): Observable<UserState> {
  this.hdrs = new HttpHeaders()
    .set('Access-Control-Allow-Origin', [
      this.apiRt,
      this.apiAddress,
      this.clientRt,
    ])
    .set('Access-Control-Allow-Methods', [ 'GET'])
    .set('content-type', 'application/json');
  const address = this.apiAddress +'username/' + userName;
    printServiceInfo(address, userName, this.hdrs);
  return this.http.get<UserState>(
    address,
    {headers: this.hdrs}
  ).pipe(
    timeout(2000),
    map((userState: UserState)=> {
      console.log('User\'s Info: ', userState);
      return userState;
    })
  );
}
}