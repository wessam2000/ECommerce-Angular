import { Component, Input } from '@angular/core';
import { Product } from '../types/product';
import { CurrencyPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgClass,NgStyle,NgFor,NgIf ,CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
  cart: Product[] = [];
  
  constructor(private router: Router, private cartService: CartService) {

  };
  redirectToDetails(id: number) {
    this.router.navigate([`/product-details` , id]);
    // this.router.navigate([`/product-details${id}`]);
  }
  popCart() {
    alert('Added to cart');
  }
  getStars(): any[] {
    return new Array(5);
  }

  // addToCart(product: Product) {
  //   this.cartService.addToCart(product);
  // }
  cartCount: number = 0;
  addToCart(product: Product) {
    const productInCart = this.cart.find(p => p.id === product.id);
    
    if (productInCart) {
      if (productInCart.stock < product.stock) {
        productInCart.stock++;  // Increment the quantity of the product in the cart
      } else {
        alert('Cannot add more items, stock limit reached');
      }
    } else {
      this.cartService.addToCart(product);  // Add the product to the cart if not already added
    }
  
    // Update the visual cart counter after adding the product
    this.popCart();
  }
  
}

