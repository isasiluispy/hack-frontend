import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { PopulationDataService, PopulationData } from '../../services/population-data.service';

@Component({
  selector: 'population-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './population-chart.component.html',
  styleUrls: ['./population-chart.component.css']
})
export class PopulationChartComponent implements OnInit {
  public lineChartData: ChartData<'line'> = {
    datasets: [],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor(private populationDataService: PopulationDataService) {}

  ngOnInit(): void {
    this.populationDataService.getPopulationData().subscribe((populationData) => {
      const alabama = populationData.filter((d: PopulationData) => d.state === 'Alabama').sort((a: PopulationData, b: PopulationData) => a.year - b.year);
      const florida = populationData.filter((d: PopulationData) => d.state === 'Florida').sort((a: PopulationData, b: PopulationData) => a.year - b.year);
      const california = populationData.filter((d: PopulationData) => d.state === 'California').sort((a: PopulationData, b: PopulationData) => a.year - b.year);

      this.lineChartData = {
        labels: alabama.map((d: PopulationData) => d.year),
        datasets: [
          {
            data: alabama.map((d: PopulationData) => d.population),
            label: 'Alabama',
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
          },
          {
            data: florida.map((d: PopulationData) => d.population),
            label: 'Florida',
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: false,
          },
          {
            data: california.map((d: PopulationData) => d.population),
            label: 'California',
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
          }
        ],
      };
    });
  }
}
