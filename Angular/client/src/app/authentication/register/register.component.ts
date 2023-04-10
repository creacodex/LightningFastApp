import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/core/form-validators/custom-validators.validators';
import { Register } from '../model/register.model';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  public formGroup: FormGroup;
  public isSubmitted = false;
  public errorMessage: string;
  public message: string;

  get firstName() { return this.formGroup.get('firstName'); }
  get lastName() { return this.formGroup.get('lastName'); }
  get email() { return this.formGroup.get('email'); }
  get password() { return this.formGroup.get('password'); }

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      firstName: [null, [Validators.required, Validators.maxLength(100)]],
      lastName: [null, [Validators.required, Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.maxLength(200), Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
      password: [null, [
        Validators.required,
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator( /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true}),
        Validators.minLength(8),
        Validators.maxLength(20),
      ]],
    });
  }

  public onSubmit(): void {
    this.resetMessage();
    if (this.formGroup.invalid) {
      this.errorMessage = 'Please verify your information and try again.';
      this.isSubmitted = true;
      return;
    }

    let dto: Register = <Register>this.formGroup.getRawValue();

    this.authenticationService.register(dto).subscribe(
      () => { },
      (error) => { this.errorMessage = error; },
      () => {
        this.formGroupDirective.resetForm();
        this.isSubmitted = false;
        this.message = 'user registered successfully, please confirm you email.';
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
