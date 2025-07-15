import { Component, ViewChild, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitService } from '../../shared/services/visit.service';
import { Visit } from '../../shared/models/visit.model';
import { VisitFormComponent } from '../visit-form/visit-form.component';

declare var bootstrap: any;

@Component({
  selector: 'app-visit-list',
  imports: [CommonModule, VisitFormComponent],
  templateUrl: './visit-list.component.html',
  styleUrl: './visit-list.component.css'
})
export class VisitListComponent {
    @ViewChild(VisitFormComponent) visitFormComponent?: VisitFormComponent;
    @Output() visitModified = new EventEmitter<void>();
    patientID?: string;
    visits: Visit[] = [];

    constructor(private visitService: VisitService) {}

    loadVisits() {
        if (this.patientID) {
            this.visitService.getByPatient(this.patientID).subscribe({
                next: (data) => {
                    this.visits = data.sort((a, b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime());
                },
                error: (err) => {
                    alert("Error: " + err.error.message);
                }
            });
        }
    }

    onAddClick() {
        if (!this.patientID) {
            alert("Please select a patient.");
            return;
        }

        //show modal
        const modalElement = document.getElementById('visitModal');
        if (!modalElement) return;

        let modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (!modalInstance) {
            modalInstance = new bootstrap.Modal(modalElement);
        }
        
        modalInstance.show();
    }

    
    handleSubmit(visit: Visit) {
        //if visit create
        if (!visit._id) {
            this.visitService.create(this.patientID!, visit).subscribe({
                next: () => {
                    // Remove focus from any input
                    const active = document.activeElement as HTMLElement;
                    if (active) active.blur();

                    //hide modal and show alert
                    const modalElement = document.getElementById('visitModal');
                    if (!modalElement) return;
                    const modalInstance = bootstrap.Modal.getInstance(modalElement);
                    if (modalInstance) {
                        // Attach event listener BEFORE calling hide()
                        modalElement.addEventListener('hidden.bs.modal', () => {
                            alert("Visit is saved successfully");
                            }, { once: true }); // so it only fires once

                        modalInstance.hide();
                    }
                    this.visitModified.emit();
                    this.loadVisits();
                },
                error: (err) => {
                    alert("Error: " + err.error.message);
                }
            });
        }
        //if visit update
        else {
            this.visitService.update(visit._id, visit).subscribe({
                next: () => {
                    // Remove focus from any input
                    const active = document.activeElement as HTMLElement;
                    if (active) active.blur();

                    //hide modal and show alert
                    const modalElement = document.getElementById('visitModal');
                    if (!modalElement) return;
                    const modalInstance = bootstrap.Modal.getInstance(modalElement);
                    if (modalInstance) {
                        // Attach event listener BEFORE calling hide()
                        modalElement.addEventListener('hidden.bs.modal', () => {
                            alert("Visit is edited successfully");
                            }, { once: true }); // so it only fires once

                        modalInstance.hide();
                    }

                    this.loadVisits();
                },
                error: (err) => {
                    alert("Error: " + err.error.message);
                }
            });
        }
    }

    handleDelete(visitID: string) {
        this.visitService.delete(visitID).subscribe({
            next: () => {
                alert("Visit deleted");

                this.visitModified.emit();
                //reload visits
                this.loadVisits();
            },
            error: (err) => {
                alert("Error: " + err.error.message);
            }
        });
    }

    onEditClick(visit: Visit) {
        //show modal
        const modalElement = document.getElementById('visitModal');
        if (!modalElement) return;

        let modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (!modalInstance) {
            modalInstance = new bootstrap.Modal(modalElement);
        }
        
        this.visitFormComponent?.loadVisit(visit);
        modalInstance.show();
    }
}
