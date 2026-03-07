import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TraceRow } from './tracability.model';

@Injectable({ providedIn: 'root' })
export class TracabilityService {
    private rows: TraceRow[] = [
        {
            id: 1,
            user: 'anonymous',
            service: 'gateway-service',
            method: 'OPTIONS',
            path: '/bff/traceability/data',
            Ipaddress: '192.168.1.254',
            status: 200,
            result: 'SUCCESS',
            latencyMs: 0,
            timestamp: '26/02/2026 20:44'
        },
        {
            id: 2,
            user: '155a7718-27c0-4eb9-b5af-...',
            service: 'notification-service',
            method: 'GET',
            path: '/notification/ws/info',
            Ipaddress: '192.168.1.254',
            status: 200,
            result: 'SUCCESS',
            latencyMs: 42,
            timestamp: '26/02/2026 20:44'
        }
    ];

    getAll(): Observable<TraceRow[]> {
        return of([...this.rows]);
    }

    search(filters: any): Observable<TraceRow[]> {
        const f = {
            user: (filters.user || '').trim().toLowerCase(),
            service: (filters.service || '').trim().toLowerCase(),
            method: (filters.method || '').trim(),
            path: (filters.path || '').trim().toLowerCase(),
            Ipaddress: (filters.Ipaddress || '').trim().toLowerCase(),
            status: (filters.status || '').trim(),
            result: (filters.result || '').trim(),
            timestamp: (filters.timestamp || '').trim().toLowerCase()
        };

        const result = this.rows.filter((r) => {
            const okUser = !f.user || r.user.toLowerCase().includes(f.user);
            const okService = !f.service || r.service.toLowerCase().includes(f.service);
            const okMethod = !f.method || r.method === f.method;
            const okPath = !f.path || r.path.toLowerCase().includes(f.path);
            const okIp = !f.Ipaddress || r.Ipaddress.toLowerCase().includes(f.Ipaddress);
            const okStatus = !f.status || String(r.status).includes(f.status);
            const okRes = !f.result || r.result === f.result;
            const okDate = !f.timestamp || r.timestamp.toLowerCase().includes(f.timestamp);
            return okUser && okService && okMethod && okPath && okIp && okStatus && okRes && okDate;
        });

        return of([...result]);
    }

    exportCsv(rows: TraceRow[]): string {
        const headers = ['ID', 'User', 'Service', 'Method', 'Path', 'IP Address', 'Status', 'Result', 'Latency (ms)', 'Timestamp'];
        const csvContent = [
            headers.join(','),
            ...rows.map(row => [
                row.id,
                row.user,
                row.service,
                row.method,
                row.path,
                row.Ipaddress,
                row.status,
                row.result,
                row.latencyMs,
                row.timestamp
            ].join(','))
        ].join('\n');
        return csvContent;
    }
}
