import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {IUserExtended} from '../Models/Admin/admin-user-extended';
import {AdminService} from '../Services/Admin/admin.service';

@Injectable({providedIn: 'root'})
export class UserResolver implements Resolve<IUserExtended> {
  constructor(private service: AdminService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.getUser(route.params.userId);
  }
}
