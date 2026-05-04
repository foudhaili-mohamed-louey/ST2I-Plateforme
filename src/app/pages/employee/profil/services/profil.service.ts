import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProfilResponseDto } from '../dto/profil-response.dto';
import { ProfilUpdateDto } from '../dto/profil-update.dto';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  private fakeProfile: ProfilResponseDto = {
    id: 1,
    firstName: 'Yamen',
    lastName: 'Aissa',
    username: 'yamen.aissa',
    sex: 'Male',
    cin: '12345678',
    hireDate: new Date('2024-02-01'),
    createdAt: new Date('2024-01-15T10:30:00'),
    profession: 'Développeur',
    roleName: 'Employé',
    roleLevel: 30,
    isSystemRole: false,
    isActive: true,
    departmentId: 1,
    departmentName: 'Informatique',
    departmentCode: 'IT',
    email: 'yamen.issa@st2i.com',
    phone: '22 000 000',
    photoUrl: ''
  };

  getMyProfile(): Observable<ProfilResponseDto> {
    return of(this.fakeProfile);
  }

  updateMyProfile(data: ProfilUpdateDto): Observable<ProfilResponseDto> {
    this.fakeProfile = {
      ...this.fakeProfile,
      ...data
    };

    return of(this.fakeProfile);
  }
}