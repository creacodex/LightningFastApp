import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { CarrierType } from '../model/carrier-type.model';
import { OkCancelModalComponent } from 'src/app/core/dialogs/ok-cancel-modal/ok-cancel-modal.component';
import { CarrierTypeService } from '../service/carrier-type.service';


@Component({
  templateUrl: './carrier-type-edit.component.html',
  styleUrls: ['./carrier-type-edit.component.css']
})
export class CarrierTypeEditComponent implements OnInit {

  public formGroup: FormGroup;
  public isSubmitted = false;
  public errorMessage: string;
  public id: string;
  

  

  public get name() { return this.formGroup.get('name'); }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ngbModal: NgbModal,
    private carrierTypeService: CarrierTypeService,
    
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(20)]],
      isVisible: [true]
    });

    this.load();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id != null) {
      this.find(this.id);
    }
  }

  private load(): void {
    
    
    
  }

  private find(id: string): void {
    this.carrierTypeService.find(id)
      .subscribe((carrierType: CarrierType) => {
        this.formGroup.patchValue(carrierType);
      },
        (error) => { this.errorMessage = error; },
      );
  }

  public onSubmit(): void {
    this.resetMessage();

    if (this.formGroup.invalid) {
      this.errorMessage = 'Please verify your information and try again.';
      this.isSubmitted = true;
      return;
    }

    let dto: CarrierType = <CarrierType>this.formGroup.getRawValue();

    if (this.id == null) {
      this.carrierTypeService.add(dto).subscribe(
        () => { },
        (error) => { this.errorMessage = error; },
        () => { this.router.navigate(['/carriertype']); }
      );
    } else {
      this.carrierTypeService.update(dto).subscribe(
        () => { },
        (error) => { this.errorMessage = error; },
        () => { this.router.navigate(['/carriertype']); }
      );
    }
  }

  public onDelete(): void {
    this.resetMessage();

    const modal = this.ngbModal.open(OkCancelModalComponent);

    modal.result.then(x => {
      this.carrierTypeService.delete(this.id).subscribe(
        () => { },
        (error) => { this.errorMessage = error; },
        () => { this.router.navigate(['/carriertype']); });
    }, x => { }
    );
  }

  public isInvalid(control: string): boolean {
    const ctrl = this.formGroup.get(control);
    return ctrl.invalid && this.isSubmitted;
  }

  public displayErrors(): boolean {
    return this.errorMessage != null || this.formGroup.invalid && this.isSubmitted;
  }

  private resetMessage(): void {
    this.errorMessage = null;
  }

  
}
