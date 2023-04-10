import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ForgotPassword } from '../model/forgot-password.model';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  public formGroup: FormGroup;
  public isSubmitted = false;
  public errorMessage: string;
  public message: string;

  get email() { return this.formGroup.get('email'); }

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: [null, [Validators.required, Validators.maxLength(200), Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
    });
  }

  public onSubmit(): void {
    this.resetMessage();

    if (this.formGroup.invalid) {
      this.errorMessage = 'Please verify your information and try again.';
      this.isSubmitted = true;
      return;
    }

    let dto: ForgotPassword = <ForgotPassword>this.formGroup.getRawValue();

    this.authenticationService.forgotPassword(dto).subscribe(
      () => { },
      (error) => { this.errorMessage = error; },
      () => {
        this.formGroupDirective.resetForm();
        this.isSubmitted = false;
        this.message = 'Password reset email sent';
       }
    );
  }

  public onCancel(): void {
    this.resetMessage();
    this.formGroupDirective.resetForm();
    this.isSubmitted = false;
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
    this.message = null;
  }
}
