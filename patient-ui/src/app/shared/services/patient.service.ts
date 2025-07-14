import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Patient } from "../models/patient.model";

@Injectable({ providedIn: 'root' })
export class PatientService { 
    host = '/api';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Patient[]> {
        return this.http.get<Patient[]>(`${this.host}/patients`);
    }

    get(id: string): Observable<Patient> {
        return this.http.get<Patient>(`${this.host}/patients/${id}`);
    }

    create(patient: Patient): Observable<Patient> {
        return this.http.post<Patient>(`${this.host}/patients`, patient);
    }

    update(id: string, patient: Patient): Observable<Patient> {
        return this.http.put<Patient>(`${this.host}/patients/${id}`, patient);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.host}/patients/${id}`);
    }
}