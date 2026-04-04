import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateDepartmentRequestDTO } from '../dtos/create-department-request.dto';
import { DepartmentResponseDTO } from '../dtos/department-response.dto';
import { UpdateDepartmentDTO } from '../dtos/update-department.dto';

export interface CurrentUserResponse {
  username: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private readonly BASE_URL = 'http://localhost:8888/api/departments';

  constructor(private http: HttpClient) {}

  // POST /api/departments
  createDepartment(dto: CreateDepartmentRequestDTO): Observable<DepartmentResponseDTO> {
    return this.http.post<DepartmentResponseDTO>(this.BASE_URL, dto);
  }

  // GET /api/departments/{id}
  getById(id: number): Observable<DepartmentResponseDTO> {
    return this.http.get<DepartmentResponseDTO>(`${this.BASE_URL}/${id}`);
  }

  // GET /api/departments
  getAll(): Observable<DepartmentResponseDTO[]> {
    return this.http.get<DepartmentResponseDTO[]>(this.BASE_URL);
  }

  // GET /api/departments/active
  getActiveDepartments(): Observable<DepartmentResponseDTO[]> {
    return this.http.get<DepartmentResponseDTO[]>(`${this.BASE_URL}/active`);
  }

  // GET /api/departments/code/{code}
  getByCode(code: string): Observable<DepartmentResponseDTO> {
    return this.http.get<DepartmentResponseDTO>(`${this.BASE_URL}/code/${code}`);
  }

  // GET /api/departments/search?name=...
  searchByName(name: string): Observable<DepartmentResponseDTO[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<DepartmentResponseDTO[]>(`${this.BASE_URL}/search`, { params });
  }

  // PUT /api/departments/{id}
  updateDepartment(id: number, dto: UpdateDepartmentDTO): Observable<DepartmentResponseDTO> {
    return this.http.put<DepartmentResponseDTO>(`${this.BASE_URL}/${id}`, dto);
  }

  // DELETE /api/departments/{id}
  deleteDepartment(id: number): Observable<string> {
    return this.http.delete<string>(
      `${this.BASE_URL}/${id}`,
      { responseType: 'text' as 'json' }
    );
  }

  // PATCH /api/departments/{id}/activate
  activateDepartment(id: number): Observable<string> {
    return this.http.patch<string>(
      `${this.BASE_URL}/${id}/activate`,
      {},
      { responseType: 'text' as 'json' }
    );
  }

  // PATCH /api/departments/{id}/deactivate
  deactivateDepartment(id: number): Observable<string> {
    return this.http.patch<string>(
      `${this.BASE_URL}/${id}/deactivate`,
      {},
      { responseType: 'text' as 'json' }
    );
  }

  // GET /api/departments/me
  getCurrentUser(): Observable<CurrentUserResponse> {
    return this.http.get<CurrentUserResponse>(`${this.BASE_URL}/me`);
  }
}