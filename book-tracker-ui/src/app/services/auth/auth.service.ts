import {Injectable} from "@angular/core";
import {JwtHelperService} from "@auth0/angular-jwt";
import { getCookie } from 'typescript-cookie'

@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService) {}
  public isAuthenticated(): boolean {
    const token = getCookie('jwt')
    if (token !== undefined) {
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }
}
