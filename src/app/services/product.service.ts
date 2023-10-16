import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_URL: string = 'http://localhost:3000/product'
  constructor(private http: HttpClient) { }
  getProduct(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.API_URL)
  }
  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.API_URL}/${id}`);
  }
  removeProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`)
  }
  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.patch<IProduct>(`${this.API_URL}/${product.id}`, product)
  }
  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.API_URL, product)
  }
}
