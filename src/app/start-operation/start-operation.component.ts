import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {interval, Subscriber, Subscription} from 'rxjs';
import {StartoperationService} from '../services/startoperation.service';
import * as moment from 'moment';
import {CustomValidator} from '../shared/validors/CustomValidation';
import {NgbActiveModal, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from '../shared/components/modal/ModalComponent';
import {CarteOperationSession} from '../shared/models/CarteOperationSession'

@Component({
  selector: 'app-start-operation',
  templateUrl: './start-operation.component.html',
  styleUrls: ['./start-operation.component.css']
})
export class StartOperationComponent implements OnInit {
  userSession: {} = {};
  userSessionId: number;
  carteOerationId: number;
  CarteOperationSession: CarteOperationSession;
  showInput = false;
  startOperationForm: FormGroup;
  operationTimeTotal: number;
  intervalTimer = interval(1000);
  timer: Subscription;
  currentTimeOut: number;
  progressTimePourcent: number | string;
  timerFormatted: string;
  modalOptions: NgbModalOptions;

  constructor(private StartOperationService: StartoperationService,
              private router: Router,
              private formBuilder: FormBuilder,
              public activatedRoute: ActivatedRoute,
              private cookieService: CookieService,
              private modalService: NgbModal,
              public activeModal: NgbActiveModal,
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  ngOnInit(): void {
    this.userSession = this.cookieService.getObject('usersession');
    this.userSessionId = Number(this.cookieService.get('usersession_id'));
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.carteOerationId = params.get('carte_operation_id');
      // this.startOperation();
      this.startOperationSession();
      this.buildForm();
    });
  }

  buildForm() {
    this.startOperationForm = this.formBuilder.group({
      quantity: [0, [
        Validators.required,
        CustomValidator.numeric
      ]],
      time: [0, [
        Validators.required,
        CustomValidator.numeric
      ]],
      carte_operation_session_id: [this.carteOerationId, [
        Validators.required,
        CustomValidator.numeric
      ]]
    });
  }

  startOperationSession() {
    this.StartOperationService.start_operation_Session({
      usersession_id: this.userSessionId,
      carte_operation_id: this.carteOerationId
    }).subscribe((response: any) => {
      if (response && response.data) {
        this.CarteOperationSession = response.data;
        const operationTime = parseFloat(this.CarteOperationSession?.CarteOperations?.Operations?.time);
        const quantity = this.CarteOperationSession?.CarteOperations?.quantity;
        this.operationTimeTotal = operationTime * quantity;

        this.currentTimeOut = 0;
        this.progressTimePourcent = 0;

        this.timer = this.intervalTimer.subscribe(() => {
          this.currentTimeOut++;
          const pourcent = (this.currentTimeOut / this.operationTimeTotal) * 100;
          this.progressTimePourcent = parseFloat(pourcent.toString()).toFixed(0);
          this.timerFormatted = this.formatToSecondTimer(this.currentTimeOut);
        });
      } else {
        this.router.navigate(['/']);
      }
    }, error => {
      this.router.navigate(['/']);
    });
  }

  formatToSecondTimer(seconds) {
    return moment().startOf('day').add(parseFloat(seconds), 'second').format('mm:ss');
  }

  finishOperation() {
    this.showInput = true;
    this.timer.unsubscribe();
    this.startOperationForm.get('time').setValue(this.currentTimeOut);
  }

  sendFinishOperation() {
    const dataToSend = this.startOperationForm.getRawValue();
    this.StartOperationService
      .finish_operation(dataToSend)
      .subscribe((response: any) => {
        if (response && response.status) {
          this.router.navigate(['/']);
        }
      }, (err) => {
        if (err && err.error && err.error.message) {
          this.openModal(err.error.message);
        } else if (err && err.error && err.error.messages) {
          let contentModal = '';
          err.error.messages.forEach(msg => {
            contentModal += msg + '<br>';
          });
          this.openModal(contentModal);
        }
      });
  }

  openModal(message: string) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = 'Error!!';
    modalRef.componentInstance.content = message;
  }

}
