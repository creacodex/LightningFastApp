import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUser } from '../model/current-user.model';
import { Credentials } from '../model/credentials.model';
import { AuthorizeService } from '../service/authorize.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  
  public formGroup: FormGroup;
  public isSubmitted = false;
  public errorMessage: string;

  get email() { return this.formGroup.get('email'); }
  get password() { return this.formGroup.get('password'); }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authorizeService: AuthorizeService,
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: [null, [Validators.required, Validators.maxLength(200), Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
      password: [null, [Validators.required, Validators.maxLength(200)]],
    });
  }

  public onSubmit(): void {
    this.resetMessage();

    if (this.formGroup.invalid) {
      this.errorMessage = 'Please verify your information and try again.';
      this.isSubmitted = true;
      return;
    }

    let dto: Credentials = <Credentials>this.formGroup.getRawValue();

    this.authorizeService.login(dto).subscribe(
      (isAuthenticated: boolean) => {
      },
      (error) => { this.errorMessage = error; },
      () => { this.router.navigate(['/home']); }
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
  }

}
