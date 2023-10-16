import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError, map } from "rxjs";

import { IItem } from "../item";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private productUrl = 'assets/products/products.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IItem[]> {
    return this.http.get<IItem[]>(this.productUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProduct(id: number): Observable<IItem | undefined> {
    return this.getProducts()
      .pipe(
        map((products: IItem[]) => products.find(p => p.productId === id))
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

}