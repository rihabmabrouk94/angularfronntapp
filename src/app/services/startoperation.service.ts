import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StartoperationService {

  constructor(private http: HttpClient) {
  }

  start_operation_Session(data) {
    return this.http.post(environment.url + 'operation/startOperationsession', data);
  }

  start_operation(usersession_id, operation_id) {
    return this.http.get(environment.url + 'operation/startOperation/' + usersession_id + '/' + operation_id);
  }
/*
  finish_operation(carte_operation_session_id, quantity) {
    return this.http.get(environment.url + 'operation/finishoperation/' + carte_operation_session_id + '/' + quantity);
  }
*/
  finish_operation(data) {
    return this.http.post(environment.url + 'operation/finishoperation/', data);
  }
}
