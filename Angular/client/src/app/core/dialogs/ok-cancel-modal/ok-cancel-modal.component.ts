import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './ok-cancel-modal.component.html'
})
export class OkCancelModalComponent {
  constructor(public modal: NgbActiveModal) { }
}
