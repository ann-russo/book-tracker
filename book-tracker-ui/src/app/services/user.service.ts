import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";

const USER_API = 'http://localhost:3080/api/users/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn:'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  public registerUser(user: User): Observable<any> {
    const url = USER_API + 'registration';
    return this.http.post(url, user, httpOptions);
  }

  public loginUser(user: User): Observable<any> {
    const url = USER_API + 'login';
    return this.http.post(url, user, httpOptions);
  }

  public logoutUser(): Observable<any> {
    const url = USER_API + 'logout';
    return this.http.post(url, {}, httpOptions);
  }

  public updateUser(user: User): Observable<any> {
    const url = USER_API + 'updateuser';
    return this.http.post(url, user, httpOptions);
  }

  public getUserData(): Observable<any> {
    const url = USER_API + 'user';
    return this.http.get<any>(url, httpOptions);
  }

  public deleteUser(): Observable<any> {
    const url = USER_API + 'deleteUser';
    return this.http.delete<any>(url, httpOptions);
  }

}
