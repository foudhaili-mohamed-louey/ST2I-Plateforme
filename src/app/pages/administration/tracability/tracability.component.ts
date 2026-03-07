import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Table, TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';

import { TracabilityService } from './tracability.service';
import { TraceRow, HttpMethod } from './tracability.model';

@Component({
    selector: 'app-tracability',
    standalone: true,
    templateUrl: './tracability.component.html',
    styleUrls: ['./tracability.component.scss'],
    imports: [CommonModule, FormsModule, TableModule, Button, InputText]
})
export class TracabilityComponent implements OnInit {
    rows: TraceRow[] = [];
    loading = false;

    methodOptions: (HttpMethod | '')[] = ['', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
    resultOptions: ('' | 'SUCCESS' | 'FAILED')[] = ['', 'SUCCESS', 'FAILED'];

    filters = {
        user: '',
        service: '',
        method: '' as '' | HttpMethod,
        path: '',
        Ipaddress: '',
        status: '',
        result: '' as '' | 'SUCCESS' | 'FAILED',
        timestamp: ''
    };

    constructor(private tracService: TracabilityService) {}

    ngOnInit(): void {
        this.loadAll();
    }

    loadAll() {
        this.loading = true;
        this.tracService.getAll().subscribe({
            next: (data) => {
                this.rows = data;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    search() {
        this.loading = true;
        this.tracService.search(this.filters).subscribe({
            next: (data) => {
                this.rows = data;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    reset() {
        this.filters = {
            user: '',
            service: '',
            method: '',
            path: '',
            Ipaddress: '',
            status: '',
            result: '',
            timestamp: ''
        };
        this.loadAll();
    }

    export() {
        const csv = this.tracService.exportCsv(this.rows);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Trace.csv';
        a.click();
        URL.revokeObjectURL(url);
    }
}
