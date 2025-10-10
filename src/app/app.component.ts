import { Component } from '@angular/core';

import { TestFormComponent } from './test-form/test-form.component';

@Component({
  selector: 'app-root',
  imports: [TestFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
