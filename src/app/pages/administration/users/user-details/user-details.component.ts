import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

import { UsersService } from '../services/users.service';
import { AppUser } from '../models/user.model';

import { Button } from 'primeng/button';

@Component({
  selector: 'app-user-details',
  standalone: true,
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  imports: [CommonModule, RouterModule, Button]
})
export class UserDetailsComponent implements OnInit {
  user?: AppUser;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usersService.getById(id).subscribe(u => this.user = u);
  }

  back() {
    this.router.navigate(['/administration/users']);
  }
}