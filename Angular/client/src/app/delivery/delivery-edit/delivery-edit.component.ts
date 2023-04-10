import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Delivery } from '../model/delivery.model';
import { OkCancelModalComponent } from 'src/app/core/dialogs/ok-cancel-modal/ok-cancel-modal.component';
import { DeliveryService } from '../service/delivery.service';
import { ShippingTypeService } from 'src/app/shipping-type/service/shipping-type.service';
import { ShippingType } from 'src/app/shipping-type/model/shipping-type.model';
import { CarrierTypeService } from 'src/app/carrier-type/service/carrier-type.service';
import { CarrierType } from 'src/app/carrier-type/model/carrier-type.model';

@Component({
  templateUrl: './delivery-edit.component.html',
  styleUrls: ['./delivery-edit.component.css']
})
export class DeliveryEditComponent implements OnInit {

  public formGroup: FormGroup;
  public isSubmitted = false;
  public errorMessage: string;
  public id: string;
  public date = new Date();
  public minDate: NgbDate = new NgbDate(this.date.getFullYear() - 100, this.date.getMonth() + 1, this.date.getDate());
  public maxDate: NgbDate = new NgbDate(this.date.getFullYear(), this.date.getMonth() + 1, this.date.getDate());

  public shippingTypeList: ShippingType[];
  public carrierTypeList: CarrierType[];

  public get reference() { return this.formGroup.get('reference'); }
  public get startDate() { return this.formGroup.get('startDate'); }
  public get updateDate() { return this.formGroup.get('updateDate'); }
  public get shippingTypeId() { return this.formGroup.get('shippingTypeId'); }
  public get carrierTypeId() { return this.formGroup.get('carrierTypeId'); }
  public get deliveryDate() { return this.formGroup.get('deliveryDate'); }
  public get quantity() { return this.formGroup.get('quantity'); }
  public get price() { return this.formGroup.get('price'); }
  public get discount() { return this.formGroup.get('discount'); }
  public get clientId() { return this.formGroup.get('clientId'); }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ngbModal: NgbModal,
    private deliveryService: DeliveryService,
    private shippingTypeService: ShippingTypeService,
    private carrierTypeService: CarrierTypeService,
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: [null],
      reference: [null, [Validators.required, Validators.min(0), Validators.max(2147483647)]],
      startDate: [{ value: new Date().toISOString(), disabled: true }, [Validators.required]],
      updateDate: [{ value: new Date().toISOString(), disabled: true }],
      shippingTypeId: [null, [Validators.required]],
      carrierTypeId: [null],
      deliveryDate: [null, [Validators.required]],
      quantity: [null, [Validators.required, Validators.min(0), Validators.max(2147483647)]],
      price: [null, [Validators.required, Validators.min(0), Validators.max(999999999.99)]],
      discount: [null, [Validators.min(0), Validators.max(999999999.99)]],
      acceptCondition: [false],
      clientId: [null, [Validators.required]]
    });

    this.load();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id != null) {
      this.find(this.id);
    }
  }

  private load(): void {
    this.formGroup.get('shippingTypeId').valueChanges
      .subscribe((id: string) => {
        this.onShippingTypeChange(id);
      },
        (error) => { this.errorMessage = error; },
      );
    this.formGroup.get('carrierTypeId').valueChanges
      .subscribe((id: string) => {
        this.onCarrierTypeChange(id);
      },
        (error) => { this.errorMessage = error; },
      );
    
    this.shippingTypeService.list()
      .subscribe((list: ShippingType[]) => {
        this.shippingTypeList = list;
      },
        (error) => { this.errorMessage = error; },
      );
    this.carrierTypeService.list()
      .subscribe((list: CarrierType[]) => {
        this.carrierTypeList = list;
      },
        (error) => { this.errorMessage = error; },
      );
  }

  private find(id: string): void {
    this.deliveryService.find(id)
      .subscribe((delivery: Delivery) => {
        this.formGroup.patchValue(delivery);
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

    let dto: Delivery = <Delivery>this.formGroup.getRawValue();

    if (this.id == null) {
      this.deliveryService.add(dto).subscribe(
        () => { },
        (error) => { this.errorMessage = error; },
        () => { this.router.navigate(['/delivery']); }
      );
    } else {
      this.deliveryService.update(dto).subscribe(
        () => { },
        (error) => { this.errorMessage = error; },
        () => { this.router.navigate(['/delivery']); }
      );
    }
  }

  public onDelete(): void {
    this.resetMessage();

    const modal = this.ngbModal.open(OkCancelModalComponent);

    modal.result.then(x => {
      this.deliveryService.delete(this.id).subscribe(
        () => { },
        (error) => { this.errorMessage = error; },
        () => { this.router.navigate(['/delivery']); });
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

  public onShippingTypeChange(id: string): void {
  }
  
  public onCarrierTypeChange(id: string): void {
  }
  
}
