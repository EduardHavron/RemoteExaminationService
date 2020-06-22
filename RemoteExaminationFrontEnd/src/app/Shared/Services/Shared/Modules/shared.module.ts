import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule, NbCheckboxModule, NbInputModule,
  NbLayoutModule, NbSelectModule,
  NbSidebarModule,
  NbThemeModule,
  NbToggleModule,
  NbToastrModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastrModule,
    TranslateModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule.forRoot(), // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbEvaIconsModule,
    NbThemeModule.forRoot(),
    NbToggleModule,
    NbActionsModule,
    NbCardModule,
    NbInputModule,
    NbCheckboxModule,
    FontAwesomeModule,
    NbSelectModule,
    NbToastrModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastrModule,
    TranslateModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbThemeModule,
    NbToggleModule,
    NbActionsModule,
    NbCardModule,
    NbInputModule,
    NbCheckboxModule,
    FontAwesomeModule,
    NbSelectModule,
    NbToastrModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule
    };
  }
}
