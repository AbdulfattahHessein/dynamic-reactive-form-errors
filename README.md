# Angular Dynamic Reactive Form Errors

A lightweight, zero-configuration solution for handling reactive form validation in Angular. This library **automatically displays real-time, translated error messages** for your form controls without requiring you to write any extra HTML for error handling.

## ✨ Features

* **Zero Boilerplate:** No need to write `*ngIf` statements or error message tags in your HTML.
* **Dynamic & Real-Time:** Error messages appear and disappear instantly as the user types.
* **i18n Ready:** Full internationalization support using `@ngx-translate`.
* **Customizable Logic:** Use a custom `ErrorStateMatcher` to control exactly when errors are shown (e.g., on touch, dirty, or submit).
* **Flexible Placement:** Easily change where error messages are rendered in your template.
* **Comprehensive Support:** Works seamlessly with nested `FormGroup` and `FormArray` instances.
* **Opt-Out Control:** Easily disable validation for specific controls when needed.

---

## 🚀 Quick Start

Getting started is simple. Once you've completed the setup, you only need to import the main directive.

1.  **Import `DynamicValidatorMessage` and `ReactiveFormsModule`** into your component.

    ```typescript
    import { Component } from '@angular/core';
    import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
    import { DynamicValidatorMessage } from './dynamic-error/dynamic-validator-message.directive';

    @Component({
      selector: 'app-your-component',
      standalone: true,
      imports: [
        ReactiveFormsModule,
        DynamicValidatorMessage // <-- Import the directive
      ],
      templateUrl: './your-component.html',
    })
    export class YourComponent {
      myForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        // ... other controls
      });

      constructor(private fb: FormBuilder) {}
    }
    ```

2.  **Write your form as usual.** The directive automatically handles the rest.

    ```html
    <form [formGroup]="myForm">
      <label for="email">Email</label>
      <input id="email" formControlName="email">
    </form>
    ```

---

## 🛠️ Installation & Setup

### Step 1: Add Files to Your Project

Copy the `dynamic-error` folder into your project's `src` directory.

### Step 2: Install Dependencies

This library relies on `@ngx-translate` for handling i18n.

```bash
npm install @ngx-translate/core @ngx-translate/http-loader
````

### Step 3: Configure Providers

In your main application configuration (e.g., `app.config.ts` for standalone apps), set up the providers for `HttpClient` and `TranslateService`.

```typescript
// src/app/app.config.ts

import { ApplicationConfig, provideHttpClient } from '@angular/common/http';
import { provideTranslateService, provideTranslateHttpLoader } from 'ngx-translate-provider';

export const appConfig: ApplicationConfig = {
  providers: [
    // Needed for ngx-translate's HttpLoader
    provideHttpClient(),

    // Configure ngx-translate
    provideTranslateService({
      lang: 'en',
      fallbackLang: 'ar',
      loader: provideTranslateHttpLoader({
        prefix: './i18n/', // <-- Path to your translation files
        suffix: '.json',
      }),
    }),
  ],
};
```

-----

## 🌍 Internationalization (i18n)

Create JSON translation files in the path you configured above (e.g., `public/i18n/`). The error messages must be nested under the `dynamicReactiveFormErrors` key.

**`en.json`**

```json
{
  "dynamicReactiveFormErrors": {
    "required": "This field is required",
    "email": "Please enter a valid email address",
    "minlength": "This field must be at least {{requiredLength}} characters long",
    "maxlength": "This field cannot exceed {{requiredLength}} characters"
  }
}
```

**`ar.json`**

```json
{
  "dynamicReactiveFormErrors": {
    "required": "هذا الحقل مطلوب",
    "email": "الرجاء إدخال بريد إلكتروني صحيح"
  }
}
```

-----

## ⚙️ Advanced Customization

### Disabling Validation on a Specific Control

Add the `withoutValidationErrors` attribute to any form control element to prevent the directive from handling its errors.

```html
<input
  formControlName="username"
  withoutValidationErrors
/>
```

### Changing Error Message Position

By default, error messages are rendered right after the form control element. To place them somewhere else, use the `validatorMessageContainer` directive.

1.  Add a template reference variable to an `ng-container` using `validatorMessageContainer`.
2.  Pass the container's `ViewContainerRef` to the control using the `[container]` input.

<!-- end list -->

```html
<form [formGroup]="form">
  <div class="input-group">
    <label>Email Address</label>
    <input
      formControlName="email"
      [container]="errorContainer.container"
    />
  </div>
</form>

<ng-container
  validatorMessageContainer
  #errorContainer="validatorMessageContainer"
/>
```

### Customizing When Errors Are Displayed

You can define your own logic for when errors become visible by providing a custom `ErrorStateMatcher`. This is useful if you want errors to appear on form submission instead of immediately on touch.

1.  Create a class that implements `ErrorStateMatcher`.

    ```typescript
    // src/app/custom-error-state-matcher.ts
    import { Injectable } from '@angular/core';
    import { AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
    import { ErrorStateMatcher } from './dynamic-error/core/error-state-matcher';

    @Injectable()
    export class CustomErrorStateMatcher implements ErrorStateMatcher {
      isErrorVisible(
        control: AbstractControl,
        form: FormGroupDirective | NgForm | null
      ): boolean {
        // Show errors only if the control is invalid AND
        // (the control is touched OR the form has been submitted)
        const isSubmitted = form && form.submitted;
        return !!(control.invalid && (control.touched || isSubmitted));
      }
    }
    ```

2.  Provide it in your component.

    ```typescript
    // your-component.ts
    import { CustomErrorStateMatcher } from '../custom-error-state-matcher';
    import { ErrorStateMatcher } from './dynamic-error/core/error-state-matcher';

    @Component({
      // ...
      providers: [
        { provide: ErrorStateMatcher, useClass: CustomErrorStateMatcher }
      ]
    })
    export class YourComponent {
      // ...
    }
    ```

-----

## 🧪 Demo Project

To run the included demo project for testing:

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

-----

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.
