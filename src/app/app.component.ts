import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-first-project';
  userSession: any = {};

  constructor(private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userSession = this.cookieService.getObject('usersession');
  }

  logout() {
    this.cookieService.remove('usersession_id');
    this.cookieService.remove('usersession');
    this.router.navigate(['/login']);
    location.reload();
  }


}
