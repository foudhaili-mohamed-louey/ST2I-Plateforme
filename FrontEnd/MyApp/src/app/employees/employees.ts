import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

type EmployeeStatus = 'Active' | 'Inactive';
type Gender = 'Male' | 'Female';

type Department = 'IT' | 'HR' | 'Finance' | 'Marketing';

type Employee = {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  department: Department;
  role: string;
  status: EmployeeStatus;
  hireDate: string; // dd/mm/yyyy (string is fine for frontend demo)
};

@Component({
  selector: 'app-employees',
  imports: [CommonModule],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees {
  @ViewChild('employeesTable') employeesTable?: ElementRef<HTMLDivElement>;

  // Toolbar state
  searchTerm = '';
  selectedDepartment: 'All' | Department = 'All';
  selectedStatus: 'All' | EmployeeStatus = 'All';

  // Selection state
  private selectedIds = new Set<number>();

  // Modal state
  isAddModalOpen = false;
  formError = '';

  departments: Department[] = ['IT', 'HR', 'Finance', 'Marketing'];

  // Add form model
  newEmployee: Omit<Employee, 'id' | 'avatar'> = {
    firstName: '',
    lastName: '',
    gender: 'Male',
    department: 'IT',
    role: '',
    status: 'Active',
    hireDate: '',
  };

  // Mock data (front-end only)
  employees: Employee[] = [
    {
      id: 1,
      avatar: 'https://i.pravatar.cc/40?img=1',
      firstName: 'Ahmed',
      lastName: 'Ben Salah',
      gender: 'Male',
      department: 'IT',
      role: 'Software Engineer',
      status: 'Active',
      hireDate: '12/03/2022',
    },
    {
      id: 2,
      avatar: 'https://i.pravatar.cc/40?img=2',
      firstName: 'Sarra',
      lastName: 'Trabelsi',
      gender: 'Female',
      department: 'HR',
      role: 'HR Manager',
      status: 'Active',
      hireDate: '05/09/2022',
    },
    {
      id: 3,
      avatar: 'https://i.pravatar.cc/40?img=3',
      firstName: 'Youssef',
      lastName: 'Mansour',
      gender: 'Male',
      department: 'Finance',
      role: 'Accountant',
      status: 'Inactive',
      hireDate: '18/06/2021',
    },
    {
      id: 4,
      avatar: 'https://i.pravatar.cc/40?img=4',
      firstName: 'Ines',
      lastName: 'Khemiri',
      gender: 'Female',
      department: 'Marketing',
      role: 'Content Specialist',
      status: 'Active',
      hireDate: '09/11/2023',
    },
    {
      id: 5,
      avatar: 'https://i.pravatar.cc/40?img=5',
      firstName: 'Omar',
      lastName: 'Gharbi',
      gender: 'Male',
      department: 'IT',
      role: 'DevOps Engineer',
      status: 'Inactive',
      hireDate: '22/01/2020',
    },
  ];

  // ---- Overview counts (dynamic) ----
  get totalEmployeesCount(): number {
    return this.employees.length;
  }

  get maleEmployeesCount(): number {
    return this.employees.filter((e) => e.gender === 'Male').length;
  }

  get femaleEmployeesCount(): number {
    return this.employees.filter((e) => e.gender === 'Female').length;
  }

  get activeEmployeesCount(): number {
    return this.employees.filter((e) => e.status === 'Active').length;
  }

  get inactiveEmployeesCount(): number {
    return this.employees.filter((e) => e.status === 'Inactive').length;
  }

  get departmentsCount(): number {
    return new Set(this.employees.map((e) => e.department)).size;
  }

  // ---- Filtering ----
  get filteredEmployees(): Employee[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.employees.filter((e) => {
      const matchesSearch =
        !term ||
        `${e.firstName} ${e.lastName}`.toLowerCase().includes(term) ||
        e.department.toLowerCase().includes(term) ||
        e.role.toLowerCase().includes(term) ||
        e.gender.toLowerCase().includes(term);

      const matchesDept = this.selectedDepartment === 'All' || e.department === this.selectedDepartment;
      const matchesStatus = this.selectedStatus === 'All' || e.status === this.selectedStatus;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }

  // trackBy (fixes your TS2339)
  trackByEmployeeId(index: number, e: Employee): number {
    return e.id;
  }

  // ---- Quick filters (overview cards) ----
  applyQuickFilter(kind: 'total' | 'active' | 'inactive' | 'departments'): void {
    if (kind === 'total') {
      this.clearFilters();
      return;
    }
    if (kind === 'active') this.selectedStatus = 'Active';
    if (kind === 'inactive') this.selectedStatus = 'Inactive';
    this.scrollToTable();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedDepartment = 'All';
    this.selectedStatus = 'All';
    this.scrollToTable();
  }

  private scrollToTable(): void {
    this.employeesTable?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ---- Selection (filtered only) ----
  get selectedCount(): number {
    return this.filteredEmployees.filter((e) => this.selectedIds.has(e.id)).length;
  }

  isSelected(id: number): boolean {
    return this.selectedIds.has(id);
  }

  toggleOne(id: number, checked: boolean): void {
    if (checked) this.selectedIds.add(id);
    else this.selectedIds.delete(id);
  }

  get allFilteredSelected(): boolean {
    const list = this.filteredEmployees;
    return list.length > 0 && list.every((e) => this.selectedIds.has(e.id));
  }

  get someFilteredSelected(): boolean {
    const list = this.filteredEmployees;
    if (list.length === 0) return false;
    const count = list.filter((e) => this.selectedIds.has(e.id)).length;
    return count > 0 && count < list.length;
  }

  toggleSelectAll(checked: boolean): void {
    const list = this.filteredEmployees;
    if (checked) list.forEach((e) => this.selectedIds.add(e.id));
    else list.forEach((e) => this.selectedIds.delete(e.id));
  }

  // ---- Export CSV (frontend-only) ----
  exportCsv(): void {
    const rows = this.filteredEmployees;
    const headers = ['ID', 'First Name', 'Last Name', 'Gender', 'Department', 'Role', 'Status', 'Hire Date'];

    const escape = (v: string | number) => {
      const s = String(v ?? '');
      // wrap in quotes if needed
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };

    const csv = [
      headers.join(','),
      ...rows.map((e) =>
        [
          e.id,
          e.firstName,
          e.lastName,
          e.gender,
          e.department,
          e.role,
          e.status,
          e.hireDate,
        ].map(escape).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `employees_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();

    URL.revokeObjectURL(url);
  }

  // ---- Modal (frontend-only) ----
  openAddModal(): void {
    this.formError = '';
    this.isAddModalOpen = true;
  }

  closeAddModal(): void {
    this.isAddModalOpen = false;
  }

  saveEmployee(): void {
    this.formError = '';

    const firstName = this.newEmployee.firstName.trim();
    const lastName = this.newEmployee.lastName.trim();
    const role = this.newEmployee.role.trim();
    const hireDate = this.newEmployee.hireDate.trim();

    if (!firstName || !lastName || !role || !hireDate) {
      this.formError = 'Please fill in all required fields.';
      return;
    }

    const nextId = Math.max(0, ...this.employees.map((e) => e.id)) + 1;

    const created: Employee = {
      id: nextId,
      avatar: `https://i.pravatar.cc/40?u=${encodeURIComponent(firstName + lastName + nextId)}`,
      ...this.newEmployee,
      firstName,
      lastName,
      role,
      hireDate,
    };

    this.employees = [created, ...this.employees];

    // reset form
    this.newEmployee = {
      firstName: '',
      lastName: '',
      gender: 'Male',
      department: 'IT',
      role: '',
      status: 'Active',
      hireDate: '',
    };

    this.closeAddModal();
    this.scrollToTable();
  }

  // ---- Actions (frontend-only) ----
  toggleStatus(id: number): void {
    this.employees = this.employees.map((e) =>
      e.id === id ? { ...e, status: e.status === 'Active' ? 'Inactive' : 'Active' } : e
    );
  }

  deleteEmployee(id: number): void {
    const ok = window.confirm('Delete this employee?');
    if (!ok) return;

    this.employees = this.employees.filter((e) => e.id !== id);
    this.selectedIds.delete(id);
  }
}
