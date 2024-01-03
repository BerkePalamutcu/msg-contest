import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CountryAndCitiesInteface} from "../../../interfaces/CountryAndCities.inteface";

@Injectable({
  providedIn: 'root'
})
export class CityAndCountriesService {
  private http: HttpClient = inject(HttpClient)

  public getAllCountriesAndCities(): Observable<CountryAndCitiesInteface>{
    return this.http.get<CountryAndCitiesInteface>('https://countriesnow.space/api/v0.1/countries');
  }
}
