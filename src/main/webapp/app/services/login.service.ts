import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Account } from 'app/core/auth/account.model';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Login } from '../account/login/login.model';
import { AccountService } from './account.service';
import { AuthServerProvider } from './auth-session.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
    private applicationConfigService: ApplicationConfigService,
    private accountService: AccountService,
    private authServerProvider: AuthServerProvider
  ) {}

  login(credentials: Login): Observable<Account | null> {
    return this.authServerProvider.login(credentials).pipe(mergeMap(() => this.accountService.identity(true)));
  }

  logoutUrl(): string {
    return this.applicationConfigService.getEndpointFor('api/logout');
  }

  logoutInClient(): void {
    this.accountService.authenticate(null);
  }

  logout(): void {
    this.authServerProvider.logout().subscribe({ complete: () => this.accountService.authenticate(null) });
  }
}
