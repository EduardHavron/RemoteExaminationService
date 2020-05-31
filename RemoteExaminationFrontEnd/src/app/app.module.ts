import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterFormComponent } from './Authorization/register-form/register-form.component';
import { LoginFormComponent } from './Authorization/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './Shared/Services/Interceptors/error.interceptor';
import { JwtInterceptor} from './Shared/Services/Interceptors/jwt.interceptor';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbToggleModule,
  NbActionsModule,
  NbCardModule,
  NbInputModule,
  NbCheckboxModule, NbToastrModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
import { NbSidebarModule, NbButtonModule } from '@nebular/theme';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { PageNotFoundComponent } from './PageNotFound/page-not-found/page-not-found.component';
import { registerLocaleData } from '@angular/common';
import localeUa from '@angular/common/locales/ru-UA';

registerLocaleData(localeUa);

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    LoginFormComponent,
    DashboardComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule.forRoot(), // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbEvaIconsModule,
    CommonModule,
    NbThemeModule.forRoot(),
    NbToggleModule,
    NbActionsModule,
    NbCardModule,
    NbInputModule,
    NbCheckboxModule,
    NbToastrModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
