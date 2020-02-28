import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(obj) {
    return this.http.post(environment.url + 'user/register', obj );
  }
  signin(obj) {
    return this.http.post(environment.url + 'user/login', obj );
  }
  list(id) {
    return this.http.get(environment.url + 'user/' + id );
  }

}
