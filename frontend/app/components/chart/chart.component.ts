import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval, switchMap, map } from 'rxjs';
import { lastValueFrom } from 'rxjs';

// Register Chart.js components for Doughnut chart
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

@Component({
  standalone: true,  
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  @ViewChild('myDonutChart', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  // Chart instance
  myChart!: Chart;
  
  // Subscription for data fetching
  private dataSubscription!: Subscription;
  
  // Variables to hold task completion data
  hotovo: number = 0; // Completed tasks
  zbyva: number = 0;  // Remaining tasks

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Initial data fetch with a slight delay
    setTimeout(() => {
      this.fetchData().then(data => this.updateChart(data));
    }, 100);
  
    // Set up interval to fetch data every second
    this.dataSubscription = interval(1000)
      .pipe(switchMap(() => 
        this.http.get<any>('/assets/data.json').pipe(
          map(response => response.chart1) // Only data for Chart 1
        )
      ))
      .subscribe(data => {
        // Update chart if valid data is received
        if (data.labels.length && data.values.length) {
          this.updateChartData(data);
        }
      });
  }

  // Fetch data from the JSON file
  async fetchData(): Promise<{ labels: string[], values: number[] }> {
    try {
      const response = await lastValueFrom(this.http.get<any>('/assets/data.json'));
      const chartData = response.chart1; // Load only data for Chart 1
      console.log('Načtená data:', chartData);
      return chartData;
    } catch (error) {
      console.error('Chyba při načítání dat:', error);
      return { labels: [], values: [] };
    }
  }

  // Update chart with new data
  async updateChart(data?: { labels: string[], values: number[] }) {
    if (!data) {
      data = await this.fetchData();
    }
    if (data.labels.length && data.values.length) {
      this.hotovo = data.values[0]; // First value = completed tasks
      this.zbyva = data.values[1];  // Second value = remaining tasks
      if (!this.myChart) {
        // Create a new chart if it doesn't exist
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
        // Update existing chart data
        this.updateChartData(data);
      }
    }
  }

  // Update chart data and refresh the chart
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

  // Clean up subscription on component destroy
  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}