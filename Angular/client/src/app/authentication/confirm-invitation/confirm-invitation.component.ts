import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'src/app/core/form-validators/custom-validators.validators';
import { ConfirmInvitation } from '../model/confirm-invitation.model';
import { AuthenticationService } from '../service/authentication.service';
import { AuthorizeService } from '../service/authorize.service';

@Component({
  selector: 'app-confirm-invitation',
  templateUrl: './confirm-invitation.component.html',
  styleUrls: ['./confirm-invitation.component.css']
})
export class ConfirmInvitationComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  public formGroup: FormGroup;
  public isSubmitted = false;
  public errorMessage: string;
  public message: string;
  private code: string;

  get email() { return this.formGroup.get('email'); }
  get password() { return this.formGroup.get('password'); }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private authorizeService: AuthorizeService,
  ) { }

  public ngOnInit(): void {

    if (this.authorizeService.isAuthenticated()) {
      this.authorizeService.logout();
      this.router.navigate(['/authentication/login']);
    }

    this.formGroup = this.fb.group({
      email: [null, [Validators.required, Validators.maxLength(200), Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
      password: [null, [
        Validators.required,
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
        Validators.minLength(8),
        Validators.maxLength(20),
      ]],
    });

    this.route
      .queryParamMap
      .subscribe(params => {
        this.code = params.get('code');
      });
  }

  public onSubmit(): void {
    this.resetMessage();

    if (this.formGroup.invalid || !this.code) {
      this.errorMessage = 'Please verify your information and try again.';
      this.isSubmitted = true;
      return;
    }

    let dto: ConfirmInvitation = <ConfirmInvitation>this.formGroup.getRawValue();
    dto.code = this.code;

    this.authenticationService.confirmInvitation(dto).subscribe(
      () => { },
      (error) => { this.errorMessage = error; },
      () => {
        this.formGroupDirective.resetForm();
        this.isSubmitted = false;
        this.message = 'Account created, please login.';
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
