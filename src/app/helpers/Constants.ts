import { UserManagerSettings, WebStorageStateStore } from 'oidc-client';

export class Constants {
  public static authority = 'http://198.211.29.93:8000';

  public static clientRoot = 'https://198.211.29.93';

  public static apiRoot = 'https://198.211.29.93:8085/api/';

  public static getClientSettings: UserManagerSettings = {
    authority: Constants.authority,
    client_id: 'portfoliofront',
    redirect_uri: Constants.clientRoot + '/auth/auth-callback',
    post_logout_redirect_uri: Constants.clientRoot,
    response_type: 'id_token token',
    scope: 'openid profile portfoliowebapi',
    filterProtocolClaims: false,
    loadUserInfo: true,

    userStore: new WebStorageStateStore({ store: window.localStorage }),
  };
}
