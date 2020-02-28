import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CookieService} from 'ngx-cookie';
import {ModalComponent} from '../../shared/components/modal/ModalComponent';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  authForm: FormGroup;
  constructor(private authService: AuthService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private cookieService: CookieService,
              private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSignein() {
    const data  = {
      email: this.authForm.value.email,
      password: this.authForm.value.password,
    };
    this.authService.signin(data)
      .subscribe((result: any) => {
        if (result) {
          this.cookieService.put('email', result.data.email);
          this.cookieService.put('userId', result.data.user_id);
          this.cookieService.put('password', result.data.password);
          this.cookieService.putObject('user', result.data);
          this.router.navigate(['user/' + result.data.user_id]);
          localStorage.setItem('token', result.token);
          console.log('token' , result.token)
        } else if (result.messsage) {
          this.openModal('Access Denied');
        }
      }, (err) => {
        if (err && err.error && err.error.message) {
          this.openModal(err.error.message);
        }
      });
  }

  openModal(message) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = 'Invalid authentification';
    modalRef.componentInstance.content = message;
    modalRef.componentInstance.withCloseBtn = false;
  }

}
