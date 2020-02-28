import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {ModalComponent} from '../shared/components/modal/ModalComponent';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  logged = false;

  constructor(private cookieService: CookieService,
              private formBuilder: FormBuilder,
              private loginService: LoginService,
              private modalService: NgbModal,
              private router: Router) {
  }

  ngOnInit(): void {
    this.verifySession();
    this.buildForm();
  }

  verifySession(): void {
    if (this.cookieService.get('usersession_id')) {
      this.router.navigate(['/']);
    }
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      rf_id: ['', Validators.required],
      box_mac_add: ['', Validators.required]
    });
  }

  invalidRfidcode() {
    return (this.submitted && this.loginForm.controls.rf_id.errors != null);
  }

  invalidMacAdress() {
    return (this.submitted && this.loginForm.controls.box_mac_add.errors != null);
  }

  onSubmit() {
    this.submitted = true;
    const reqData = {
      rf_id: this.loginForm.value.rf_id,
      box_mac_add: this.loginForm.value.box_mac_add
    };

    this.loginService.login(reqData)
      .subscribe((result: any) => {
        if (result.status === 201) {
          this.cookieService.put('usersession_id', result.data.usersession_id);
          this.cookieService.putObject('usersession', result.data);
          // this.router.navigate(['usersessions/' + result.data.usersession_id]);
          location.reload();
        } else if (result.messsage) {
          this.openModal('Access Denied');
        }
      }, (err) => {
        if (err && err.error && err.error.message) {
          this.openModal(err.error.message);
        }
      });

    if (this.loginForm.invalid === true) {
      return;
    } else {
      this.logged = true;
    }
  }

  openModal(message) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = 'Invalid authentification';
    modalRef.componentInstance.content = message;
    modalRef.componentInstance.withCloseBtn = false;
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }

  setCookie(key: string, value: string) {
    return this.cookieService.put(key, value);
  }

}
