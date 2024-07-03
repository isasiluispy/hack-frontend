import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const GET_POPULATION_DATA = gql`
  query {
    populationData {
      state
      year
      population
    }
  }
`;

export interface PopulationData {
  state: string;
  year: number;
  population: number;
}

@Injectable({
  providedIn: 'root',
})
export class PopulationDataService {
  constructor(private apollo: Apollo) {}

  getPopulationData(): Observable<PopulationData[]> {
    return this.apollo
      .watchQuery<any>({
        query: GET_POPULATION_DATA,
      })
      .valueChanges.pipe(map(({ data }) => data.populationData));
  }
}
