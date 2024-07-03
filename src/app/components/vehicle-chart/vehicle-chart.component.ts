import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { VehicleDataService, VehicleData } from '../../services/vehicle-data.service';

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

  constructor(private vehicleDataService: VehicleDataService) {} // Inject the service

  ngOnInit(): void {
    this.vehicleDataService.getVehicleData().subscribe((data) => {
      this.pieChartData = {
        labels: data.map((d: VehicleData) => d.vehiclesAvailable),
        datasets: [
          {
            data: data.map((d: VehicleData) => d.households),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
          },
        ],
      };
    });
  }
}
