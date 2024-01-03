import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CityAndCountriesService} from "../../services/api/location/city-and-countries.service";
import {map, Subject, takeUntil, tap} from "rxjs";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe, NgIf} from "@angular/common";
import {CountryData} from "../../interfaces/CountryAndCities.inteface";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogRef} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
@Component({
  selector: 'app-add-recycling-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    AsyncPipe,
    NgIf,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './add-recycling-dialog.component.html',
  styleUrl: './add-recycling-dialog.component.scss'
})
export class AddRecyclingDialogComponent implements OnInit, OnDestroy{
  destroyer$ = new Subject();
  countryAndCityService: CityAndCountriesService = inject(CityAndCountriesService);
  formBuilder: FormBuilder = inject(FormBuilder)
  //I love declarative approach <3
  countries!: CountryData[];
  cities!: string[];
  newRecyclingFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    country: ['Select A Country', Validators.required],
    city: [{value: '', disabled: true}, Validators.required],
    address: ['', Validators.required],
    workHours: ['', Validators.required],
    plasticBottles: [true],
    aluminiumCans: [true],
    metals: [true],
    glassContainers: [true],
    paperAndCardboard: [true],
    electronicWaste: [true]
  })

  constructor(public dialogRef: MatDialogRef<AddRecyclingDialogComponent> ) {
  }
  ngOnInit() {
    this.countryAndCityService.getAllCountriesAndCities()
      .pipe(takeUntil(this.destroyer$))
      .subscribe((response) => {
        this.countries = response.data
      })

    this.newRecyclingFormGroup.valueChanges.pipe(
      takeUntil(this.destroyer$),
      map(() => {
        //finding the cities from the selected country.
        const selectedCountry = this.newRecyclingFormGroup.get("country")?.value
        const citiesToShow = this.countries.find(val => val.country === selectedCountry)?.cities!
        return citiesToShow
      }),
      tap(() => {
        //
        if(  this.newRecyclingFormGroup.get("city")?.disabled){
          this.newRecyclingFormGroup.get("city")?.enable()
        }
      })
    ).subscribe((cities) => this.cities = cities)
  }

  closeDialog(){
    this.dialogRef.close()
  }

  ngOnDestroy() {
    this.destroyer$.next("Destroy");
  }
}
