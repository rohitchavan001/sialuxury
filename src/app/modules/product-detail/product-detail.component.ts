import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any = null;
  selectedImage: string = '';
  selectedSize: string = 'M';
  quantity: number = 1;
  relatedProducts: any[] = [];
  activeTab: 'details' | 'fabric' | 'shipping' = 'details';
  addedToast = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.product = this.productService.getProductById(id);
      if (this.product) {
        this.selectedImage = this.product.image;
        this.selectedSize = this.product.sizes[0] || 'M';
        this.quantity = 1;
        this.relatedProducts = this.productService
          .getProductsByCategory(this.product.category)
          .filter((p: any) => p.id !== this.product?.id)
          .slice(0, 3);
      }
    });
  }

  setImage(img: string): void {
    this.selectedImage = img;
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  updateQty(delta: number): void {
    this.quantity = Math.max(1, this.quantity + delta);
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.selectedSize, this.quantity);
      this.addedToast = true;
      setTimeout(() => {
        this.addedToast = false;
      }, 2500);
    }
  }

  buyNow(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.selectedSize, this.quantity);
      this.cartService.isCartDrawerOpen = false;
      this.router.navigate(['/checkout']);
    }
  }

  toggleWishlist(): void {
    if (this.product) {
      this.cartService.toggleWishlist(this.product.id);
    }
  }
}
