import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { Apollo, gql } from 'apollo-angular';

const GET_POPULATION_DATA = gql`
  query {
    populationData {
      state
      year
      population
    }
  }
`;

interface PopulationData {
  state: string;
  year: number;
  population: number;
}

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

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: GET_POPULATION_DATA,
      })
      .valueChanges.subscribe(({ data }) => {
        const alabama = data.populationData.filter((d: PopulationData) => d.state === 'Alabama').sort((a: PopulationData, b: PopulationData) => a.year - b.year);
        const florida = data.populationData.filter((d: PopulationData) => d.state === 'Florida').sort((a: PopulationData, b: PopulationData) => a.year - b.year);
        const california = data.populationData.filter((d: PopulationData) => d.state === 'California').sort((a: PopulationData, b: PopulationData) => a.year - b.year);

        this.lineChartData = {
          labels: alabama.map((d: PopulationData) => d.year),
          datasets: [
            {
              data: alabama.map((d: PopulationData) => d.population),
              label: 'Alabama',
              borderColor: 'red',
              fill: false,
            },
            {
              data: florida.map((d: PopulationData) => d.population),
              label: 'Florida',
              borderColor: 'blue',
              fill: false,
            },
            {
              data: california.map((d: PopulationData) => d.population),
              label: 'California',
              borderColor: 'green',
              fill: false,
            }
          ],
        };
      });
  }
}
