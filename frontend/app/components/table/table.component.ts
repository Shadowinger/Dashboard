import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Patient {
  name: string;
  id?: string;
}

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
  tableData: Appointment[] = [];
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadAppointments(); // Load data on component initialization
    setInterval(() => this.loadAppointments(), 5000); // Reload data every 5 seconds
  }

  loadAppointments() {
    console.log("📥 Loading data from assets/data.json...");

    this.http.get<ApiResponse>('assets/data.json').subscribe({
      next: (response) => {
        console.log("✅ Data loaded:", response.tableData);

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