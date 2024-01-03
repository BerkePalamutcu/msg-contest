import {Component, inject} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {AuthNavigationService} from "../../services/utils/auth-navigation.service";
import {MatDividerModule} from "@angular/material/divider";
import {MatTabsModule} from "@angular/material/tabs";
import {RecyclingTableComponent} from "../../components/recycling-table/recycling-table.component";
import {UserDataService} from "../../services/state/userData/user-data.service";
import {AsyncPipe, NgIf} from "@angular/common";
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatDividerModule, MatTabsModule, RecyclingTableComponent,
    AsyncPipe, NgIf],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  public signout:AuthNavigationService = inject(AuthNavigationService);
  public userDataService: UserDataService = inject(UserDataService);

  public user$ = this.userDataService.currentUserData;
}
