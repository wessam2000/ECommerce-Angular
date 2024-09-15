import { ProductsService } from './../requests/products.service';
import { Component } from '@angular/core';
import { Product } from '../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NgFor } from '@angular/common';
import * as products from '../../assets/products.json';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent,NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  // products:Product[]=(products as any).default;
  products: Product[] = [];

  constructor(private productService: ProductsService, private cartService: CartService) {}

  ngOnInit(): void {
    // Fetch products from the API
    this.productService.getProductList().subscribe(
      (data) => (this.products = data.products),
      (error) => console.log(error)
    );
  }

}
