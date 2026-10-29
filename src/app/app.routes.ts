import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ProductsComponent } from './modules/products/products.component';
import { ProductDetailComponent } from './modules/product-detail/product-detail.component';
import { CartComponent } from './modules/cart/cart.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { AboutComponent } from './modules/about/about.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { WishlistComponent } from './modules/wishlist/wishlist.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'SIA LUXURY | Haute Couture & Designer Heritage' },
  { path: 'about', component: AboutComponent, title: 'Our Couture Heritage | SIA LUXURY' },
  { path: 'products', component: ProductsComponent, title: 'Collections & Catalog | SIA LUXURY' },
  { path: 'product/:id', component: ProductDetailComponent, title: 'Haute Couture Piece | SIA LUXURY' },
  { path: 'cart', component: CartComponent, title: 'Shopping Bag | SIA LUXURY' },
  { path: 'checkout', component: CheckoutComponent, title: 'Secured Atelier Checkout | SIA LUXURY' },
  { path: 'profile', component: ProfileComponent, title: 'Client Profile & Atelier Salon | SIA LUXURY' },
  { path: 'wishlist', component: WishlistComponent, title: 'Saved Wishlist & Heirlooms | SIA LUXURY' },
  { path: '**', redirectTo: '' }
];
