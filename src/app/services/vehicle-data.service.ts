import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const GET_VEHICLE_DATA = gql`
  query {
    vehicleData {
      vehiclesAvailable
      households
    }
  }
`;

export interface VehicleData {
  vehiclesAvailable: string;
  households: number;
}

@Injectable({
  providedIn: 'root',
})
export class VehicleDataService {
  constructor(private apollo: Apollo) {}

  getVehicleData(): Observable<VehicleData[]> {
    return this.apollo
      .watchQuery<{ vehicleData: VehicleData[] }>({
        query: GET_VEHICLE_DATA,
      })
      .valueChanges.pipe(map(result => result.data.vehicleData));
  }
}
