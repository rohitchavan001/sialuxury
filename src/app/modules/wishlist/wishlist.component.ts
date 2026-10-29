import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  addedToastProduct: any = null;

  constructor(
    public productService: ProductService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  get wishlistProducts(): any[] {
    const all = this.productService.getProducts();
    return all.filter(p => this.cartService.isWishlisted(p.id));
  }

  moveToBag(product: any, event?: Event): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    const defaultSize = product.sizes ? product.sizes[0] : 'M';
    this.cartService.addToCart(product, defaultSize, 1);
    this.addedToastProduct = product;
    setTimeout(() => {
      this.addedToastProduct = null;
    }, 2400);
  }

  removeFromWishlist(id: number, event?: Event): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.cartService.removeFromWishlist(id);
  }

  moveAllToBag(): void {
    const items = this.wishlistProducts;
    items.forEach(p => {
      const defaultSize = p.sizes ? p.sizes[0] : 'M';
      this.cartService.addToCart(p, defaultSize, 1);
    });
  }

  clearWishlist(): void {
    this.cartService.clearWishlist();
  }
}

