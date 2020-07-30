import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor} from './Shared/Services/Interceptors/error.interceptor';
import {JwtInterceptor} from './Shared/Services/Interceptors/jwt.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './PageNotFound/page-not-found/page-not-found.component';
import {registerLocaleData} from '@angular/common';
import localeUa from '@angular/common/locales/ru-UA';
import {SharedModule} from './Shared/Modules/shared.module';
import {NbToastrModule, NbToggleModule, NbWindowModule} from '@nebular/theme';
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MissingTranslationService} from './Shared/i18n/helpers';


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
    NbWindowModule.forRoot(),
    NbToggleModule, /* Unfortunately this module can't work with lazy loading */
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler, useClass: MissingTranslationService
      },
      useDefaultLang: false
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, '../assets/', '.json');
}
