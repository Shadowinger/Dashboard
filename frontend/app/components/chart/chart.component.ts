import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval, switchMap } from 'rxjs';
import { lastValueFrom } from 'rxjs';

// Registrace komponent pro Chart.js
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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    setTimeout(() => {
      this.fetchData().then(data => this.updateChart(data));
    }, 100);
  
    this.dataSubscription = interval(5000)
      .pipe(switchMap(() => this.http.get<{ labels: string[], values: number[] }>('/assets/data.json')))
      .subscribe(data => {
        if (data.labels.length && data.values.length) {
          this.updateChartData(data);
        }
      });
  }
  async fetchData(): Promise<{ labels: string[], values: number[] }> {
    try {
      const response = await lastValueFrom(this.http.get<{ labels: string[], values: number[] }>('/assets/data.json'));
      console.log('Načtená data:', response);
      return response;
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
    this.myChart.data.labels = data.labels;
    this.myChart.data.datasets[0].data = data.values;
    this.myChart.update();
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}