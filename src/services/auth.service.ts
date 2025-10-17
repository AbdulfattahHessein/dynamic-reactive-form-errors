import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Role } from '../app/models/role';
import { envService } from './env.service';

export type User = {
  id: string;
  email: string;
  role: Role;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  env = inject(envService);
  get isLoggedIn() {
    return !!this.user;
  }

  user: User | null = null;

  login(user: { email: string; password: string }): Observable<any> {
    return this.http
      .post(this.env.env.apiUrl + '/auth/login', user, {
        withCredentials: true,
      })
      .pipe(switchMap(() => this.loadUserInfo()));
  }

  register(user: { email: string; password: string }): Observable<any> {
    return this.http.post(this.env.env.apiUrl + '/auth/register', user);
  }

  logout() {
    return this.http
      .get(this.env.env.apiUrl + '/auth/logout', { withCredentials: true })
      .pipe(
        tap(() => {
          this.user = null;
        })
      );
  }

  loadUserInfo() {
    return this.http
      .get<{ data: User } | null>(this.env.env.apiUrl + '/auth/user-info', {
        withCredentials: true,
      })
      .pipe(tap((res) => (this.user = res ? res.data : null)));
  }
}

// auth with jwt in local storage
// sent jwt token to front
// front save jwt token in local storage
// front send jwt token to back
// front delete jwt token from local storage to logout

// auth with jwt in cookie
// back save jwt token in cookie
// cookies sent to back with every request automatically
// back is responsible for deleting jwt token from cookie
