import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilDetailsComponent } from './profil-details/profil-details.component';
import { ProfilUpdateComponent } from './profile-update/profil-update.component';

import { ProfilService } from './services/profil.service';
import { ProfilResponseDto } from './dto/profil-response.dto';
import { ProfilUpdateDto } from './dto/profil-update.dto';

@Component({
    selector: 'app-profil',
    standalone: true,
    imports: [CommonModule, ProfilDetailsComponent, ProfilUpdateComponent],
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
    user?: ProfilResponseDto;
    loading = true;
    editMode = false;

    constructor(private profilService: ProfilService) {}

    ngOnInit(): void {
        this.loadProfile();
    }

    loadProfile(): void {
        this.loading = true;

        this.profilService.getMyProfile().subscribe({
            next: (profil) => {
                this.user = profil;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    showUpdateForm(): void {
        this.editMode = true;
    }

    cancelUpdate(): void {
        this.editMode = false;
    }

    saveProfile(data: ProfilUpdateDto): void {
        this.profilService.updateMyProfile(data).subscribe({
            next: (updatedProfil) => {
                this.user = updatedProfil;
                this.editMode = false;
            }
        });
    }
}
