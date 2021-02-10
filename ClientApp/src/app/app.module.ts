import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { CityComponent } from "./city/city.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularMaterialModule } from "./angular-material.module";
import { CountriesComponent } from "./country/country.component";
import { CityEditComponent } from "./city-edit/city-edit.component";
import { CountryEditComponent } from "./country-edit/country-edit.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CityComponent,
    CountriesComponent,
    CityEditComponent,
    CountryEditComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "cities", component: CityComponent },
      { path: "city/:id", component: CityEditComponent },
      { path: "city", component: CityEditComponent },
      { path: "countries", component: CountriesComponent },
      { path: "country/:id", component: CountryEditComponent },
      { path: "country", component: CountryEditComponent },
    ]),
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
