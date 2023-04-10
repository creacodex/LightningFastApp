import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Users } from '../model/users.model';
import { OkCancelModalComponent } from 'src/app/core/dialogs/ok-cancel-modal/ok-cancel-modal.component';
import { UsersService } from '../service/users.service';


@Component({
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {

  public formGroup: FormGroup;
  public isSubmitted = false;
  public errorMessage: string;
  public id: string;
  public users: Users;

  get userName() { return this.formGroup.get('userName'); }
  get normalizedUserName() { return this.formGroup.get('normalizedUserName'); }
  get firstName() { return this.formGroup.get('firstName'); }
  get lastName() { return this.formGroup.get('lastName'); }
  get email() { return this.formGroup.get('email'); }
  get normalizedEmail() { return this.formGroup.get('normalizedEmail'); }
  get passwordHash() { return this.formGroup.get('passwordHash'); }
  get securityStamp() { return this.formGroup.get('securityStamp'); }
  get concurrencyStamp() { return this.formGroup.get('concurrencyStamp'); }
  get phoneNumber() { return this.formGroup.get('phoneNumber'); }
  get lockoutEnd() { return this.formGroup.get('lockoutEnd'); }
  get accessFailedCount() { return this.formGroup.get('accessFailedCount'); }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ngbModal: NgbModal,
    private usersService: UsersService,

  ) { }

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: [null, [Validators.required]],
      firstName: [null, [Validators.required, Validators.maxLength(100)]],
      lastName: [null, [Validators.required, Validators.maxLength(100)]],
      email: [{value: false, disabled: true}],
      emailConfirmed: [false],
      phoneNumber: [null],
      phoneNumberConfirmed: [false],
      twoFactorEnabled: [false],
    });

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id == null) {
      this.load();
    } else {
      this.find(this.id);
    }
  }

  private load(): void {

  }

  private find(id: string): void {
    this.usersService.find(id)
      .subscribe((users: Users) => {
        this.users = users;
        this.formGroup.patchValue(users);
      });
  }

  public submit(): void {
    if (this.formGroup.invalid) {
      this.isSubmitted = true;
      return;
    }

    let dto: Users = <Users>this.formGroup.getRawValue();

    if (this.id != null) {
      this.usersService.update(dto).subscribe(
        () => { },
        (error) => { this.errorMessage = error; },
        () => { this.router.navigate(['/users']); }
      );
    }
  }

  public delete(): void {
    const modal = this.ngbModal.open(OkCancelModalComponent);

    modal.result.then(x => {
      this.usersService.delete(this.id).subscribe(
        () => { },
        error => { this.errorMessage = error; },
        () => { this.router.navigate(['/users']); });
    }, x => { }
    );
  }

  public isInvalid(control: string): boolean {
    const ctrl = this.formGroup.get(control);
    return ctrl.invalid && (ctrl.dirty || this.isSubmitted);
  }
}
