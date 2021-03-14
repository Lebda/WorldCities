import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface ApiResult<T> {
  data: T[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  sortColumn: string;
  sortOrder: string;
  filterColumn: string;
  filterQuery: string;
}

@Injectable({
  providedIn: "root",
})
export abstract class BaseService {
  protected constructor(
    protected http: HttpClient,
    protected baseUrl: string
  ) {}

  public abstract getData<ApiResult>(
    pageIndex: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string,
    filterColumn: string,
    filterQuery: string
  ): Observable<ApiResult>;

  abstract get<T>(id: number): Observable<T>;
  abstract put<T>(item: T): Observable<T>;
  abstract post<T>(item: T): Observable<T>;
}
