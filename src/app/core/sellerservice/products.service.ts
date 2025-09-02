import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../dataType';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  addProduct(data:Product){
    return this.http.post("http://localhost:3000/products",data)
  }
  productList(){
    return this.http.get<Product[]>("http://localhost:3000/products")
  }
  deleteProduct(id:string){
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  getProduct(id:string){
    return this.http.get<Product>(`http://localhost:3000/products/${id}`)
  }
  updateProduct(product:Product){
    return this.http.put<Product>(`http://localhost:3000/products/${product.id}`,product)
  }
  popularProducts(product:Product){
    return this.http.get("http://localhost:3000/products?_limit=3")
  }
}
