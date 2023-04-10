import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthorizeService } from 'src/app/authentication/service/authorize.service';
import { UserProfile } from '../model/user-profile.model';
import { UserProfileService } from '../service/user-profile.service';


@Component({
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {

  public formGroup: FormGroup;
  public isSubmitted = false;
  public errorMessage: string;
  public message: string;
  public id: string;
  public userProfile: UserProfile;

  get firstName() { return this.formGroup.get('firstName'); }
  get lastName() { return this.formGroup.get('lastName'); }
  get email() { return this.formGroup.get('email'); }
  get phoneNumber() { return this.formGroup.get('phoneNumber'); }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userProfileService: UserProfileService,
    private authorizeService: AuthorizeService,
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: [null, [Validators.required]],
      firstName: [null, [Validators.required, Validators.maxLength(100)]],
      lastName: [null, [Validators.required, Validators.maxLength(100)]],
      email: [{ value: false, disabled: true }],
      emailConfirmed: [false],
      phoneNumber: [null],
      phoneNumberConfirmed: [false],
      twoFactorEnabled: [false],
    });

    this.id = this.authorizeService.currentUserValue.id;

    if (this.id == null) {
      this.authorizeService.logout();
      this.router.navigate(['/authentication/login']);
    } else {
      this.find(this.id);
    }
  }

  private find(id: string): void {
    this.userProfileService.find(id)
      .subscribe((userProfile: UserProfile) => {
        this.userProfile = userProfile;
        this.formGroup.patchValue(userProfile);
      });
  }

  public submit(): void {
    if (this.formGroup.invalid) {
      this.isSubmitted = true;
      return;
    }

    let dto: UserProfile = <UserProfile>this.formGroup.getRawValue();

    if (this.id != null) {
      this.userProfileService.update(dto).subscribe(
        () => { },
        (error) => { this.errorMessage = error; },
        () => { this.message = 'Profile updated successfully'; }
      );
    }
  }

  public isInvalid(control: string): boolean {
    const ctrl = this.formGroup.get(control);
    return ctrl.invalid && (ctrl.dirty || this.isSubmitted);
  }
}
