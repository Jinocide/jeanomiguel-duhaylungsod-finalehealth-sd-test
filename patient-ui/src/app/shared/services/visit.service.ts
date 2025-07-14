import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Visit } from "../models/visit.model";

@Injectable({ providedIn: 'root' })
export class VisitService {
    host = '/api';

    constructor(private http: HttpClient) {}

    getByPatient(patientID: string): Observable<Visit[]> {
        return this.http.get<Visit[]>(`${this.host}/patients/${patientID}/visits`);
    }

    create(patientID: string, visit: Visit): Observable<Visit> {
        return this.http.post<Visit>(`${this.host}/patients/${patientID}/visits`, visit)
    }

    update(id: string, visit: Visit): Observable<Visit> {
        return this.http.put<Visit>(`${this.host}/visits/${id}`, visit);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.host}/visits/${id}`);
    }
}