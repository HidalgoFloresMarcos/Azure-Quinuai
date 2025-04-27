import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, ChartType } from 'chart.js/auto';

interface NutritionalValue {
  name: string;
  percentage: number;
  value: string;
}

interface ChartData {
  date: Date;
  value: number;
}

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EstadisticasComponent implements OnInit, AfterViewInit {
  @ViewChild('rachaChart') rachaChartRef!: ElementRef;
  @ViewChild('ahorroChart') ahorroChartRef!: ElementRef;

  selectedDay: number = 1;
  showCalendar = false;
  totalCalories = 1500;
  rachaChart: Chart | undefined;
  ahorroChart: Chart | undefined;

  nutritionalValues: NutritionalValue[] = [
    {
      name: 'Carbohidratos',
      percentage: 46,
      value: '150gr/300 gr'
    },
    {
      name: 'Proteínas',
      percentage: 74,
      value: '40gr/60 gr'
    },
    {
      name: 'Grasas',
      percentage: 14,
      value: '40gr/60 gr'
    }
  ];

  rachaData: ChartData[] = [
    { date: new Date(2024, 1, 1), value: 20 },
    { date: new Date(2024, 1, 2), value: 25 },
    { date: new Date(2024, 1, 3), value: 22 },
    { date: new Date(2024, 1, 4), value: 30 },
    { date: new Date(2024, 1, 5), value: 28 },
    { date: new Date(2024, 1, 6), value: 35 },
    { date: new Date(2024, 1, 7), value: 40 }
  ];

  ahorroData = {
    sugerido: [
      { date: new Date(2024, 1, 1), value: 100 },
      { date: new Date(2024, 1, 2), value: 98 },
      { date: new Date(2024, 1, 3), value: 95 },
      { date: new Date(2024, 1, 4), value: 97 },
      { date: new Date(2024, 1, 5), value: 94 },
      { date: new Date(2024, 1, 6), value: 96 },
      { date: new Date(2024, 1, 7), value: 93 }
    ],
    retail: [
      { date: new Date(2024, 1, 1), value: 120 },
      { date: new Date(2024, 1, 2), value: 122 },
      { date: new Date(2024, 1, 3), value: 125 },
      { date: new Date(2024, 1, 4), value: 123 },
      { date: new Date(2024, 1, 5), value: 127 },
      { date: new Date(2024, 1, 6), value: 128 },
      { date: new Date(2024, 1, 7), value: 130 }
    ]
  };

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeRachaChart();
    this.initializeAhorroChart();
  }

  private initializeRachaChart(): void {
    const ctx = this.rachaChartRef.nativeElement.getContext('2d');
    
    this.rachaChart = new Chart(ctx, {
      type: 'line' as ChartType,
      data: {
        labels: this.rachaData.map(d => d.date.getDate()),
        datasets: [{
          label: 'Racha',
          data: this.rachaData.map(d => d.value),
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  private initializeAhorroChart(): void {
    const ctx = this.ahorroChartRef.nativeElement.getContext('2d');
    
    this.ahorroChart = new Chart(ctx, {
      type: 'line' as ChartType,
      data: {
        labels: this.ahorroData.sugerido.map(d => d.date.getDate()),
        datasets: [
          {
            label: 'Mercado sugerido',
            data: this.ahorroData.sugerido.map(d => d.value),
            borderColor: '#FF5252',
            backgroundColor: 'transparent',
            tension: 0.4
          },
          {
            label: 'Mercado retail',
            data: this.ahorroData.retail.map(d => d.value),
            borderColor: '#2196F3',
            backgroundColor: 'transparent',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
  }
}
