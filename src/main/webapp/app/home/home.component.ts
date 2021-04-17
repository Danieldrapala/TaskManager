import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    if(!this.isAuthenticated()){
      this.router.navigate(['/login']);
    }
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  teammates(): void {
    this.router.navigate(['/teammates']);
  }

  // settings(): void {
  //   this.router.navigate(['/settings']);
  // }

  board(): void {
    this.router.navigate(['/board']);
  }

  tasks(): void {
    this.router.navigate(['/tasks']);
  }

  // charts(): void {
  //   this.router.navigate(['/charts']);
  // }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
