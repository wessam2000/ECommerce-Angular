import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProductList(): Observable<any> {
    return this.http.get(`https://dummyjson.com/products`);
  }
  // getProductList(): Observable<Product[]> {
  //   return this.http.get<{ products: Product[] }>('https://dummyjson.com/products').pipe(
  //     map(response => response.products)  // Ensure we're returning the products array
  //   );
  // }

  getProductDetails(id: string) : Observable<any> {
    return this.http.get(`https://dummyjson.com/products/${id}`)
  }

}
