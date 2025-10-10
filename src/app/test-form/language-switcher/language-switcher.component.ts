import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css'],
  imports: [FormsModule],
})
export class LanguageSwitcherComponent {
  languages = [
    { code: 'en', name: 'English', flag: 'US' },
    { code: 'ar', name: 'Arabic', flag: 'EG' },
  ];

  currentLanguage = 'en';

  private translate = inject(TranslateService);

  ngOnInit() {
    const storedLang = localStorage.getItem('language');

    if (storedLang) {
      this.currentLanguage = storedLang;
      this.translate.use(storedLang);
    } else {
      const browserLang = this.translate.getBrowserLang();

      const defaultLang = browserLang?.match(/en|ar/)
        ? browserLang
        : this.translate.getFallbackLang() ?? 'en';

      this.currentLanguage = defaultLang;

      this.translate.use(defaultLang);

      localStorage.setItem('language', defaultLang);
    }
  }

  switchLanguage(): void {
    this.translate.use(this.currentLanguage);
    localStorage.setItem('language', this.currentLanguage);
  }
}
