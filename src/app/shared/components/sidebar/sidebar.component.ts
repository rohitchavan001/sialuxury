import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  // Clean, simple 7 navigation menus
  mainMenus = [
    { name: 'Home', path: '/', query: null, badge: '' },
    { name: 'New Arrivals', path: '/products', query: 'All', badge: 'New' },
    { name: 'Collection', path: '/products', query: 'All', badge: '' },
    { name: 'Festival Edit', path: '/products', query: 'Lehenga', badge: 'Festive' },
    { name: 'Ready To Ship', path: '/products', query: 'All', badge: 'Fast' },
    { name: 'Client Diaries', path: '/about', query: null, badge: '' },
    { name: 'Contact', path: '/about', query: null, badge: '' }
  ];

  womenCategories = [
    { name: 'Lehengas', query: 'Lehenga' },
    { name: 'Sarees', query: 'Saree' },
    { name: 'Anarkalis', query: 'Anarkali' },
    { name: 'Gowns', query: 'Gown' },
    { name: 'Fusion Sets', query: 'Fusion' }
  ];

  menCategories = [
    { name: 'Sherwanis', query: 'Sherwani' },
    { name: 'Kurtas', query: 'Sherwani' },
    { name: 'Jackets', query: 'Sherwani' }
  ];

  constructor(public cartService: CartService) {}

  close(): void {
    this.cartService.isSidebarOpen = false;
  }
}
