import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { City } from "./models/city";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { CityService } from "../shared/city.service";
import { ApiResult } from "../shared/base.service";

@Component({
  selector: "app-city",
  templateUrl: "./city.component.html",
  styleUrls: ["./city.component.scss"],
})
export class CityComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = [
    "id",
    "name",
    "lat",
    "lon",
    "countryName",
  ];
  public dataSource = new MatTableDataSource<City>();
  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "name";
  public defaultSortOrder: string = "asc";
  public filterQuery: string;
  public defaultFilterColumn: string = "name";

  public constructor(private readonly cityService: CityService) {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadData();
  }

  public loadData(query: string = null): void {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    if (query) {
      this.filterQuery = query;
    }
    this.getData(pageEvent);
  }

  public totalCount = 0;

  public getData(event: PageEvent): void {
    const sortColumn = this.sort ? this.sort.active : this.defaultSortColumn;
    const sortOrder = this.sort ? this.sort.direction : this.defaultSortOrder;
    const filterColumn = this.filterQuery ? this.defaultFilterColumn : null;
    const filterQuery = this.filterQuery ? this.filterQuery : null;

    this.cityService
      .getData<ApiResult<City>>(
        event.pageIndex,
        event.pageSize,
        sortColumn,
        sortOrder,
        filterColumn,
        filterQuery
      )
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
