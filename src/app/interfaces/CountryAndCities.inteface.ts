export interface CountryAndCitiesInteface {
  data: CountryData[];
  msg: string;
  error: boolean;
}

export interface CountryData {
  country: string;
  cities: string[];
  iso3: string;
  iso2: string;
}
