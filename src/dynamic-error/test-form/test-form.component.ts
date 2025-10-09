import { JsonPipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputErrorComponent } from '../core/input-error/input-error.component';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { ValidatorMessageContainer } from '../core/validator-message-container.directive';
import { DynamicValidatorMessage } from '../core/dynamic-validator-message.directive';

@Component({
  selector: 'app-test-form',
  imports: [
    LanguageSwitcherComponent,
    DynamicValidatorMessage,
    ReactiveFormsModule,
    JsonPipe,
    ValidatorMessageContainer,
    InputErrorComponent,
  ],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.scss',
})
export class TestFormComponent {
  @ViewChild('f') f!: NgForm;

  form = new FormGroup(
    {
      email: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(5),
        Validators.email,
      ]),
      address: new FormGroup(
        {
          street: new FormControl('', Validators.required),
          city: new FormControl('', Validators.required),
        },
        function (c) {
          return c.get('street')?.value === c.get('city')?.value
            ? { invalidAddress: true }
            : null;
        }
      ),
      skills: new FormArray([
        new FormGroup({
          name: new FormControl('', Validators.required),
          level: new FormControl('', Validators.required),
        }),
      ]),
    },
    function (c) {
      return c.get('email')?.value === 'test' ? { forbiddenName: true } : null;
    }
  );

  addSkill() {
    this.form.controls.skills.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        level: new FormControl('', Validators.required),
      })
    );
  }

  removeSkill(index: number) {
    this.form.controls.skills.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);

      this.form.reset();

      // this.f.resetForm(); // reset the form submitted flag
    }
  }
  resetForm() {
    this.form.reset();
  }
}
