import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

export interface Env {
  production: boolean;
  apiUrl: string;
  featureFlag: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class envService {
  private _env!: Env;

  get env() {
    return this._env;
  }

  http = inject(HttpClient);

  loadEnv() {
    return this.http
      .get<Env>('configs/env.json')
      .pipe(tap((env) => (this._env = env)));
  }
}
