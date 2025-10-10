import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicValidatorMessage } from '../../dynamic-error/core/dynamic-validator-message.directive';
import { LanguageSwitcherComponent } from '../test-form/language-switcher/language-switcher.component';
import { createLoginForm } from './create-login-form';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    DynamicValidatorMessage,
    LanguageSwitcherComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  form = createLoginForm();

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.form.reset();
    }
  }
}
