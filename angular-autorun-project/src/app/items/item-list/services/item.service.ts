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

  updateProduct(item: any): any {

    const urla: string = "https://jsonplaceholder.typicode.com/posts/1";
    const headers = { 'Content-type': 'application/json; charset=UTF-8' }
    const url = urla + "/" + item.productId
    const body = JSON.stringify({
      id: item.productId,
      title: item.productName,
      body: item.description,
      userId: 1,
    })

    this.http.put<any>(urla, body, { headers }).subscribe(data => item.productId = data)
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