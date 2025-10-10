import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrors } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-input-error',
  imports: [CommonModule, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input-error.component.html',
  styleUrl: './input-error.component.scss',
})
export class InputErrorComponent {
  @Input()
  errors: ValidationErrors | undefined | null = null;
}
