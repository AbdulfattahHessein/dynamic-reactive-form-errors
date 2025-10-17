import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  auth = inject(AuthService);
  router = inject(Router);

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
