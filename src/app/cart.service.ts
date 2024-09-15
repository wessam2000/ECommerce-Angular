import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './types/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: { product: Product, quantity: number }[] = [];  // Store both product and quantity
  private cartItemCount = new BehaviorSubject(0);

  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
   }


  getItems() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  addToCart(product: Product) {
    const cartItem = this.cart.find(item => item.product.id === product.id);
    if (cartItem) {
      if (cartItem.quantity < cartItem.product.stock) {
        cartItem.quantity += 1;
      }
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    this.updateCartItemCount();
  }

  removeItem(product: Product) {
    this.cart = this.cart.filter(item => item.product.id !== product.id);
    this.updateCartItemCount();
  }
  // removeFromCart(product: Product) {
  //   // Find the index of the product to remove
  //   const index = this.cart.findIndex((p) => p.product.id === product.id);
  //   if (index !== -1) {
  //     this.cart.splice(index, 1); // Remove the product from the cart
  //     localStorage.setItem('cart', JSON.stringify(this.cart)); // Optionally, save the updated cart to local storage
  //   }
  // }

  changeQuantity(product: Product, count: number) {
    const cartItem = this.cart.find(item => item.product.id === product.id);
    if (cartItem) {
      if (count > 0 && cartItem.quantity + count <= cartItem.product.stock) {
        cartItem.quantity += count;
      } else if (count < 0 && cartItem.quantity + count >= 1) {
        cartItem.quantity += count;
      }
    }
    this.updateCartItemCount();
  }

  private updateCartItemCount() {
    const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
    this.cartItemCount.next(totalItems);
  }
}
