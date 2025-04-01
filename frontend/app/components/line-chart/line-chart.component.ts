import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

/**
 * Komponenta pro vykreslení čárového grafu.
 */
@Component({
  standalone: true,
  selector: 'app-line',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements AfterViewInit, OnDestroy {
  chart: any;
  labels: string[] = [];
  datasets: any[] = [];
  dataSubscription: Subscription;

  constructor(private http: HttpClient) {}

  /**
   * Lifecycle metoda, která se spouští po inicializaci pohledu.
   * Zde se nastavuje interval pro načítání dat z API.
   */
  ngAfterViewInit() {
    this.dataSubscription = interval(1000).pipe(
      switchMap(() => this.http.get<any>('assets/data.json'))
    ).subscribe(response => {
      console.log('Response from API:', response);

      let data: any[] = [];

      if (response && response.chart2 && Array.isArray(response.chart2.datasets)) {
        data = response.chart2;
      } else {
        console.error('Neplatná data pro chart2, očekáváno pole:', response);
        return;
      }

      console.log('Načtená data:', data);

      if (!this.chart) {
        this.createChart(data);
      } else {
        this.updateChart(data);
      } 
    });
  }

  /**
   * Vytvoří nový čárový graf na základě poskytnutých dat.
   * @param data - Data pro vykreslení grafu.
   */
  createChart(data: any) {
    if (!data || !data.labels || !data.datasets) {
      console.error('Neplatná struktura dat:', data);
      return;
    }
    this.labels = data.labels;
    this.datasets = data.datasets.map((dataset: any) => {
      // Nastavení barvy pozadí pro různé typy dat
      if (dataset.label === 'Vyšetření') {
        dataset.backgroundColor = '#FFA500';
      } else if (dataset.label === 'Videozáznamy') {
        dataset.backgroundColor = '#D81B60';
      } else if (dataset.label === 'Snímky') {
        dataset.backgroundColor = '#1976D2';
      }
      return dataset;
    });

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: this.datasets
      },
      options: {
        responsive: true,
        plugins: {
          legend: { 
            display: true, 
            position: 'bottom', 
            labels: { 
              color: 'white',
              usePointStyle: true
            } 
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
              },
              afterLabel: (tooltipItem) => {
                return `Hodnota: ${tooltipItem.raw}`;
              }
            },
            backgroundColor: '#222222',
            titleColor: 'white',
            bodyColor: 'white'
          }
        },
        scales: {
          x: {
            grid: {
              color: '#000000',
              lineWidth: 0
            },
            ticks: {
              color: 'white'
            }
          },
          y: {
            grid: {
              color: '#000000',
              lineWidth: 1
            },
            ticks: {
              color: 'white'
            }
          }
        },
        elements: {
          point: {
            radius: 0
          },
          line: {
            tension: 0.4
          }
        },
        backgroundColor: '#121212'
      }
    });
  }

  /**
   * Aktualizuje existující čárový graf na základě nových dat.
   * @param data - Nová data pro aktualizaci grafu.
   */
  updateChart(data: any) {
    if (!data || !data.labels || !data.datasets) {
      console.error('Neplatná struktura dat:', data);
      return;
    }
    this.labels = data.labels;
    this.datasets = data.datasets.map((dataset: any) => {
      // Nastavení barvy pozadí pro různé typy dat
      if (dataset.label === 'Vyšetření') {
        dataset.backgroundColor = '#FFA500';
      } else if (dataset.label === 'Videozáznamy') {
        dataset.backgroundColor = '#D81B60';
      } else if (dataset.label === 'Snímky') {
        dataset.backgroundColor = '#1976D2';
      }
      return dataset;
    });

    this.chart.update();
  }

  /**
   * Lifecycle metoda, která se spouští při zničení komponenty.
   * Zde se uvolňují zdroje a předplatné.
   */
  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}