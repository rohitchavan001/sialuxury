import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: any[] = [];
  wishlistIds: number[] = [];
  isSidebarOpen: boolean = false;
  isCartDrawerOpen: boolean = false;

  currency: 'USD' | 'INR' | 'EUR' = 'USD';
  rates: any = {
    USD: { symbol: '$', rate: 1 },
    INR: { symbol: '₹', rate: 85 },
    EUR: { symbol: '€', rate: 0.92 }
  };

  constructor() {
    this.cart = [
      {
        product: {
          id: 1,
          name: 'Noor Jahan Zari Bridal Lehenga',
          subtitle: 'Hand-embroidered zardozi on crimson silk velvet',
          category: 'Lehenga',
          price: 2450,
          originalPrice: 2800,
          rating: 4.9,
          reviewsCount: 48,
          image: 'assets/categories/lehenga.png',
          gallery: [],
          description: '',
          fabric: 'Pure Silk Velvet',
          color: 'Crimson',
          sizes: ['M'],
          inStock: true
        },
        selectedSize: 'M',
        quantity: 1
      }
    ];

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const savedWishlist = localStorage.getItem('sia_wishlist');
        if (savedWishlist) {
          this.wishlistIds = JSON.parse(savedWishlist);
        } else {
          // Initialize with 2 sample pieces so the user immediately sees a curated wishlist
          this.wishlistIds = [1, 3];
          this.saveWishlist();
        }
      } catch (e) {
        this.wishlistIds = [1, 3];
      }
    } else {
      this.wishlistIds = [1, 3];
    }
  }

  private saveWishlist(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('sia_wishlist', JSON.stringify(this.wishlistIds));
      } catch (e) {}
    }
  }

  getCart(): any[] {
    return this.cart;
  }

  addToCart(product: any, size: string = 'M', qty: number = 1): void {
    const existing = this.cart.find(i => i.product.id === product.id && i.selectedSize === size);
    if (existing) {
      existing.quantity += qty;
    } else {
      this.cart.push({ product, selectedSize: size, quantity: qty });
    }
    this.isCartDrawerOpen = true;
  }

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
  }

  updateQty(index: number, delta: number): void {
    if (this.cart[index]) {
      this.cart[index].quantity += delta;
      if (this.cart[index].quantity <= 0) {
        this.removeFromCart(index);
      }
    }
  }

  clearCart(): void {
    this.cart = [];
  }

  getSubtotal(): number {
    return this.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  getCartCount(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  toggleWishlist(productId: number): void {
    const idx = this.wishlistIds.indexOf(productId);
    if (idx > -1) {
      this.wishlistIds.splice(idx, 1);
    } else {
      this.wishlistIds.push(productId);
    }
    this.saveWishlist();
  }

  removeFromWishlist(productId: number): void {
    const idx = this.wishlistIds.indexOf(productId);
    if (idx > -1) {
      this.wishlistIds.splice(idx, 1);
      this.saveWishlist();
    }
  }

  clearWishlist(): void {
    this.wishlistIds = [];
    this.saveWishlist();
  }

  getWishlistCount(): number {
    return this.wishlistIds.length;
  }

  isWishlisted(productId: number): boolean {
    return this.wishlistIds.includes(productId);
  }

  formatPrice(priceInUSD: number): string {
    const info = this.rates[this.currency];
    const converted = Math.round(priceInUSD * info.rate);
    return `${info.symbol}${converted.toLocaleString()}`;
  }

  setCurrency(curr: 'USD' | 'INR' | 'EUR'): void {
    this.currency = curr;
  }
}
