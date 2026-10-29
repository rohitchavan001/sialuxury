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
  categories = [
    { name: 'Haute Couture Lehengas', query: 'Lehenga' },
    { name: 'Heritage Kanjivaram Sarees', query: 'Saree' },
    { name: 'Regal Menswear & Sherwanis', query: 'Sherwani' },
    { name: 'Royal Anarkali Ensembles', query: 'Anarkali' },
    { name: 'Couture Evening Gowns', query: 'Gown' }
  ];

  constructor(public cartService: CartService) {}

  close(): void {
    this.cartService.isSidebarOpen = false;
  }
}
