import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AdminService} from '../Services/Admin/admin.service';
import {IUser} from '../Models/UserAuth/IUser';

@Injectable({providedIn: 'root'})
export class UsersResolver implements Resolve<Array<IUser>> {
  constructor(private service: AdminService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.getUsers();
  }
}
