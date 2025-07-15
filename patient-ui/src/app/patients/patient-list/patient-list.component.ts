import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { PatientService } from '../../shared/services/patient.service';
import { Patient } from '../../shared/models/patient.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientFormComponent } from "../patient-form/patient-form.component";

declare var bootstrap: any;

@Component({
  selector: 'app-patient-list',
  imports: [CommonModule, FormsModule, PatientFormComponent],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent {
    @ViewChild(PatientFormComponent) patientFormComponent?: PatientFormComponent;
    @Output() selectPatient = new EventEmitter<string>();
    @Output() onPatientDelete = new EventEmitter<string>();

    patients: Patient[] = [];
    search = '';
    selectedPatientID?: string;
    summaryPatient?: Patient;

    get filteredPatients(): Patient[] {
        return this.patients.filter(p => 
            (p.firstName + ' ' + p.lastName + p.email).toLowerCase().includes(this.search.toLowerCase())
        );
    }

    constructor(private patientService: PatientService) {}

    ngOnInit() {
        this.loadPatients();
    }

    loadPatients() {
        this.patientService.getAll().subscribe({
            next: (data) => {
                this.patients = data
            },
            error: (err) => {
                alert("Error: " + err.error.message)
            }
        });
    }

    choosePatient(id: string) {
        this.selectedPatientID = id;
        this.selectPatient.emit(id);
    }

    handleSubmit(patient: Patient) {
        //if patient creation
        if (!patient._id) {
            this.patientService.create(patient).subscribe({
                next: () => {
                    // Remove focus from any input
                    const active = document.activeElement as HTMLElement;
                    if (active) active.blur();

                    //hide modal and show alert
                    const modalElement = document.getElementById('patientModal');
                    if (!modalElement) return;
                    const modalInstance = bootstrap.Modal.getInstance(modalElement);
                    if (modalInstance) {
                        // Attach event listener BEFORE calling hide()
                        modalElement.addEventListener('hidden.bs.modal', () => {
                            alert("Patient is saved successfully");
                            }, { once: true }); // so it only fires once

                        modalInstance.hide();
                    }

                    //reload patients
                    this.loadPatients();
                },
                error: (err) => {
                    alert("Error: " + err.error.message);
                }
            });
        }

        //if patient update
        else {
            this.patientService.update(patient._id, patient).subscribe({
                next: () => {
                    // Remove focus from any input
                    const active = document.activeElement as HTMLElement;
                    if (active) active.blur();

                    //hide modal and show alert
                    const modalElement = document.getElementById('patientModal');
                    if (!modalElement) return;
                    const modalInstance = bootstrap.Modal.getInstance(modalElement);
                    if (modalInstance) {
                        // Attach event listener BEFORE calling hide()
                        modalElement.addEventListener('hidden.bs.modal', () => {
                            alert("Patient is edited successfully");
                            }, { once: true }); // so it only fires once

                        modalInstance.hide();
                    }

                    //reload patients
                    this.loadPatients();
                },
                error: (err) => {
                    alert("Error: " + err.error.message);
                }
            });

        }

        
    }

    handleDelete(patientID: string) {
        this.patientService.delete(patientID).subscribe({
            next: () => {
                alert("Patient deleted");

                //reload patients
                this.loadPatients();

                this.onPatientDelete.emit(patientID);
            },
            error: (err) => {
                alert("Error: " + err.error.message);
            }
        });
    }

    onEditClick(patient: Patient) {
        //show modal
        const modalElement = document.getElementById('patientModal');
        if (!modalElement) return;

        let modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (!modalInstance) {
            modalInstance = new bootstrap.Modal(modalElement);
        }
        
        this.patientFormComponent?.loadPatient(patient);
        modalInstance.show();
    }

    openSummaryModal(patient: Patient) {
        this.summaryPatient = patient;

        const modalElement = document.getElementById('summaryModal');
        if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        }
    }
}
