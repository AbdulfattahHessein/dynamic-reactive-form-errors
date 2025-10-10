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
import { forkJoin } from 'rxjs';
import { ConfigService as envService } from '../services/env.service';
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

  return forkJoin([configService.loadEnv(), langService.loadLangs()]);
}
