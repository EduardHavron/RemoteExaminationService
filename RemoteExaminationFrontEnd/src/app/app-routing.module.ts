import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AuthGuard} from './Shared/Guard/auth.guard';
import {PageNotFoundComponent} from './PageNotFound/page-not-found/page-not-found.component';
import {UnauthGuard} from './Shared/Guard/unauth.guard';
import {AdminGuard} from './Shared/Guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'authorize',
    loadChildren: () => import('./Authorization/authorization.module').then(m => m.AuthorizationModule),
    canLoad: [UnauthGuard],
    canActivate: [UnauthGuard]

  },
  {
    path: 'dashboard',
    loadChildren: () => import('./Dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'exams',
    loadChildren: () => import('./Exam/exam.module').then(m => m.ExamModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'competition',
    loadChildren: () => import('./ExamCompetition/exam-competition.module').then(m => m.ExamCompetitionModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'invites',
    loadChildren: () => import('./Invite/invite.module').then(m => m.InviteModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./Admin/admin.module').then(m => m.AdminModule),
    canLoad: [AdminGuard],
    canActivate: [AdminGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [HttpClientModule, FormsModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppRoutingModule {
}
