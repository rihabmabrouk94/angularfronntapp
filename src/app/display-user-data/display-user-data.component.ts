import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-display-user-data',
  templateUrl: './display-user-data.component.html',
  styleUrls: ['./display-user-data.component.css']
})
export class DisplayUserDataComponent implements OnInit {
   userId: number;
   user: any = {};
   token: string;
   decoded: any = []

  constructor(private cookieService: CookieService,
              public authService: AuthService,
              private router: Router,
              public jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    localStorage.getItem('token');
    const helper = new JwtHelperService();
    const token =  localStorage.getItem('token');
    console.log('token' , token);
    this.decoded = helper.decodeToken(token);
    console.log('lell' , this.decoded);
  }
}
