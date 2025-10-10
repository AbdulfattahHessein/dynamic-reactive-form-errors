import {
  ComponentRef,
  DestroyRef,
  Directive,
  inject,
  Input,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlContainer,
  FormGroupDirective,
  NgControl,
  TouchedChangeEvent,
} from '@angular/forms';
import { debounceTime, EMPTY, filter, merge } from 'rxjs';
import { ErrorStateMatcher } from './error-state-matcher.service';
import { InputErrorComponent } from './input-error/input-error.component';

@Directive({
  selector: `
    [formControl]:not([withoutValidationErrors]),
    [formControlName]:not([withoutValidationErrors]),
    [formGroup]:not([withoutValidationErrors]):not(form),
    [formGroupName]:not([withoutValidationErrors]),
    [formArrayName]:not([withoutValidationErrors])
  `,
})
export class DynamicValidatorMessage implements OnInit {
  ngControl =
    inject(NgControl, { self: true, optional: true }) ||
    inject(ControlContainer, { self: true });

  get form() {
    return this.parentContainer?.formDirective as FormGroupDirective | null;
  }
  @Input()
  errorStateMatcher = inject(ErrorStateMatcher);

  @Input()
  container = inject(ViewContainerRef);

  private errorComponentRef: ComponentRef<InputErrorComponent> | null = null;

  private parentContainer = inject(ControlContainer, { optional: true });

  get isErrorVisible() {
    return this.errorStateMatcher.isErrorVisible(this.control, this.form);
  }

  get control() {
    if (!this.ngControl.control)
      throw Error(`No control model for ${this.ngControl.name} control...`);

    return this.ngControl.control;
  }

  destroyRef = inject(DestroyRef);

  ngOnInit() {
    const submitEvent = this.form?.ngSubmit.asObservable() ?? EMPTY;

    const touchEvent = this.control.events.pipe(
      filter(
        (event) => event instanceof TouchedChangeEvent && this.control.pristine
      )
    );

    const statusChanges = this.control.statusChanges.pipe(debounceTime(500));

    merge(statusChanges, touchEvent, submitEvent)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.isErrorVisible) {
          if (!this.errorComponentRef) {
            this.errorComponentRef =
              this.container.createComponent(InputErrorComponent);
          }

          this.errorComponentRef.setInput('errors', this.control.errors);
        } else {
          this.errorComponentRef?.destroy();
          this.errorComponentRef = null;
        }
      });
  }
}
