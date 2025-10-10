import { FormControl, FormGroup, Validators } from '@angular/forms';

export function createLoginForm(): FormGroup {
  return new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(6),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
}
