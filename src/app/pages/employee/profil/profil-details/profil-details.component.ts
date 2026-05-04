import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProfilResponseDto } from '../dto/profil-response.dto';

@Component({
  selector: 'app-profil-details',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './profil-details.component.html',
  styleUrls: ['./profil-details.component.scss']
})
export class ProfilDetailsComponent {
  @Input() user!: ProfilResponseDto;
  @Output() edit = new EventEmitter<void>();

  defaultMale = '/assets/images/default-user-male.png';
  defaultFemale = '/assets/images/default-user-female.png';

  get photo(): string {
    if (this.user.photoUrl && this.user.photoUrl.trim() !== '') {
      return this.user.photoUrl;
    }

    return this.user.sex === 'Female' ? this.defaultFemale : this.defaultMale;
  }

  getLevelClass(level: number | undefined): string {
    if (!level) return 'level-default';
    if (level >= 80) return 'level-high';
    if (level >= 50) return 'level-mid';
    return 'level-low';
  }
}