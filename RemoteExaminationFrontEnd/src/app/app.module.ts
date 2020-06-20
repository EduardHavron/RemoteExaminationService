import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './Shared/Services/Interceptors/error.interceptor';
import { JwtInterceptor} from './Shared/Services/Interceptors/jwt.interceptor';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
import { PageNotFoundComponent } from './PageNotFound/page-not-found/page-not-found.component';
import { registerLocaleData } from '@angular/common';
import localeUa from '@angular/common/locales/ru-UA';
import {SharedModule} from './Shared/Services/Shared/Modules/shared/shared.module';
import {NbToastrModule} from '@nebular/theme';


registerLocaleData(localeUa);

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    SharedModule,
    NbToastrModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
