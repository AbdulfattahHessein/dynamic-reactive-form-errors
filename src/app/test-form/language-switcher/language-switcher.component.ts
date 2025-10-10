import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LangsService } from '../../../services/langs.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css'],
  imports: [FormsModule],
})
export class LanguageSwitcherComponent {
  langService = inject(LangsService);
}
