import { Component } from '@angular/core';

import { TestFormComponent } from './test-form/test-form.component';
import { LoginFormComponent } from "./login-form/login-form.component";

@Component({
  selector: 'app-root',
  imports: [TestFormComponent, LoginFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
