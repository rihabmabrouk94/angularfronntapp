import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-component',
  templateUrl: 'modal.component.html'
})
export class ModalComponent {
  @Input() title = '';
  @Input() withCloseBtn = true;
  @Input() withCloseBtnFooter = true;
  @Input() content = '';

  constructor(public activeModal: NgbActiveModal) {}
}
