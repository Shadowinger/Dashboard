import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface Appointment {
  mistnost: string;
  cas: string;
  vysetreni: string;
  lekar: string;
  pacient: string;
  oddeleni: string;
  status: string;
}
@Component({
  standalone: true,  
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  appointments: Appointment[] = [];
  errorMessage: string | null = null;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.loadAppointments();
  }
  loadAppointments() {
    console.log("Načítám data z assets/data.json");

    this.http.get<{ tableData: Appointment[] }>('assets/data.json').subscribe({
      next: (data) => {
        console.log("Načtená data:", data);
        if (data?.tableData && Array.isArray(data.tableData) && data.tableData.length) {
          this.appointments = data.tableData;
          console.log("Uložené schůzky:", this.appointments);
          this.errorMessage = null;
        } else {
          this.errorMessage = "Neplatný formát dat nebo prázdná tabulka.";
          console.error("Neplatný formát dat:", data);
          this.appointments = [];
        }
      },
      error: (err) => {
        this.errorMessage = "Chyba při načítání dat.";
        console.error("Chyba při načítání dat:", err);
        this.appointments = [];
      }
    });
  }
}