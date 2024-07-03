import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleChartComponent } from './components/vehicle-chart/vehicle-chart.component';
import { PopulationChartComponent } from './components/population-chart/population-chart.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, VehicleChartComponent, PopulationChartComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hackett-frontend';
  isDropdownVisible = false;

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  closeDropdown() {
    this.isDropdownVisible = false;
  }
}
