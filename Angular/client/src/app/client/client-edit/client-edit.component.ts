import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '../model/client.model';
import { OkCancelModalComponent } from 'src/app/core/dialogs/ok-cancel-modal/ok-cancel-modal.component';
import { ClientService } from '../service/client.service';


@Component({
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  public formGroup: FormGroup;
  public isSubmitted = false;
  public errorMessage: string;
  public id: string;
  public date = new Date();
  public minDate: NgbDate = new NgbDate(this.date.getFullYear() - 100, this.date.getMonth() + 1, this.date.getDate());
  public maxDate: NgbDate = new NgbDate(this.date.getFullYear(), this.date.getMonth() + 1, this.date.getDate());

  

  public get birthdayDate() { return this.formGroup.get('birthdayDate'); }
  public get firstName() { return this.formGroup.get('firstName'); }
  public get lastName() { return this.formGroup.get('lastName'); }
  public get email() { return this.formGroup.get('email'); }
  public get phone01() { return this.formGroup.get('phone01'); }
  public get webSite() { return this.formGroup.get('webSite'); }
  public get startDate() { return this.formGroup.get('startDate'); }
  public get updateDate() { return this.formGroup.get('updateDate'); }
  public get deleteDate() { return this.formGroup.get('deleteDate'); }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ngbModal: NgbModal,
    private clientService: ClientService,
    
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: [null],
      birthdayDate: [null],
      firstName: [null, [Validators.required, Validators.maxLength(100)]],
      lastName: [null, [Validators.required, Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.maxLength(200), Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
      phone01: [null, [Validators.maxLength(20), Validators.pattern('^[0-9]{3}[-][0-9]{3}[-][0-9]{4}$')]],
      webSite: [null, [Validators.maxLength(200)]],
      isActive: [false],
      startDate: [{ value: new Date().toISOString(), disabled: true }, [Validators.required]],
      updateDate: [{ value: new Date().toISOString(), disabled: true }, [Validators.required]],
      isDeleted: [false],
      deleteDate: [{ value: null, disabled: true }]
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
    this.clientService.find(id)
      .subscribe((client: Client) => {
        this.formGroup.patchValue(client);
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

    let dto: Client = <Client>this.formGroup.getRawValue();

    if (this.id == null) {
      this.clientService.add(dto).subscribe(
        () => { },
        (error) => { this.errorMessage = error; },
        () => { this.router.navigate(['/client']); }
      );
    } else {
      this.clientService.update(dto).subscribe(
        () => { },
        (error) => { this.errorMessage = error; },
        () => { this.router.navigate(['/client']); }
      );
    }
  }

  public onDelete(): void {
    this.resetMessage();

    const modal = this.ngbModal.open(OkCancelModalComponent);

    modal.result.then(x => {
      this.clientService.delete(this.id).subscribe(
        () => { },
        (error) => { this.errorMessage = error; },
        () => { this.router.navigate(['/client']); });
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
