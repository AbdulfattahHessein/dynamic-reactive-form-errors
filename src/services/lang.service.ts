import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from './env.service';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  envService = inject(ConfigService);

  get langs() {
    return this.envService.config.langs;
  }

  get langsCodes() {
    return this.langs.supported.map((lang) => lang.code);
  }

  get defaultLang() {
    return this.langs.default;
  }

  get fallbackLang() {
    return this.langs.fallback;
  }

  get localeStorageKey() {
    return this.envService.config.langs.localeStorageKey;
  }

  private _currentLanguage = '';

  get storedLang() {
    return localStorage.getItem(this.localeStorageKey);
  }

  set currentLanguage(lang: string) {
    this._currentLanguage = lang;
    this.switchLanguage();
  }
  get currentLanguage() {
    return this._currentLanguage;
  }

  get browserLang() {
    const browserLang = this.translate.getBrowserLang();
    if (browserLang && this.langsCodes.includes(browserLang)) {
      return browserLang;
    }
    return null;
  }

  private translate = inject(TranslateService);

  initLang() {
    this.translate.addLangs(this.langsCodes);

    this.translate.setFallbackLang(this.fallbackLang);

    this._currentLanguage =
      this.storedLang ?? this.browserLang ?? this.defaultLang;

    this.switchLanguage();
  }

  switchLanguage(): void {
    this.translate.use(this._currentLanguage);
    localStorage.setItem(this.localeStorageKey, this._currentLanguage);
  }
}
