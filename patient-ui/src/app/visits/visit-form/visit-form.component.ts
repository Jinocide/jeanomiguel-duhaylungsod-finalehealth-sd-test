import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Visit } from '../../shared/models/visit.model';

@Component({
  selector: 'app-visit-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './visit-form.component.html',
  styleUrl: './visit-form.component.css'
})
export class VisitFormComponent {
    visit?: Visit;
    @Output() submitForm = new EventEmitter<Visit>();

    form: FormGroup;
    
    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            _id: [null],
            visitDate: ['', Validators.required],
            notes: [''],
            visitType: ['', Validators.required]
        });
    }

    ngAfterViewInit(): void {
        const modalElement = document.getElementById('visitModal');
        if (!modalElement) return;
        modalElement.addEventListener('hidden.bs.modal', () => {
            this.resetForm();
        });
    }

    loadVisit(visit: Visit) {
        this.visit = visit;
        this.visit = {
            ...visit,
            visitDate: visit.visitDate.split('T')[0]  // Pre-format visit date before patching
        };
        this.form.patchValue(this.visit);
    }

    onSubmit() {
        if (this.form.valid) {
            this.submitForm.emit(this.form.value);
        }
    }

    resetForm() {
        this.form.reset();
        this.visit = undefined;
    }
}
