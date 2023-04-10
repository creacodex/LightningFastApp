import { BehaviorSubject, Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { Credentials } from "../model/credentials.model";
import { CurrentUser } from "../model/current-user.model";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import decode from 'jwt-decode'

@Injectable()
export class AuthorizeService {

    private currentUserSubject: BehaviorSubject<CurrentUser>;
    public currentUser: Observable<CurrentUser>;

    public get token(): string {
        return this.currentUserValue?.token;
    }

    public get currentUserValue(): CurrentUser {
        return this.currentUserSubject.value;
    }

    constructor(
        private authenticationService: AuthenticationService,
    ) {
        this.currentUserSubject = new BehaviorSubject<CurrentUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public isAuthenticated(): boolean {
        return localStorage.getItem('currentUser') != null;
    }

    public isExpiredToken(): boolean {

        if (!this.token) {
            return true;
        }

        const payload = decode(this.token) as any;
        return Date.now() >= payload.exp * 1000;
    }

    public login(credentials: Credentials): Observable<boolean> {
        return this.authenticationService.login(credentials)
            .pipe(
                map((currentUser: CurrentUser) => {
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    this.currentUserSubject.next(currentUser);
                    return true;
                })
            );
    }

    public logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
