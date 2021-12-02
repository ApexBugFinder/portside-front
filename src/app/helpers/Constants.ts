import { UserManagerSettings, WebStorageStateStore } from "oidc-client";

export class Constants {
  public static authority = "https://identity.portside.sbs";

  public static clientRoot = "https://portside.sbs";

  public static apiRoot = "https://webapi.portside.sbs/api/";

  public static getClientSettings: UserManagerSettings = {
    authority: Constants.authority,
    client_id: "portfoliofront",
    redirect_uri: Constants.clientRoot + "/#/auth/auth-callback/?",
    post_logout_redirect_uri: Constants.clientRoot,
    response_type: "id_token token",
    scope: "openid profile portfoliowebapi mtls",
    filterProtocolClaims: false,
    loadUserInfo: true,

    stateStore: new WebStorageStateStore({ store: window.localStorage }),

    userStore: new WebStorageStateStore({ store: window.localStorage }),
  };
}
