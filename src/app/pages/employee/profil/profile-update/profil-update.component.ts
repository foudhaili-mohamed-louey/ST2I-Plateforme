import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { ProfilResponseDto } from '../dto/profil-response.dto';
import { ProfilUpdateDto } from '../dto/profil-update.dto';

@Component({
  selector: 'app-profil-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './profil-update.component.html',
  styleUrls: ['./profil-update.component.scss']
})
export class ProfilUpdateComponent implements OnInit {
  @Input() user!: ProfilResponseDto;
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<ProfilUpdateDto>();

  form: ProfilUpdateDto = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    username: ''
  };

  ngOnInit(): void {
    this.form = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phone: this.user.phone,
      email: this.user.email,
      username: this.user.username
    };
  }

  submit(): void {
    this.save.emit(this.form);
  }
}