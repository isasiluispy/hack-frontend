import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleChartComponent } from './vehicle-chart.component';

describe('VehicleChartComponent', () => {
  let component: VehicleChartComponent;
  let fixture: ComponentFixture<VehicleChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
