import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  promoCode: string = '';
  promoDiscount: number = 0;
  promoApplied: boolean = false;
  promoError: string = '';

  constructor(public cartService: CartService) {}

  applyPromo(): void {
    if (this.promoCode.trim().toUpperCase() === 'SIAVIP') {
      this.promoDiscount = 0.10; // 10% discount
      this.promoApplied = true;
      this.promoError = '';
    } else {
      this.promoError = 'Invalid luxury privilege code.';
      this.promoApplied = false;
      this.promoDiscount = 0;
    }
  }

  get discountAmount(): number {
    return this.cartService.getSubtotal() * this.promoDiscount;
  }

  get finalTotal(): number {
    return Math.max(0, this.cartService.getSubtotal() - this.discountAmount);
  }
}
