import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { concatMap } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class LangsService {
  _langs!: Langs;

  get langs() {
    return this._langs;
  }

  get langsCodes() {
    return this.langs.supported.map((lang) => lang.code);
  }

  private _currentLanguage = '';

  set currentLanguage(lang: string) {
    this._currentLanguage = lang;
    this.switchLanguage();
  }
  get currentLanguage() {
    return this._currentLanguage;
  }

  get storedLang() {
    return localStorage.getItem(this._langs.localeStorageKey);
  }

  get browserLang() {
    return this.translate.getBrowserLang();
  }

  private translate = inject(TranslateService);

  http = inject(HttpClient);

  loadLangs() {
    return this.http.get<Langs>('configs/langs.json').pipe(
      concatMap((langs) => {
        this._langs = langs;
        return this.setupLangs();
      })
    );
  }

  setupLangs() {
    this.translate.addLangs(this.langsCodes);

    this.translate.setFallbackLang(this.langs.fallback);

    this._currentLanguage = this.langs.default;

    if (this.storedLang && this.langsCodes.includes(this.storedLang)) {
      this._currentLanguage = this.storedLang;
    } else if (this.browserLang && this.langsCodes.includes(this.browserLang)) {
      this._currentLanguage = this.browserLang;
    }

    return this.translate.use(this._currentLanguage);
  }

  switchLanguage(): void {
    this.translate.use(this._currentLanguage);
    localStorage.setItem(this._langs.localeStorageKey, this._currentLanguage);
  }
}
