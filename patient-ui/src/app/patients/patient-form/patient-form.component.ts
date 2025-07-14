import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Patient } from '../../shared/models/patient.model';


@Component({
  selector: 'app-patient-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.css'
})

export class PatientFormComponent {
    patient?: Patient;
    @Output() submitForm = new EventEmitter<Patient>();

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            _id: [null],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            dob: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', Validators.required],
            address: ['', Validators.required],
        });
    }

    ngAfterViewInit(): void {
        const modalElement = document.getElementById('patientModal');
        if (!modalElement) return;
        modalElement.addEventListener('hidden.bs.modal', () => {
            this.resetForm();
        });
    }

    loadPatient(patient: Patient) {
        this.patient = patient;
        this.patient = {
            ...patient,
            dob: patient.dob.split('T')[0]  // Pre-format DOB before patching
        };
        this.form.patchValue(this.patient);
    }

    onSubmit() {
        if (this.form.valid) {
            this.submitForm.emit(this.form.value);
        }
    }

    resetForm() {
        this.form.reset();
        this.patient = undefined;
    }
}
