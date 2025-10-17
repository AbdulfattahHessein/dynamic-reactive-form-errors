import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicValidatorMessage } from '../../../dynamic-error/core/dynamic-validator-message.directive';
import { AuthService } from '../../../services/auth.service';
import { createRegisterForm } from './create-register-form';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, DynamicValidatorMessage],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form = createRegisterForm();

  auth = inject(AuthService);

  router = inject(Router);

  onSubmit() {
    const value = this.form.getRawValue();

    this.auth.register(value).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
