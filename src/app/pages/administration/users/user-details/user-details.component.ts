import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

import { UsersService } from '../services/users.service';
import { UserResponseDTO } from '../models/user-response.dto';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user-details',
  standalone: true,
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  imports: [CommonModule, RouterModule, ButtonModule]
})
export class UserDetailsComponent implements OnInit {

  user?: UserResponseDTO;
  loading = true;

  defaultMale = '/assets/images/default-user-male.png';
  defaultFemale = '/assets/images/default-user-female.png';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (!id) {
        this.loading = false;
        this.cd.detectChanges();
        return;
      }

      this.usersService.getUserById(id).subscribe({
        next: (u) => {
          this.user = u;
          this.loading = false;
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error('Error loading user', err);
          this.loading = false;
          this.cd.detectChanges();
        }
      });
    });
  }

  // ===== PHOTO =====
  get photo(): string {
    if (!this.user) return this.defaultMale;
    if (this.user.photoUrl && this.user.photoUrl.trim() !== '') {
      return this.user.photoUrl;
    }
    return this.user.sex === 'Female' ? this.defaultFemale : this.defaultMale;
  }

  // ===== ROLE LEVEL BADGE COLOR =====
  getLevelClass(level: number | undefined): string {
    if (!level) return 'level-default';
    if (level >= 80) return 'level-high';
    if (level >= 50) return 'level-mid';
    return 'level-low';
  }

}