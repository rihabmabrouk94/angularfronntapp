import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {CookieService} from 'ngx-cookie';
import {ListsessionService} from '../services/listsession.service';

@Component({
  selector: 'app-list-session',
  templateUrl: './list-session.component.html',
  styleUrls: ['./list-session.component.css']
})
export class ListSessionComponent implements OnInit {
  userSessionId: number;
  userSession: any = {};

  constructor(public activatedRoute: ActivatedRoute,
              public listSessionService: ListsessionService,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.userSession = this.cookieService.getObject('usersession');
    this.userSessionId = Number(this.cookieService.get('usersession_id'));
    this.getUserSession();
  }

  getUserSession() {
    this.listSessionService.list(this.userSessionId)
      .subscribe((response: any) => {
        this.userSession = response.data;
      });
  }

}
