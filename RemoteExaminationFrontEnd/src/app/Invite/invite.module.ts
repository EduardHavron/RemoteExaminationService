import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppendInviteComponent} from './Pages/append-invite/append-invite.component';
import {SharedModule} from '../Shared/Modules/shared.module';
import {InviteRoutingModule} from './invite-routing/invite-routing.module';
import {GenerateInviteComponent} from './Pages/generate-invite/generate-invite.component';


@NgModule({
  declarations: [
    AppendInviteComponent,
    GenerateInviteComponent,
  ],
  imports: [
    CommonModule,
    InviteRoutingModule,
    SharedModule.forRoot(),
  ]
})
export class InviteModule {
}
