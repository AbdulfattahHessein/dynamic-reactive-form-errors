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
  private http = inject(HttpClient);
  private env = inject(envService);

  private _user: User | null = null;

  get user() {
    return this._user;
  }

  get isLoggedIn() {
    return !!this._user;
  }

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
          this._user = null;
        }),
      );
  }

  loadUserInfo() {
    return this.http
      .get<{ data: User } | null>(this.env.env.apiUrl + '/auth/user-info', {
        withCredentials: true,
      })
      .pipe(tap((res) => (this._user = res ? res.data : null)));
  }
}
