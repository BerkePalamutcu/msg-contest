import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import { MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortModule } from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {FormBuilder, FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {UserDataService} from "../../services/state/userData/user-data.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {AddRecyclingDialogComponent} from "../add-recycling-dialog/add-recycling-dialog.component";
interface RecyclingTableData {
  name: string;
  location: string;
  acceptedMaterials: string[]
  operatingHours: string;
}

const data = [
  {
    "name": "Green Earth Recycling",
    "location": "123 Elm Street, Springfield",
    "acceptedMaterials": [
      "Plastic bottles",
      "Aluminum cans",
      "Metals",
      "Glass containers",
      "Paper and cardboard",
      "Electronic waste"
    ],
    "operatingHours": "8:00 AM - 5:00 PM"
  },
  {
    "name": "Eco Friendly Center",
    "location": "456 Oak Avenue, Riverdale",
    "acceptedMaterials": [
      "Plastic bottles",
      "Paper and cardboard"
    ],
    "operatingHours": "9:00 AM - 6:00 PM"
  },
  {
    "name": "Urban Recycle Hub",
    "location": "789 Pine Road, Metropolis",
    "acceptedMaterials": [
      "Aluminum cans",
      "Metals",
      "Glass containers"
    ],
    "operatingHours": "10:00 AM - 4:00 PM, Closed on Sundays"
  }
  // Add more entries as needed
]


@Component({
  selector: 'app-recycling-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatExpansionModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './recycling-table.component.html',
  styleUrl: './recycling-table.component.scss'
})
export class RecyclingTableComponent implements AfterViewInit {
  formBuilder: FormBuilder = inject(FormBuilder)
  userDataService: UserDataService = inject(UserDataService);
  filterOptions = this.formBuilder.group({
    plasticBottles: true,
    aluminiumCans: true,
    metals: true,
    glassContainers: true,
    paperAndCardboard: true,
    electronicWaste: true
  })
  addRecyclingDialog:MatDialog = inject(MatDialog)
  displayedColumns: string[] = ['name', 'location', 'accepted materials', 'operating hours']
  dataSource: MatTableDataSource<RecyclingTableData>
  panelOpenState = false;

  user$ = this.userDataService.currentUserData
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource<RecyclingTableData>(data);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
  }

  resetFilters() {
    this.filterOptions.reset({
      plasticBottles: true,
      aluminiumCans: true,
      metals: true,
      glassContainers: true,
      paperAndCardboard: true,
      electronicWaste:true
    });
  }

  updateDataSource() {
    const filterValues = this.filterOptions.value;
    this.dataSource.data = data.filter(item => {
      return (
        (filterValues.plasticBottles && item.acceptedMaterials.includes('Plastic bottles')) ||
        (filterValues.aluminiumCans && item.acceptedMaterials.includes('Aluminum cans')) ||
        (filterValues.metals && item.acceptedMaterials.includes('Metals')) ||
        (filterValues.glassContainers && item.acceptedMaterials.includes('Glass containers')) ||
        (filterValues.paperAndCardboard && item.acceptedMaterials.includes('Paper and cardboard')) ||
        (filterValues.electronicWaste && item.acceptedMaterials.includes('Electronic waste'))
      );
    });
  }

  openDialog(){
    const dialogRef = this.addRecyclingDialog.open(AddRecyclingDialogComponent);
  }
}
