import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { printServiceInfo } from "../../helpers/helperFunctions";
import { Store, select } from '@ngrx/store';
import { Observable } from "rxjs";
import { Constants } from "../../helpers/Constants";
import * as fromShare from '../../shared/state';
import { UserState, User} from './user';
import { map, timeout } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private ctlrName: string;
  private apiAddress: string;
  private userID: string;
  private hdrs: HttpHeaders;
  private apiRt;
  private clientRt: string;


  constructor(private http: HttpClient,
    private authService: AuthService) {
    this.ctlrName = 'projectcreator/';
    this.apiRt = Constants.apiRoot;
    this.apiAddress = this.apiRt + this.ctlrName;
    this.clientRt = Constants.clientRoot;

  }

  public getUserInfo(userName: string): Observable<UserState> {
    this.hdrs = new HttpHeaders()
      .append('Access-Control-Allow-Origin', [
        this.apiRt,
        this.apiAddress,
        this.clientRt,
      ])
      .append('Accept', 'application/json')
      .append('Access-Control-Allow-Methods', ['GET'])
      .append('content-type', 'application/json');
    const address = this.apiAddress + 'username/' + userName;
  console.log('HELLO', this.clientRt);
    printServiceInfo(address, userName, this.hdrs);
    return this.http.get<UserState>(address, { headers: this.hdrs }).pipe(
      timeout(10000),
      map((userState: UserState) => {
        console.log("User's Info: ", userState);
        return userState;
      })
    );
  }
  public getUserById(userId: string): Observable<UserState> {
console.log('userID: ', userId);
const address = this.apiAddress + 'userID/' + userId;
    this.hdrs = new HttpHeaders()
      .set("Access-Control-Allow-Origin", [
        this.apiRt,
        this.apiAddress,
        Constants.authority,
        this.clientRt,
      ])
      .set("Accept", "application/json")
      .set("Authorization", this.authService.getAuthorizationHeaderValue())
      .set("Access-Control-Allow-Methods", ["GET", "POST", "PUT"])
      .set("content-type", "application/json");
  console.log('HELLO', this.clientRt);
    printServiceInfo(address, userId, this.hdrs);
    return this.http.get<UserState>(address, { headers: this.hdrs }).pipe(
      timeout(30000),
      map((userState: UserState) => {
        console.log("User's Info: ", userState);
        return userState;
      })
    );
  }
  // GET USERS BY USERNAME SEARCH

  public getUsersByUsernameSearch(keyword: string): Observable<UserState[]> {
    let keywordObject = {
      keyword: keyword,
    };
    const address = this.apiAddress + 'search/';

    this.hdrs = new HttpHeaders()
      .set('access-control-allow-origin', [
        this.apiRt,
        this.apiAddress,
        this.clientRt,
        address
      ])
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Methods', ['PUT', 'GET', 'POST'])
      .set('content-type', 'application/json');
    // Address needs to be updated, and the backend endpoint needs to be
    // created
    console.log('HELLO', this.clientRt);

    printServiceInfo(address, keyword, this.hdrs);

    return this.http
      .put<UserState[]>(address, JSON.stringify(keyword), {
        headers: this.hdrs,
      })
      .pipe(
        timeout(16000),
        map((users: UserState[]) => {
          console.log("User's Info: ", users);
          return users;
        })
      );
  }
  public updateUserInfo(user: User): Observable<User> {
    this.hdrs = new HttpHeaders()
      .set("Access-Control-Allow-Origin", [
        this.apiRt,
        this.apiAddress,
        this.clientRt,
      ])
      .set("Access-Control-Allow-Methods", ["PUT", "GET", "POST"])
      .set("Accept", "application/json")
      .set("content-type", "application/json");
    const address = this.apiAddress + 'update/' + user.id;
    return this.http.put<User>(address, user, { headers: this.hdrs }).pipe(
      timeout(12000),
      map((user: User) => {
        console.log('User Updated to: ', user);
        return user;
      })
    );
  }
}
