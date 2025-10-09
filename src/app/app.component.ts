import { Component, inject, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { TestFormComponent } from '../dynamic-error/test-form/test-form.component';

@Component({
  selector: 'app-root',
  imports: [TestFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
