import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserCreateDTO } from '../models/user-create.dto';
import { UserAdminUpdateDTO } from '../models/user-admin-update.dto';
import { UserProfileUpdateDTO } from '../models/user-profile-update.dto';
import { UserPasswordChangeDTO } from '../models/user-password-change.dto';
import { UserResponseDTO } from '../models/user-response.dto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:8888/api/users';

  constructor(private http: HttpClient) {}

  // ================= CREATE =================
  // POST /api/users → 201 + created user
  createUser(payload: UserCreateDTO): Observable<UserResponseDTO> {
    return this.http.post<UserResponseDTO>(this.apiUrl, payload);
  }

  // ================= UPDATE BY ADMIN =================
  // PUT /api/users/{id}/admin → 200 + updated user
  updateUserAsAdmin(id: string, payload: UserAdminUpdateDTO): Observable<UserResponseDTO> {
    return this.http.put<UserResponseDTO>(`${this.apiUrl}/${id}/admin`, payload);
  }

  // ================= UPDATE OWN PROFILE =================
  // PUT /api/users/{id}/profile → 200 + updated user
  updateUserProfile(id: string, payload: UserProfileUpdateDTO): Observable<UserResponseDTO> {
    return this.http.put<UserResponseDTO>(`${this.apiUrl}/${id}/profile`, payload);
  }

  // ================= CHANGE OWN PASSWORD =================
  // POST /api/users/{id}/change-password → 204 no content
  changePassword(id: string, payload: UserPasswordChangeDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/change-password`, payload);
  }

  // ================= RESET PASSWORD BY ADMIN =================
  // POST /api/users/{id}/reset-password → 204 no content
  // no body needed — backend generates password and sends email
  resetUserPassword(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/reset-password`, {});
  }

  // ================= FORGOT PASSWORD =================
  // POST /api/users/forgot-password?email= → 200
  // no auth required
  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/forgot-password`,
      {},
      { params: { email } }
    );
  }

  // ================= DELETE =================
  // DELETE /api/users/{id} → 204 no content
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ================= ASSIGN ROLE =================
  // POST /api/users/{id}/assign-role?roleMetadataId= → 200 + updated user
  assignRole(userId: string, roleMetadataId: number): Observable<UserResponseDTO> {
    return this.http.post<UserResponseDTO>(
      `${this.apiUrl}/${userId}/assign-role`,
      {},
      { params: { roleMetadataId } }
    );
  }

  // ================= GET BY ID =================
  // GET /api/users/{id} → 200 + user
  getUserById(id: string): Observable<UserResponseDTO> {
    return this.http.get<UserResponseDTO>(`${this.apiUrl}/${id}`);
  }

  // ================= GET ALL =================
  // GET /api/users → 200 + list
  getAllUsers(): Observable<UserResponseDTO[]> {
    return this.http.get<UserResponseDTO[]>(this.apiUrl);
  }

  // ================= ACTIVE USERS =================
  // GET /api/users/active → 200 + list
  getActiveUsers(): Observable<UserResponseDTO[]> {
    return this.http.get<UserResponseDTO[]>(`${this.apiUrl}/active`);
  }

  // ================= NON ACTIVE USERS =================
  // GET /api/users/inactive → 200 + list
  getInactiveUsers(): Observable<UserResponseDTO[]> {
    return this.http.get<UserResponseDTO[]>(`${this.apiUrl}/inactive`);
  }

  // ================= SEARCH =================
  // GET /api/users/search/firstname?value=
  searchByFirstName(value: string): Observable<UserResponseDTO[]> {
    return this.http.get<UserResponseDTO[]>(
      `${this.apiUrl}/search/firstname`,
      { params: { value } }
    );
  }

  // GET /api/users/search/lastname?value=
  searchByLastName(value: string): Observable<UserResponseDTO[]> {
    return this.http.get<UserResponseDTO[]>(
      `${this.apiUrl}/search/lastname`,
      { params: { value } }
    );
  }
}