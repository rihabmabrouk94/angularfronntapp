import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {CookieService} from 'ngx-cookie';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router,
              private cookieService: CookieService,
  ) {
  }

  canActivate(): boolean {
    if (!this.cookieService.get('usersession_id')) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
