import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { OkCancelModalComponent } from './core/dialogs/ok-cancel-modal/ok-cancel-modal.component';
import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { NgbCustomDateAdapter, NgbCustomDateParserFormatter } from './core/datepicker/datepicker-adapter';
import { AuthenticationService } from './authentication/service/authentication.service';
import { AuthorizeService } from './authentication/service/authorize.service';
import { AuthorizeInterceptor } from './authentication/service/authorize.interceptor';
import { AuthorizeErrorInterceptor } from './authentication/service/authorize-error.interceptor';
import { AuthorizeGuard } from './authentication/service/authorize.guard';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    OkCancelModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [
    DatePipe,
    AuthenticationService,
    AuthorizeService,
    AuthorizeGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeErrorInterceptor, multi: true },
    { provide: NgbDateAdapter, useClass: NgbCustomDateAdapter },
    { provide: NgbDateParserFormatter, useClass: NgbCustomDateParserFormatter }
  ],
  bootstrap: [AppComponent],
  entryComponents: [OkCancelModalComponent]
})
export class AppModule { }
