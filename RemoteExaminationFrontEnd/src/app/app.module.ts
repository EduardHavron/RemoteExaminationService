import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor} from './Shared/Services/Interceptors/error.interceptor';
import {JwtInterceptor} from './Shared/Services/Interceptors/jwt.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './PageNotFound/page-not-found/page-not-found.component';
import {registerLocaleData} from '@angular/common';
import localeUa from '@angular/common/locales/ru-UA';
import {SharedModule} from './Shared/Services/Shared/Modules/shared.module';
import {NbToastrModule, NbWindowModule} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';


registerLocaleData(localeUa);

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    SharedModule.forRoot(),
    NbToastrModule.forRoot(),
    NbWindowModule.forRoot() /* Unfortunately this module can't work with lazy loading */
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
