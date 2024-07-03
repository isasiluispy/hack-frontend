import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleChartComponent } from './components/vehicle-chart/vehicle-chart.component';
import { PopulationChartComponent } from './components/population-chart/population-chart.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, VehicleChartComponent, PopulationChartComponent, SidebarComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hackett-frontend';
}
