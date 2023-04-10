import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  public errorMessage: string;
  public message: string;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
  ) { }

  public ngOnInit(): void {

    this.route
      .queryParamMap
      .subscribe(params => {

        const userId = params.get('id');
        const code = params.get('code');

        if (!userId || !code) {
          this.errorMessage = 'Please verify your information and try again.';
          return;
        }

        this.authenticationService.confirmEmail(userId, code).subscribe(
          () => { },
          (error) => { this.errorMessage = error; },
          () => {
            this.message = 'Email confirmed successfully';
          }
        );
      });
  }
}
