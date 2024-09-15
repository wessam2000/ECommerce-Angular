import { CartService } from './../cart.service';
import { Component, Input } from '@angular/core';
import { Product } from '../types/product';
import * as products from '../../assets/products.json';
import { NgClass,NgFor, NgIf } from '@angular/common';
import { ProductsService } from '../requests/products.service';

@Component({
  selector: 'app-detals',
  standalone: true,
  imports: [NgClass,NgFor,NgIf],
  templateUrl: './detals.component.html',
  styleUrl: './detals.component.css'
})
export class DetalsComponent {
  @Input() id !: string
  count: number = 1;
  cart: Product[] = [];
  // products:Product[]=(products as any).default;
  productDetails!: Product | any;
  constructor(private productServices: ProductsService , private CartService: CartService) {}
  ngOnInit() {
    this.productServices.getProductDetails(this.id).subscribe(
      (data) => (this.productDetails = data),
      (error) => console.log(error)
    )
    this.CartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  
  }
  cartItemCount: number = 0;

  // increment() {
  //   if (this.count < this.productDetails.stock) {
  //     this.count++;
  //   }
  // }

  // decrement() {
  //   if (this.count > 1) {
  //     this.count--;
  //   }
  // }
  // changeQuantity(item: { product: Product, quantity: number }, count: number) {
  //   this.CartService.changeQuantity(item.product, count);
  // }
  getStars(): any[] {
    return new Array(5);
  }
  popCart() {
    alert('Added to cart');
  }

  addToCart(product: Product) {
    const productInCart = this.cart.find(p => p.id === product.id);
    
    if (productInCart) {
      if (productInCart.stock < product.stock) {
        productInCart.stock++;  // Increment the quantity of the product in the cart
      } else {
        alert('Cannot add more items, stock limit reached');
      }
    } else {
      this.CartService.addToCart(product);  // Add the product to the cart if not already added
    }
  
    // Update the visual cart counter after adding the product
    this.popCart();
  }
}
