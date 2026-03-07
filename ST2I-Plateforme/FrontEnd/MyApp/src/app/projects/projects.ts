import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type ProjectStatus = 'Pending' | 'Running' | 'Ended';
type Department = 'Development' | 'Financial' | 'Marketing';

type Project = {
  id: number;
  name: string;
  description: string;
  department: Department;
  status: ProjectStatus;

  // extra details (frontend-only)
  startDate: string; // dd/mm/yyyy
  endDate?: string; // dd/mm/yyyy
  budget?: number;
  notes?: string;
};

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  // Toolbar state
  searchTerm = '';
  selectedDepartment: 'All' | Department = 'All';
  selectedStatus: 'All' | ProjectStatus = 'All';

  departments: Department[] = ['Development', 'Financial', 'Marketing'];
  statuses: ProjectStatus[] = ['Pending', 'Running', 'Ended'];

  // Modal state
  isAddModalOpen = false;
  isDetailsOpen = false;
  formError = '';

  // Selected project for details modal
  selectedProject: Project | null = null;

  // Add form model
  newProject: Omit<Project, 'id'> = {
    name: '',
    description: '',
    department: 'Development',
    status: 'Pending',
    startDate: '',
    endDate: '',
    budget: undefined,
    notes: '',
  };

  // Mock projects (frontend only)
  projects: Project[] = [
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Revamp the landing page and improve UI/UX design.',
      department: 'Marketing',
      status: 'Pending',
      startDate: '10/02/2026',
      endDate: '',
      budget: 6500,
      notes: 'Waiting for approval from stakeholders.',
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Develop a mobile app for iOS and Android platforms.',
      department: 'Development',
      status: 'Running',
      startDate: '02/01/2026',
      endDate: '',
      budget: 32000,
      notes: 'Sprint-based delivery every 2 weeks.',
    },
    {
      id: 3,
      name: 'E-commerce Platform',
      description: 'Launch a new e-commerce platform with updated features.',
      department: 'Development',
      status: 'Ended',
      startDate: '12/09/2025',
      endDate: '15/12/2025',
      budget: 45000,
      notes: 'Project delivered successfully. Minor maintenance ongoing.',
    },
    {
      id: 4,
      name: 'Budget Forecast 2026',
      description: 'Prepare cost forecasts and quarterly budgeting reports.',
      department: 'Financial',
      status: 'Running',
      startDate: '20/01/2026',
      endDate: '',
      budget: 0,
      notes: 'Coordination with all departments required.',
    },
    {
      id: 5,
      name: 'Social Media Campaign',
      description: 'Plan and execute the next product marketing campaign.',
      department: 'Marketing',
      status: 'Ended',
      startDate: '01/10/2025',
      endDate: '30/11/2025',
      budget: 12000,
      notes: 'Great performance, engagement increased.',
    },
  ];

  // ---- Overview counts ----
  get totalProjectsCount(): number {
    return this.projects.length;
  }
  get runningProjectsCount(): number {
    return this.projects.filter((p) => p.status === 'Running').length;
  }
  get pendingProjectsCount(): number {
    return this.projects.filter((p) => p.status === 'Pending').length;
  }
  get endedProjectsCount(): number {
    return this.projects.filter((p) => p.status === 'Ended').length;
  }

  // ---- Filtering ----
  get filteredProjects(): Project[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.projects.filter((p) => {
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.department.toLowerCase().includes(term) ||
        p.status.toLowerCase().includes(term);

      const matchesDept =
        this.selectedDepartment === 'All' || p.department === this.selectedDepartment;

      const matchesStatus = this.selectedStatus === 'All' || p.status === this.selectedStatus;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }

  trackByProjectId(index: number, p: Project): number {
    return p.id;
  }

  // ---- Quick filters from overview cards ----
  applyQuickFilter(kind: 'total' | 'running' | 'pending' | 'ended'): void {
    if (kind === 'total') {
      this.clearFilters();
      return;
    }
    if (kind === 'running') this.selectedStatus = 'Running';
    if (kind === 'pending') this.selectedStatus = 'Pending';
    if (kind === 'ended') this.selectedStatus = 'Ended';
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedDepartment = 'All';
    this.selectedStatus = 'All';
  }

  // ---- UI helpers ----
  getStatusLabel(status: ProjectStatus): string {
    if (status === 'Running') return 'On Progress';
    return status;
  }

  getCardClass(status: ProjectStatus): string {
    if (status === 'Pending') return 'pending-card';
    if (status === 'Running') return 'progress-card';
    return 'done-card';
  }

  getStatusIcon(status: ProjectStatus): string {
    if (status === 'Pending') return 'bi-hourglass-split';
    if (status === 'Running') return 'bi-arrow-repeat';
    return 'bi-check-circle';
  }

  // ---- Actions (frontend-only) ----
  cycleStatus(id: number): void {
    const order: ProjectStatus[] = ['Pending', 'Running', 'Ended'];

    this.projects = this.projects.map((p) => {
      if (p.id !== id) return p;
      const currentIndex = order.indexOf(p.status);
      const next = order[(currentIndex + 1) % order.length];
      return { ...p, status: next };
    });
  }

  deleteProject(id: number): void {
    const ok = window.confirm('Delete this project?');
    if (!ok) return;

    this.projects = this.projects.filter((p) => p.id !== id);

    // if deleted project is open in details modal
    if (this.selectedProject?.id === id) {
      this.closeDetails();
    }
  }

  // ---- Export CSV (frontend-only) ----
  exportCsv(): void {
    const rows = this.filteredProjects;

    const headers = [
      'ID',
      'Name',
      'Department',
      'Status',
      'Start Date',
      'End Date',
      'Budget',
      'Description',
      'Notes',
    ];

    const escape = (v: string | number) => {
      const s = String(v ?? '');
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };

    const csv = [
      headers.join(','),
      ...rows.map((p) =>
        [
          p.id,
          p.name,
          p.department,
          p.status,
          p.startDate,
          p.endDate ?? '',
          p.budget ?? '',
          p.description,
          p.notes ?? '',
        ]
          .map(escape)
          .join(','),
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `projects_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();

    URL.revokeObjectURL(url);
  }

  // ---- Details modal (click card) ----
  openDetails(p: Project): void {
    this.selectedProject = p;
    this.isDetailsOpen = true;
  }

  closeDetails(): void {
    this.isDetailsOpen = false;
    this.selectedProject = null;
  }

  // ---- Add Project modal ----
  openAddModal(): void {
    this.formError = '';
    this.isAddModalOpen = true;
  }

  closeAddModal(): void {
    this.isAddModalOpen = false;
  }

  saveProject(): void {
    this.formError = '';

    const name = this.newProject.name.trim();
    const description = this.newProject.description.trim();
  
    const startDate = (this.newProject.startDate || '').trim();

    if (!name || !description || !startDate) {
      this.formError = 'Please fill in all required fields.';
      return;
    }

    const nextId = Math.max(0, ...this.projects.map((p) => p.id)) + 1;

    const created: Project = {
      id: nextId,
      ...this.newProject,
      name,
      description,
      startDate,
      endDate: (this.newProject.endDate || '').trim(),
      budget:
        this.newProject.budget === undefined || this.newProject.budget === null
          ? undefined
          : Number(this.newProject.budget),
      notes: (this.newProject.notes || '').trim(),
    };

    this.projects = [created, ...this.projects];

    // reset form
    this.newProject = {
      name: '',
      description: '',
      department: 'Development',
      status: 'Pending',
      startDate: '',
      endDate: '',
      budget: undefined,
      notes: '',
    };

    this.closeAddModal();
  }
}
