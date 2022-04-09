import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { FacebookUserData, LoginUserData, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  login(userData: LoginUserData) {
    return this.http.post<User>(env.apiUrl + '/users/sessions', userData);
  }

  loginWithFacebook(userData: FacebookUserData) {
    return this.http.post<User>(env.apiUrl + '/users/facebookLogin', userData);
  }

  logout() {
    return this.http.delete(env.apiUrl + '/users/sessions');
  }
}
