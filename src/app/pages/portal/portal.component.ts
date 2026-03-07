import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-portal',
  standalone: true,
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class PortalComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    this.router.navigate(['/auth/login']);
  }
}