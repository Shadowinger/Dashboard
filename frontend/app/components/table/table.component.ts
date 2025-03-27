import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Appointment {
  poradi: number;
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
  tableData: Appointment[] = [];
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadAppointments(); // Načti data při spuštění komponenty
    setInterval(() => this.loadAppointments(), 5000); // Načítat data každých 5 sekund
  }

  loadAppointments() {
    console.log("📥 Načítám data z assets/data.json...");

    this.http.get<Appointment[]>('assets/data.json').subscribe({
      next: (data) => {
        console.log("✅ Data načtena:", data);
        console.log("📥 Odpověď z API:", data); // Logování odpovědi z API

        if (Array.isArray(data) && data.length > 0) {
          this.tableData = data.map((item, index) => ({
            ...item,
            poradi: index + 1 // Přiřazení pořadí místo původního ID
          }));
          this.errorMessage = null;
        } else {
          this.errorMessage = "⚠️ Žádná data k dispozici.";
          console.warn("⚠️ Data nejsou k dispozici nebo mají neplatný formát.");
        }

        console.log("📊 Aktuální stav tableData:", this.tableData); // Log aktuálního stavu tableData
        this.cdr.detectChanges(); // Nutí Angular aktualizovat šablonu
      },
      error: (err) => {
        this.errorMessage = `❌ Chyba při načítání dat: ${err.status} - ${err.statusText}`;
        console.error("❌ Chyba při načítání dat:", err);
        this.tableData = [];
      }
    });
  }
}