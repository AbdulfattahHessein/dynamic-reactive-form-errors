import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

export interface GlobalConfig {
  production: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GlobalConfigService {
  private _config!: GlobalConfig;

  get config() {
    return this._config;
  }

  http = inject(HttpClient);

  loadGlobalConfig() {
    return this.http
      .get<GlobalConfig>('configs/global.json')
      .pipe(tap((config) => (this._config = config)));
  }
}
