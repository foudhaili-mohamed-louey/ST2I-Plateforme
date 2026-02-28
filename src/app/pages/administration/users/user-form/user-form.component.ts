import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from '../services/users.service';
import { AppUser, Sex } from '../models/user.model';

import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Checkbox } from 'primeng/checkbox';

@Component({
  selector: 'app-user-form',
  standalone: true,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  imports: [CommonModule, FormsModule, Button, InputText, Checkbox]
})
export class UserFormComponent implements OnInit {
  isEdit = false;
  idUser?: number;

  sexOptions: Sex[] = ['Male', 'Female'];
  nationalityOptions = ['Tunisian', 'Other'];

  roles = ['Admin','Manager','HR','test'];
  selectedRoles: string[] = [];

  form: AppUser = {
    idUser: 0,
    cin: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    sex: 'Male',
    hireDate: '',
    isActive: true,
    profession: '',
    department: '',
    identifiantUnique: '',
    birthPlace: '',
    nationality: '',
    passportNumber: '',
    residence: { governorate: '', delegation: '', bureau: '', postalCode: '', address: '' }
  };

  constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!idParam;

    if (this.isEdit) {
      this.idUser = Number(idParam);
      this.usersService.getById(this.idUser).subscribe(u => {
        if (!u) return;
        this.form = JSON.parse(JSON.stringify(u));
      });
    }
  }

  toggleRole(role: string) {
    const idx = this.selectedRoles.indexOf(role);
    if (idx === -1) this.selectedRoles.push(role);
    else this.selectedRoles.splice(idx, 1);
  }

  save() {
    if (!this.form.firstName.trim() || !this.form.lastName.trim() || !this.form.email.trim()) {
      alert('At least first name, last name and email are required.');
      return;
    }

    if (this.isEdit && this.idUser != null) {
      this.usersService.update(this.idUser, this.form).subscribe(() => this.back());
    } else {
      this.usersService.create(this.form).subscribe(() => this.back());
    }
  }

  back() {
    this.router.navigate(['/administration/users']);
  }
}