import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { concatMap, forkJoin } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { envService } from '../services/env.service';
import { GlobalConfigService } from '../services/global-config.service';
import { LangsService } from '../services/langs.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './i18n/',
        suffix: '.json',
      }),
    }),

    provideAppInitializer(initializeApp),
  ],
};

function initializeApp() {
  const configService = inject(envService);

  const langService = inject(LangsService);

  const global = inject(GlobalConfigService);

  const auth = inject(AuthService);

  return global
    .loadGlobalConfig()
    .pipe(
      concatMap(() =>
        forkJoin([configService.loadEnv(), langService.loadLangs()])
      )
    )
    .pipe(concatMap(() => auth.loadUserInfo()));
}
