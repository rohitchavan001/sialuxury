import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  selectedCategory: string = 'All';
  selectedSort: string = 'featured';
  maxPrice: number = 3000;
  searchQuery: string = '';
  isLoading: boolean = false;
  addedToastProduct: any = null;

  categories: string[] = ['All', 'Lehenga', 'Saree', 'Sherwani', 'Anarkali', 'Gown'];

  constructor(
    public productService: ProductService,
    public cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['category'] && params['category'].toLowerCase() !== 'all') {
        const found = this.categories.find(c => c.toLowerCase() === params['category'].toLowerCase());
        this.selectedCategory = found || 'All';
      } else {
        this.selectedCategory = 'All';
      }

      if (params['q']) {
        this.searchQuery = params['q'];
      } else {
        this.searchQuery = '';
      }
      this.triggerLoadingTransition();
    });
  }

  get filteredProducts(): any[] {
    let items = this.productService.getProducts();

    if (this.selectedCategory !== 'All') {
      items = items.filter(p => p.category.toLowerCase() === this.selectedCategory.toLowerCase());
    }

    items = items.filter(p => p.price <= this.maxPrice);

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.subtitle.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q)
      );
    }

    if (this.selectedSort === 'low-high') {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (this.selectedSort === 'high-low') {
      items = [...items].sort((a, b) => b.price - a.price);
    } else if (this.selectedSort === 'rating') {
      items = [...items].sort((a, b) => b.rating - a.rating);
    }

    return items;
  }

  setCategory(cat: string): void {
    if (this.selectedCategory === cat) return;
    this.selectedCategory = cat;
    this.triggerLoadingTransition();
  }

  onFilterChange(): void {
    this.triggerLoadingTransition();
  }

  triggerLoadingTransition(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }

  resetFilters(): void {
    this.selectedCategory = 'All';
    this.selectedSort = 'featured';
    this.maxPrice = 3000;
    this.searchQuery = '';
    this.triggerLoadingTransition();
  }

  addToCart(product: any, event?: Event): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.cartService.addToCart(product, product.sizes ? product.sizes[0] : 'M');
    this.addedToastProduct = product;
    setTimeout(() => {
      this.addedToastProduct = null;
    }, 2500);
  }

  toggleWishlist(id: number, event?: Event): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.cartService.toggleWishlist(id);
  }
}