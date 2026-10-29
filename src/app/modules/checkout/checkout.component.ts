import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  // Shipping form fields
  firstName: string = 'Isabella';
  lastName: string = 'Montague';
  email: string = 'isabella.montague@couture.com';
  phone: string = '+1 (212) 555-0199';
  address: string = '740 Park Avenue';
  city: string = 'New York';
  state: string = 'NY';
  country: string = 'United States';
  postalCode: string = '10021';

  // Payment method
  paymentMethod: 'card' | 'wire' | 'concierge' = 'card';
  cardNumber: string = '4532 •••• •••• 8891';
  cardExpiry: string = '09/28';
  cardCvc: string = '834';

  isSubmitting: boolean = false;
  orderCompleted: boolean = false;
  orderId: string = '';

  constructor(public cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  placeOrder(): void {
    if (this.cartService.cart.length === 0) {
      this.router.navigate(['/products']);
      return;
    }

    this.isSubmitting = true;
    setTimeout(() => {
      this.orderId = 'SIA-' + Math.floor(100000 + Math.random() * 900000);
      this.orderCompleted = true;
      this.isSubmitting = false;
      this.cartService.clearCart();
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 900);
  }
}
