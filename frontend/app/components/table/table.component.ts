import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Appointment {
  id: string;
  room: string | null;
  time: string;
  examination: string;
  doctor: string;
  patient: { name: string } | null;
  department: string | null;
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

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    console.log("📥 Načítám data z assets/data.json...");

    this.http.get<{ tableData: Appointment[] }>('assets/data.json').subscribe({
      next: (data) => {
        console.log("✅ Data načtena:", data);

        if (data?.tableData && Array.isArray(data.tableData) && data.tableData.length > 0) {
          try {
            this.appointments = data.tableData.map((item: Appointment) => ({
              id: item.id?.toString() || 'N/A',
              room: item.room ?? 'N/A',
              time: item.time ?? 'N/A',
              examination: item.examination ?? 'Neznámé vyšetření',
              doctor: item.doctor ?? 'Neznámý lékař',
              patient: item.patient ? { name: item.patient.name } : { name: 'Neznámý pacient' },
              department: item.department ?? 'Neuvedeno',
              status: item.status ?? 'unknown'
            }));

            console.log("📋 Zpracovaná data:", this.appointments);
            this.errorMessage = null;
          } catch (error) {
            console.error("⚠️ Chyba při mapování dat:", error);
            this.errorMessage = "⚠️ Chyba při zpracování dat.";
            this.appointments = [];
          }
        } else {
          this.errorMessage = "⚠️ Žádná data k dispozici.";
          console.warn("⚠️ Data nejsou k dispozici nebo mají neplatný formát.");
          this.appointments = [];
        }

        console.log("📊 Aktuální stav appointments:", this.appointments);
        this.cdr.detectChanges(); // Nutí Angular aktualizovat šablonu
      },
      error: (err) => {
        this.errorMessage = `❌ Chyba při načítání dat: ${err.status} - ${err.statusText}`;
        console.error("❌ Chyba při načítání dat:", err);
        console.error("❌ Detaily chyby:", err.message);
        this.appointments = [];
      }
    });
  }
}