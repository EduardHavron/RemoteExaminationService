import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IUserExtended} from '../../Models/Admin/admin-user-extended';
import {Observable} from 'rxjs';
import {IQuery} from '../../Models/Query/query';
import {saveAs} from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = environment.apiPath + 'Admin/';

  constructor(private http: HttpClient) {
  }

  executeQuery(query: IQuery): Observable<number> {
    return this.http.post<number>(this.url + 'ExecuteQuery', query);
  }

  getUsers() {
    return this.http.get(this.url + 'GetUsers', {reportProgress: true});
  }

  getUser(userId: string) {
    return this.http.get(this.url + 'GetUser/' + userId, {reportProgress: true});
  }

  updateUser(user: IUserExtended) {
    return this.http.put(this.url + 'UpdateUser/', user, {reportProgress: true});
  }

  deleteUser(id: string) {
    return this.http.delete(this.url + 'DeleteUser/' + id, {reportProgress: true});
  }

  getBackupFile() {
    this.http.get(this.url + 'GetBackup', {responseType: 'blob', reportProgress: true})
      .subscribe(file => {
          saveAs(file, `Database_backup_${new Date().toString()}.bak`);
        },
        err => console.log(err));
  }
}
