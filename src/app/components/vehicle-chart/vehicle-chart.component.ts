import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { Apollo, gql } from 'apollo-angular';

const GET_VEHICLE_DATA = gql`
  query {
    vehicleData {
      vehiclesAvailable
      households
    }
  }
`;

interface VehicleData {
  vehiclesAvailable: string;
  households: number;
}

@Component({
  selector: 'vehicle-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './vehicle-chart.component.html',
  styleUrls: ['./vehicle-chart.component.css']
})
export class VehicleChartComponent implements OnInit {
  public pieChartData: ChartData<'pie'> = {
    datasets: [],
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<{ vehicleData: VehicleData[] }>({
        query: GET_VEHICLE_DATA,
      })
      .valueChanges.subscribe(({ data }) => {
        this.pieChartData = {
          labels: data.vehicleData.map((d: VehicleData) => d.vehiclesAvailable),
          datasets: [
            {
              data: data.vehicleData.map((d: VehicleData) => d.households),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
            },
          ],
        };
      });
  }
}
