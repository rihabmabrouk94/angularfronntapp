import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute, Params } from '@angular/router';
import {ListoperationService} from '../services/listoperation.service';
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-list-operation',
  templateUrl: './list-operation.component.html',
  styleUrls: ['./list-operation.component.css']
})
export class ListOperationComponent implements OnInit {
  operations: any[] = [];
  userSession: {} = {};
  userSessionId: number;

  constructor(public activatedRoute: ActivatedRoute,
              private cookieService: CookieService,
              public listOperationService: ListoperationService) { }

  ngOnInit(): void {
    this.userSession = this.cookieService.getObject('usersession');
    this.userSessionId = Number(this.cookieService.get('usersession_id'));
    this.getListOperations();
  }

  getListOperations() {
    this.listOperationService.list_operation(this.userSessionId)
      .subscribe((response: any) => {
        this.operations = response.data;
      });
  }

}
