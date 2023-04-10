import { Component, OnInit } from '@angular/core';
import { NgbDatepickerConfig, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { CurrentUser } from './authentication/model/current-user.model';
import { AuthorizeService } from './authentication/service/authorize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'website';
  public currentUser: CurrentUser;

  constructor(
    private authorizeService: AuthorizeService,
    private paginationConfig: NgbPaginationConfig,
    private datepickerConfig: NgbDatepickerConfig,
  ) {
    paginationConfig.maxSize = 4;
    paginationConfig.rotate = false;
    paginationConfig.ellipses = false;
    paginationConfig.boundaryLinks = true;

    datepickerConfig.minDate = { year: 2000, month: 1, day: 1 };
    datepickerConfig.maxDate = { year: new Date().getFullYear(), month: 12, day: 31 };
  }

  ngOnInit(): void {
    this.authorizeService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
  }
}
