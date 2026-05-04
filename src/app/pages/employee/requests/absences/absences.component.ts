import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-absences',
  imports: [BreadcrumbModule],
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.scss'],
})
export class AbsencesComponent {
  home: MenuItem = {
    label: 'Accueil',
    icon: 'pi pi-home',
    routerLink: '/'
  };

  items: MenuItem[] = [
    
    {
      label: 'Gestion des absences'
    }
  ];
}
