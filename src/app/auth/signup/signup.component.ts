import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ModalComponent} from '../../shared/components/modal/ModalComponent';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CookieService} from 'ngx-cookie';
import {Router} from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
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
      user_name: ['', Validators.required],
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      rf_id: ['', Validators.required]
    });
  }

  onSigneup() {
    const data  = {
      user_name: this.authForm.value.user_name,
      last_name: this.authForm.value.last_name,
      first_name: this.authForm.value.first_name,
      email: this.authForm.value.email,
      password: this.authForm.value.password,
      rf_id: this.authForm.value.rf_id,
    };
    this.authService.signup(data)
      .subscribe((result: any) => {
        if (result) {
          this.cookieService.put('userId', result.data.user_id);
          localStorage.setItem('token', result.token);
          console.log('token' , result.token);
          this.router.navigate(['user/' + result.data.user_id]);
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
