import { Component, ViewChild } from '@angular/core';
import { PatientListComponent } from "./patients/patient-list/patient-list.component";
import { VisitListComponent } from './visits/visit-list/visit-list.component';

@Component({
  selector: 'app-root',
  imports: [PatientListComponent, VisitListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  @ViewChild(VisitListComponent) visitListComponent?: VisitListComponent;
  @ViewChild(PatientListComponent) patientListComponent?: PatientListComponent;

  onPatientSelected(patientID: string) {
    this.visitListComponent!.patientID = patientID;
    this.visitListComponent?.loadVisits();
  }

  onVisitsModified() {
    this.patientListComponent?.loadPatients();
  }

  onPatientDelete(patientID: string) {
    if (this.visitListComponent!.patientID === patientID) {
        delete this.visitListComponent?.patientID;
        this.visitListComponent!.visits = []
    }
  }
}
