import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {Router} from '@angular/router';
import {ListsessionService} from '../services/listsession.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  userSessionId: number;
  userSession: any = {};

  constructor(private cookieService: CookieService,
              public listSessionService: ListsessionService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.verifySession();
  }

  verifySession() {
    /*
    -1 verifier si le cookie contient une user_session
      -- si non, redirection vers la page login
      -- si oui passer vers l etape suivante
    -2 verifier si l id de la session encore valide ou non
      -- si oui: (l api doit retourner l objet complet comme le login (user + box +machine)) et le stocker dans les cookies
      --  si non: redirection vers la page login
     */

    if (this.cookieService.get('usersession_id')) {
      this.userSession = this.cookieService.getObject('usersession');
      this.userSessionId = Number(this.cookieService.get('usersession_id'));
      this.getUserSession();
    } else {
      this.router.navigate(['/login']);
    }

  }

  getUserSession() {
    this.listSessionService.list(this.userSessionId)
      .subscribe((response: any) => {
        this.userSession = response.data;
      }, err => {
        this.cookieService.remove('usersession_id');
        this.cookieService.remove('usersession');
        this.router.navigate(['/login']);
      });
  }

}
