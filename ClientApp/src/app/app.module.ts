import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
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
import { BaseFormComponent } from "./shared/base.form.component";
import { ApiAuthorizationModule } from "src/api-authorization/api-authorization.module";
import { AuthorizeGuard } from "src/api-authorization/authorize.guard";
import { CityService } from "./shared/city.service";
import { AuthorizeInterceptor } from "src/api-authorization/authorize.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    BaseFormComponent,
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
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "cities", component: CityComponent },
      {
        path: "city/:id",
        component: CityEditComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: "city",
        component: CityEditComponent,
        canActivate: [AuthorizeGuard],
      },
      { path: "countries", component: CountriesComponent },
      {
        path: "country/:id",
        component: CountryEditComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: "country",
        component: CountryEditComponent,
        canActivate: [AuthorizeGuard],
      },
    ]),
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
