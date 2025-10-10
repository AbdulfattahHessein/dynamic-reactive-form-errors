import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

export interface Env {
  production: boolean;
  apiUrl: string;
  featureFlag: boolean;
}

export interface Langs {
  default: string;
  fallback: string;
  supported: Supported[];
  localeStorageKey: string;
}

export interface Supported {
  code: string;
  name: string;
  flag: string;
}

export interface Config {
  env: Env;
  langs: Langs;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _config!: Config;

  get config() {
    return this._config;
  }

  http = inject(HttpClient);

  getConfig() {
    return this.http
      .get<Config>('configs/config.json')
      .pipe(tap((config) => (this._config = config)));
  }
}
