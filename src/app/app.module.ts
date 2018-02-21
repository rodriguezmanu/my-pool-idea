import { ToastsService } from './services/toastr.service';
import { UsersService } from './services/users.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './modules/app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { HttpClientModule, HttpClient} from '@angular/common/http';
import { Http, RequestOptions, HttpModule } from '@angular/http';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BusyModule } from 'angular2-busy';
import { AppRoutingModule } from './app.routing';
import { JwtConfigService, JwtHttp } from 'angular2-jwt-refresh';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { IdeasComponent } from './components/ideas/ideas.component';
import { AuthGuard } from './guards/auth.guard';
import { IdeasService } from './services/ideas.service';
import { DeleteDialogComponent } from './dialogs/deleteIdea/delete.dialog.component';
import { HttpLoaderFactory, getJwtHttp } from './app.config';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    RegistrationComponent,
    IdeasComponent,
    DeleteDialogComponent
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
    BusyModule,
    ToastModule.forRoot(),
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
      provide: JwtHttp,
      useFactory: getJwtHttp,
      deps: [Http, RequestOptions]
    },
    UsersService,
    IdeasService,
    ToastsService,
    AuthGuard
  ],
  entryComponents: [DeleteDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
