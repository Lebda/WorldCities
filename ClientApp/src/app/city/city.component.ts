import { HttpClient, HttpParams } from "@angular/common/http";
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { City } from "./models/city";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-city",
  templateUrl: "./city.component.html",
  styleUrls: ["./city.component.scss"],
})
export class CityComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ["id", "name", "lat", "lon"];
  public dataSource = new MatTableDataSource<City>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    const pageEvent = new PageEvent();
    pageEvent.pageIndex = 0;
    pageEvent.pageSize = 10;
    this.getData(pageEvent);
  }

  public totalCount = 0;

  public getData(event: PageEvent): void {
    const url = this.baseUrl + "api/Cities";
    const params = new HttpParams()
      .set("pageIndex", event.pageIndex.toString())
      .set("pageSize", event.pageSize.toString());
    this.http
      .get<any>(url, { params })
      .subscribe(
        (result) => {
          this.paginator.length = result.totalCount;
          this.paginator.pageIndex = result.pageIndex;
          this.paginator.pageSize = result.pageSize;
          this.dataSource = new MatTableDataSource<City>(result.data);
        },
        (error) => console.error(error)
      );
  }
}
