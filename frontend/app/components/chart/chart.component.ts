import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval, switchMap, map } from 'rxjs';
import { lastValueFrom } from 'rxjs';

// Registrace komponent pro Chart.js - Chart 1
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

@Component({
  standalone: true,  
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  @ViewChild('myDonutChart', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  myChart!: Chart;
  private dataSubscription!: Subscription;
  hotovo: number = 0;
  zbyva: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    setTimeout(() => {
      this.fetchData().then(data => this.updateChart(data));
    }, 100);
  
    this.dataSubscription = interval(1000)
      .pipe(switchMap(() => this.http.get<any>('/assets/data.json').pipe(
        map(response => response.chart1) // Pouze data pro Chart 1
      )))
      .subscribe(data => {
        if (data.labels.length && data.values.length) {
          this.updateChartData(data);
        }
      });
  }
  async fetchData(): Promise<{ labels: string[], values: number[] }> {
    try {
      const response = await lastValueFrom(this.http.get<any>('/assets/data.json'));
      const chartData = response.chart1; // Načtení pouze dat pro Chart 1
      console.log('Načtená data:', chartData);
      return chartData;
    } catch (error) {
      console.error('Chyba při načítání dat:', error);
      return { labels: [], values: [] };
    }
  }

  async updateChart(data?: { labels: string[], values: number[] }) {
    if (!data) {
      data = await this.fetchData();
    }
    if (data.labels.length && data.values.length) {
      this.hotovo = data.values[0]; // První hodnota = hotové úkoly
      this.zbyva = data.values[1];  // Druhá hodnota = zbývající úkoly
      if (!this.myChart) {
        this.myChart = new Chart(this.chartCanvas.nativeElement, {
          type: 'doughnut',
          data: {
            labels: data.labels,
            datasets: [{
              data: data.values,
              backgroundColor: ['#FF007F', '#333333'],
              borderWidth: 2,
              borderColor: '#000',
              hoverBorderColor: '#FFF',
            }],
          },
          options: {
            responsive: true,
            cutout: '65%',
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true }
            }
          }
        });
      } else {
        this.updateChartData(data);
      }
    }
  }
  updateChartData(data: { labels: string[], values: number[] }) {
    if (!data || !data.labels || !data.values) {
      console.error('Chybí data pro aktualizaci grafu:', data);
      return;
    }
    this.hotovo = data.values[0];
    this.zbyva = data.values[1];
    this.myChart.data.labels = data.labels;
    this.myChart.data.datasets[0].data = data.values;
    this.myChart.update();
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}