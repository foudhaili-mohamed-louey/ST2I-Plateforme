export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';

export interface TraceRow {
    id: number;
    user: string;
    service: string;
    method: HttpMethod;
    path: string;
    Ipaddress: string;
    status: number;
    result: 'SUCCESS' | 'FAILED';
    latencyMs: number;
    timestamp: string; // "26/02/2026 20:44"
}
