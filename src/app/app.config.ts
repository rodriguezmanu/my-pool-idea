import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { Http, RequestOptions, HttpModule } from '@angular/http';
import { environment } from '../environments/environment';
import { API } from './app.constant';
import { AuthConfig } from "angular2-jwt";
import { JwtHttp, JwtConfigService } from "angular2-jwt-refresh";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function getJwtHttp(http: Http, options: RequestOptions) {
  const jwtOptions = {
    endPoint: environment.api + API.USERS.REFRESH,
    payload: { refresh_token: localStorage.refresh_token },
    beforeSeconds: 100,
    tokenName: 'refresh_token',
    refreshTokenGetter: () => localStorage.getItem('refresh_token'),
    tokenSetter: (res: any): boolean | Promise<void> => {
      res = res.json();
      if (!res['jwt']) {
        localStorage.removeItem('token');
        return false;
      }

      localStorage.setItem('token', res['jwt']);
      localStorage.setItem('refresh_token', res['refresh_token']);

      return true;
    }
  };
  const authConfig = new AuthConfig({
    globalHeaders: [
      {
        Accept: 'application/json'
      }
    ],
    noTokenScheme: true,
    noJwtError: true,
    headerName: 'X-Access-Token',
    tokenName: 'token'
  });

  return new JwtHttp(
    new JwtConfigService(jwtOptions, authConfig),
    http,
    options
  );
}
