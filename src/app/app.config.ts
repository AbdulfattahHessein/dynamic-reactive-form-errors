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
import { tap } from 'rxjs';
import { ConfigService } from '../services/env.service';
import { LangService } from '../services/lang.service';
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
  const configService = inject(ConfigService);

  const langService = inject(LangService);

  return configService.getConfig().pipe(
    tap(() => {
      langService.initLang();
    })
  );
}
