export interface Visit {
    _id?: string;
    patientID: string;
    visitDate: string;
    notes?: string;
    visitType: 'Home' | 'Telehealth' | 'Clinic';
    dateCreated?: string;
    dateUpdated?: string;
}