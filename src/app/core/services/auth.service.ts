import { Injectable } from '@angular/core';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  tier: string;
  memberSince: string;
  address: string;
  city: string;
  measurements: {
    height: string;
    blouseChest: string;
    waist: string;
    lehengaLength: string;
    status: string;
  };
  orders: {
    id: string;
    date: string;
    piece: string;
    status: string;
    total: number;
    image: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  currentUser: UserProfile | null = null;

  private defaultUser: UserProfile = {
    name: 'Isabella Montague',
    email: 'isabella.montague@couture.com',
    phone: '+1 (212) 555-0199',
    tier: 'SIA PRIVÉ PATRON',
    memberSince: 'October 2026',
    address: '740 Park Avenue, Suite 14B',
    city: 'New York, NY 10021',
    measurements: {
      height: "5' 8\"",
      blouseChest: '34B',
      waist: '27 inches',
      lehengaLength: '43 inches',
      status: 'Verified by Senior Atelier Draper'
    },
    orders: [
      {
        id: 'SIA-849201',
        date: 'Oct 24, 2026',
        piece: 'Noor Jahan Zari Bridal Lehenga',
        status: 'In Master Karigar Hand Embroidery',
        total: 2450,
        image: 'assets/categories/lehenga.png'
      },
      {
        id: 'SIA-710492',
        date: 'Aug 12, 2026',
        piece: 'Gulmohar Kanjivaram Silk Saree',
        status: 'Delivered via White-Glove Courier',
        total: 1150,
        image: 'assets/categories/Saree.png'
      }
    ]
  };

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const savedAuth = localStorage.getItem('sia_auth');
        if (savedAuth) {
          const parsed = JSON.parse(savedAuth);
          this.isLoggedIn = parsed.isLoggedIn;
          this.currentUser = parsed.user || this.defaultUser;
        } else {
          // Default to logged-out so user can experience login/signup immediately, or login with 1-click
          this.isLoggedIn = false;
          this.currentUser = null;
        }
      } catch (e) {
        this.isLoggedIn = false;
        this.currentUser = null;
      }
    }
  }

  private saveState(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('sia_auth', JSON.stringify({
          isLoggedIn: this.isLoggedIn,
          user: this.currentUser
        }));
      } catch (e) {}
    }
  }

  login(email: string, pass: string): boolean {
    this.isLoggedIn = true;
    this.currentUser = {
      ...this.defaultUser,
      email: email || this.defaultUser.email,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()) || this.defaultUser.name
    };
    this.saveState();
    return true;
  }

  signup(name: string, email: string, phone: string): boolean {
    this.isLoggedIn = true;
    this.currentUser = {
      ...this.defaultUser,
      name: name || 'Valued Atelier Patron',
      email: email || 'patron@sialuxury.com',
      phone: phone || '+1 (555) 019-2831',
      memberSince: 'Today',
      orders: []
    };
    this.saveState();
    return true;
  }

  loginDemo(): void {
    this.isLoggedIn = true;
    this.currentUser = { ...this.defaultUser };
    this.saveState();
  }

  logout(): void {
    this.isLoggedIn = false;
    this.currentUser = null;
    this.saveState();
  }

  updateProfile(name: string, phone: string, address: string): void {
    if (this.currentUser) {
      this.currentUser.name = name;
      this.currentUser.phone = phone;
      this.currentUser.address = address;
      this.saveState();
    }
  }
}

