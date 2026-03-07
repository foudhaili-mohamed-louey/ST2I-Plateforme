import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkActive, Router } from '@angular/router';
import { RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive , CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MyApp');

  constructor(private router : Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
   
}
