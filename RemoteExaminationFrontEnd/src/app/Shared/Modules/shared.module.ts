import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import {TranslateModule} from '@ngx-translate/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbLayoutModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule,
  NbToggleModule
} from '@nebular/theme';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastrModule.forRoot(),
    NbLayoutModule,
    NbButtonModule,
    NbThemeModule.forRoot(),
    NbToggleModule,
    NbActionsModule,
    NbCardModule,
    NbInputModule,
    NbCheckboxModule,
    FontAwesomeModule,
    NbToastrModule.forRoot(),
    TranslateModule,
    NbSidebarModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastrModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbThemeModule,
    NbToggleModule,
    NbActionsModule,
    NbCardModule,
    NbInputModule,
    NbCheckboxModule,
    FontAwesomeModule,
    NbToastrModule,
    TranslateModule,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule
    };
  }
}
