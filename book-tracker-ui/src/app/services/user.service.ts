import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class UserService {
  private api: string = 'http://localhost:3080/api/users';
  constructor(private http: HttpClient) {
  }

  public registerUser(user: User): Observable<any> {
    const url = this.api + '/registration';
    return this.http.post(url, user);
  }

  public loginUser(user: User): Observable<any> {
    const url = this.api + '/login';
    return this.http.post(url, user);
  }

  public logoutUser(user: User): Observable<any> {
    const url = this.api + '/logout';
    return this.http.post(url, user);
  }

  public updateUser(user: User): Observable<any> {
    const url = this.api + '/updateuser';
    return this.http.post(url, user);
  }

  public getUserData() {
    //TODO add functionality to fetch user's data in backend
  }

  public deleteUser() {
    //TODO add delete functionality in backend
  }

}
