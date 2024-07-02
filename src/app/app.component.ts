import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleChartComponent } from './vehicle-chart/vehicle-chart.component';
import { PopulationChartComponent } from './population-chart/population-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, VehicleChartComponent, PopulationChartComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hackett-frontend';
}
