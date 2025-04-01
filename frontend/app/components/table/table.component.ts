import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Interface to define the structure of a Patient
interface Patient {
  name: string;
  id?: string;
}

// Interface to define the structure of an Appointment
interface Appointment {
  poradi: number;
  room: string | null;
  time: string;
  procedure: string;
  doctor: string;
  patient: Patient | string;
  department: string | null;
  status: string;
}

// Interface to define the structure of the API response
interface ApiResponse {
  tableData: Appointment[];
}

@Component({
  standalone: true,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [CommonModule]
})
export class TableComponent implements OnInit {
  // Array to hold appointment data
  tableData: Appointment[] = [];
  
  // Variable to hold error messages
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadAppointments(); // Load data on component initialization

    // Reload data every 5 seconds
    setInterval(() => this.loadAppointments(), 5000);
  }

  // Method to load appointments from the API
  loadAppointments() {
    console.log("📥 Loading data from assets/data.json...");

    this.http.get<ApiResponse>('assets/data.json').subscribe({
      next: (response) => {
        console.log("✅ Data loaded:", response.tableData);

        // Check if the response contains valid data
        if (Array.isArray(response.tableData) && response.tableData.length > 0) {
          this.tableData = response.tableData.map((item, index) => ({
            ...item,
            poradi: index + 1 // Assign order instead of original ID
          }));
          this.errorMessage = null;
        } else {
          this.errorMessage = "⚠️ No data available.";
          console.warn("⚠️ Data is not available or has an invalid format.");
        }

        console.log("📊 Current tableData state:", this.tableData);
        this.cdr.detectChanges(); // Force Angular to update the template
      },
      error: (err) => {
        this.errorMessage = `❌ Error loading data: ${err.status} - ${err.statusText}`;
        console.error("❌ Error loading data:", err);
        this.tableData = [];
      }
    });
  }
}