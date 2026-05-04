import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

import { CongeRequestDto } from '../dto/conge-request.dto';

@Component({
    selector: 'app-conge-form',
    standalone: true,
    imports: [CommonModule, FormsModule, InputTextModule, DatePickerModule, SelectModule, TextareaModule, ButtonModule],
    templateUrl: './conge-form.component.html',
    styleUrls: ['./conge-form.component.scss']
})
export class CongeFormComponent {
    @Output() submitRequest = new EventEmitter<CongeRequestDto>();

    leaveTypes = [
        { id: 1, name: 'Congé annuel' },
        { id: 2, name: 'Congé maladie' },
        { id: 3, name: 'Congé exceptionnel' },
        { id: 4, name: 'Congé maternité/paternité' }
    ];

    form = {
        leaveTypeId: 1,
        startDate: null as Date | null,
        endDate: null as Date | null,
        reason: '',
        description: ''
    };

    submit(): void {
        if (!this.form.startDate || !this.form.endDate || !this.form.reason.trim()) {
            return;
        }

        this.submitRequest.emit({
            leaveTypeId: this.form.leaveTypeId,
            startDate: this.formatDate(this.form.startDate),
            endDate: this.formatDate(this.form.endDate),
            reason: this.form.reason,
            description: this.form.description
        });

        this.reset();
    }

    reset(): void {
        this.form = {
            leaveTypeId: 1,
            startDate: null,
            endDate: null,
            reason: '',
            description: ''
        };
    }

    private formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }
}
