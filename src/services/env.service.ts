import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GlobalConfigService } from './global-config.service';

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

  path = 'configs/environments/env.{{type}}.json';

  http = inject(HttpClient);

  global = inject(GlobalConfigService);

  loadEnv() {
    const type = this.global.config.production ? 'prod' : 'dev';

    const configPath = this.path.replace('{{type}}', type);

    return this.http.get<Env>(configPath).pipe(tap((env) => (this._env = env)));
  }
}
