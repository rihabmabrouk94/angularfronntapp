import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListsessionService {

  constructor(private http: HttpClient) { }

  list(id) {
    return this.http.get(environment.url + 'usersession/listsession/' + id );
  }
}
