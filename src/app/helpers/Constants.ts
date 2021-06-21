import { UserManagerSettings, WebStorageStateStore } from 'oidc-client';

export class Constants {
   // public static apiRoot = 'https://localhost:5001/api/';
  public static apiRoot = 'https://localhost:44325/api/';

  public static authority = 'https://localhost:44314';
  // public static userID = 'D8D32EA4-5F9D-4BE9-9535-AB69C3F0A112';

  public static clientRoot = 'http://localhost:4200';

  public static getClientSettings: UserManagerSettings = {


    authority: Constants.authority,
    client_id: 'portfoliofront',
    redirect_uri: Constants.clientRoot + '/auth/auth-callback',
    post_logout_redirect_uri: Constants.clientRoot,
    response_type: 'id_token token',
    scope: 'openid profile portfoliowebapi',
    filterProtocolClaims: false,
    loadUserInfo: true,

    userStore: new WebStorageStateStore({ store: window.localStorage })

};
}
