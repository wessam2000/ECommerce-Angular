import { CurrencyPipe, NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../types/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor,CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: { product: Product, quantity: number }[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
  }

  changeQuantity(item: { product: Product, quantity: number }, count: number) {
    this.cartService.changeQuantity(item.product, count);
  }
  handleRemove(item: { product: Product, quantity: number }) {
    this.cartService.removeItem(item.product);
    this.removeFromCart(item.product);
  }
  removeItem(item: { product: Product, quantity: number }) {
    this.cartService.removeItem(item.product);
  }
  removeFromCart(product: Product) {
    // Find the index of the product to remove
    const index = this.cartItems.findIndex((p) => p.product.id === product.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1); // Remove the product from the cart
      localStorage.setItem('cart', JSON.stringify(this.cartItems)); // Optionally, save the updated cart to local storage
    }
  }

  getTotal() {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  isEmptyCart() {
    return this.cartItems.length === 0;
  }
}
