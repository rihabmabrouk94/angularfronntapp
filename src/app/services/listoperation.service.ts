import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListoperationService {

  constructor(private http: HttpClient) { }

  list_operation(id) {
    return this.http.get(environment.url + 'operation/operetionsList/' + id );
  }
}
