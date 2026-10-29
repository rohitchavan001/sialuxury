import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  searchQuery: string = '';
  showSearch: boolean = false;
  showCurrencyMenu: boolean = false;

  constructor(public cartService: CartService, private router: Router) {}

  toggleSidebar(): void {
    this.cartService.isSidebarOpen = !this.cartService.isSidebarOpen;
  }

  toggleCartDrawer(): void {
    this.cartService.isCartDrawerOpen = !this.cartService.isCartDrawerOpen;
  }

  toggleCurrencyMenu(): void {
    this.showCurrencyMenu = !this.showCurrencyMenu;
  }

  selectCurrency(curr: 'INR' | 'USD' | 'EUR'): void {
    this.cartService.setCurrency(curr);
    this.showCurrencyMenu = false;
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], { queryParams: { q: this.searchQuery.trim() } });
      this.showSearch = false;
    }
  }
}
