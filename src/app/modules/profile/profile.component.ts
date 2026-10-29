import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  authTab: 'login' | 'signup' = 'login';

  // Login inputs
  loginEmail = 'isabella.montague@couture.com';
  loginPass = '••••••••';
  rememberMe = true;

  // Signup inputs
  signupName = '';
  signupEmail = '';
  signupPhone = '';
  signupPass = '';
  signupInterest = 'Bridal Trousseau';

  authSuccessMsg = '';

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  onLogin(event: Event): void {
    event.preventDefault();
    if (!this.loginEmail) return;
    this.authService.login(this.loginEmail, this.loginPass);
    this.authSuccessMsg = 'Welcome back to your SIA Luxury Atelier salon.';
    setTimeout(() => {
      this.authSuccessMsg = '';
    }, 3000);
  }

  onSignup(event: Event): void {
    event.preventDefault();
    if (!this.signupName || !this.signupEmail) return;
    this.authService.signup(this.signupName, this.signupEmail, this.signupPhone);
    this.authSuccessMsg = 'Your Haute Couture Client Profile has been created.';
    setTimeout(() => {
      this.authSuccessMsg = '';
    }, 3000);
  }

  onDemoLogin(): void {
    this.authService.loginDemo();
    this.authSuccessMsg = 'Signed in with SIA Privé VIP patron credentials.';
    setTimeout(() => {
      this.authSuccessMsg = '';
    }, 3000);
  }

  onLogout(): void {
    this.authService.logout();
    this.authTab = 'login';
  }
}

