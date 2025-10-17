import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicValidatorMessage } from '../../../dynamic-error/core/dynamic-validator-message.directive';
import { AuthService } from '../../../services/auth.service';
import { createLoginForm } from './create-login-form';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, DynamicValidatorMessage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form = createLoginForm();

  auth = inject(AuthService);

  router = inject(Router);

  onSubmit() {
    const value = this.form.getRawValue();

    this.auth.login(value).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
