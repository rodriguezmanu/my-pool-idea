import { UsersService } from './services/users.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './modules/app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions, HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { IdeasComponent } from './components/ideas/ideas.component';
import { AuthGuard } from './guards/auth.guard';
import { IdeasService } from './services/ideas.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

export function getAuthHttp(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
      globalHeaders: [
        {
          Accept: 'application/json'
        }
      ],
      noTokenScheme: true,
      noJwtError: true,
      headerName: 'X-Access-Token',
      tokenName: 'token',
    }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    RegistrationComponent,
    IdeasComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http, RequestOptions]
    },
    UsersService,
    IdeasService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
