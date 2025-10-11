import { JsonPipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicValidatorMessage } from '../../dynamic-error/core/dynamic-validator-message.directive';
import { InputErrorComponent } from '../../dynamic-error/core/input-error/input-error.component';
import { ValidatorMessageContainer } from '../../dynamic-error/core/validator-message-container.directive';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';

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
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(5),
          Validators.email,
        ],
      }),
      address: new FormGroup(
        {
          street: new FormControl('', Validators.required), //{required: true}
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
