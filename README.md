# Dynamic Reactive Form Errors

A modern Angular library for handling dynamic form validation with real-time error messages and i18n support.

## Features

- Error messages appear and disappear dynamically
- Customizable error message styling
- Custom error state matcher
- Change where error messages appear 
- Internationalization (i18n) support
- Nested form groups and arrays support

## For Test Project Demo
```bash
# Install dependencies
npm install

# Start development server
npm start
```

## How can use it in your project

- Install dependencies
  - npm i --save  @ngx-translate/core @ngx-translate/http-loader 
  - configure ngx-translate provider
    - ```typescript
        provideHttpClient(),
        provideTranslateService({
            lang: 'en',
            fallbackLang: 'ar',
            loader: provideTranslateHttpLoader({
                prefix: './i18n/',
                suffix: '.json',
            }),
        }),
        ```
    - See json examples [i18n Support](#i18n Support)

- Copy dynamic-error folder to your project
- Remove test form folder, it is for test only 


## Project Structure

public/
│   └── i18n/
│       ├── en.json
│       └── ar.json
src/
├── dynamic-error/
│  └── core/
│       ├── input-error/
│       └── ...

## Quick Start

1. Import DynamicValidatorMessage with ReactiveFormsModule:

```typescript

@Component({
  ...,
  
  imports: [
    DynamicValidatorMessage,
    ReactiveFormsModule
  ]
})
export class YourComponent {
    // this is the component that has the reactive form
 }
```

- YourComponent.html:

```html
<form [formGroup]="form">
  <input formControlName="email">
</form>
```

## Core Components

### DynamicValidatorMessage

The main directive for handling validation errors:

```typescript
@Directive({
  selector: `
    [formControl]:not([withoutValidationErrors]),
    [formControlName]:not([withoutValidationErrors]),
    [formGroup]:not([withoutValidationErrors]):not(form),
    [formGroupName]:not([withoutValidationErrors]),
    [formArrayName]:not([withoutValidationErrors])
  `,
  standalone: true,
})
export class DynamicValidatorMessage {}
```
This directive applied automatically for any form element use formControl, formControlName, formGroup, formGroupName,
formArrayName

Notes: 
    - form element that use formGroup not applied to it
    - if you want to disable the dynamic validation put withoutValidationErrors at the form element
    - ```html
        <input withoutValidationErrors />
      ```


### ErrorStateMatcher

Controls when errors are displayed:

```typescript
export class CustomErrorStateMatcher implements ErrorStateMatcher {
    isErrorVisible(
    control: AbstractControl,
    form: FormGroupDirective | NgForm | null
  ) {
    return Boolean(
        control.invalid &&
        (control.touched ||
          control.dirty ||
          (form && form.touched && form.submitted))
    );
  }
}
...

@Component({
    ...,
    providers: [
        {
            provide: ErrorStateMatcher, 
            useClass: CustomErrorStateMatcher
        }
    ]
})
```

## Change where error messages appear

1. Import ValidationMessageContainer directive
2. ```html
    <form [formGroup]="form">
        <input 
        [container]="containerDir.container" formControlName="email"
        />
    </form>
    
    <ng-container
      validatorMessageContainer
      #containerDir="validatorMessageContainer"
    />
   ```

## i18n Support
Supports multiple languages with automatic message translation:

```json
{
  "dynamicReactiveFormErrors": {
    "required": "This field is required",
    "email": "Please enter a valid email"
  }
}
```
## License

MIT License - see the [LICENSE](LICENSE) file for details.

