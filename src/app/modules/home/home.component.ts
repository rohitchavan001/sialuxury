import { Component, OnInit, OnDestroy, AfterViewInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  private scrollObserver: IntersectionObserver | null = null;
  isMobile = false;

  // Hero slides: Desktop high-res backgrounds and mobile dedicated artwork (with baked-in text)
  heroSlides = [
    {
      title: 'Wear Your Story...',
      image: 'assets/landing-page-bg.png',
      mobileImage: 'assets/landing-page-bg-mobile.png',
      link: '/products',
      query: { category: 'Lehenga' },
    },
    {
      title: 'Royal Heritage...',
      image: 'assets/landing-page-bg1.png',
      mobileImage: 'assets/landing-page-bg-mobile1.png',
      link: '/products',
      query: { category: 'Saree' },
    },
  ];
  currentHeroIndex = 0;
  private heroAutoTimer: any = null;

  @HostListener('window:resize')
  onResize(): void {
    this.checkMobile();
  }

  checkMobile(): void {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth <= 768;
    }
  }

  // Character-by-character typewriter effect for desktop only
  typedTitle = '';
  showCursor = true;
  heroPopIn = false;
  private typingTimer: any = null;
  private cursorTimer: any = null;
  private typingIndex = 0;

  // Shop by Category with authentic local maison imagery
  shopCategories = [
    {
      name: 'LEHENGA',
      query: 'Lehenga',
      image: 'assets/categories/lehenga.png',
    },
    {
      name: 'FUSION WEAR',
      query: 'Gown',
      image: 'assets/categories/Fusion.png',
    },
    { name: 'SAREES', query: 'Saree', image: 'assets/categories/Saree.png' },
    { name: 'GOWN', query: 'Gown', image: 'assets/categories/Gown.png' },
    {
      name: 'SHERWANI',
      query: 'Sherwani',
      image: 'assets/categories/Sherwani.png',
    },
    { name: 'KURTAS', query: 'Sherwani', image: 'assets/categories/kurta.png' },
  ];

  // Carousel items for "DRESSED FOR THE MOMENT" with refreshed lookbook pieces
  momentLooks = [
    {
      id: 1,
      title: 'Crimson Velvet Bridal',
      category: 'Lehenga',
      price: 2450,
      image: 'assets/categories/lehenga.png',
    },
    {
      id: 2,
      title: 'Kanjivaram 24K Zari Saree',
      category: 'Saree',
      price: 1150,
      image: 'assets/categories/Saree.png',
    },
    {
      id: 3,
      title: 'Ivory Raw Matka Sherwani',
      category: 'Sherwani',
      price: 1850,
      image: 'assets/categories/Sherwani.png',
    },
    {
      id: 4,
      title: 'Rose Gold Corset Ballgown',
      category: 'Gown',
      price: 1780,
      image: 'assets/categories/Gown.png',
    },
    {
      id: 5,
      title: 'Sage Green Fusion Ensemble',
      category: 'Fusion',
      price: 1320,
      image: 'assets/categories/Fusion.png',
    },
  ];
  activeMomentIndex = 2;
  dotIds = [1, 2, 3, 4, 5];

  get activeDotIndex(): number {
    const centerItem = this.momentLooks[2];
    return centerItem ? this.dotIds.indexOf(centerItem.id) : 0;
  }
  autoScrollTimer: any = null;

  // The Art of Celebration: 7 Editorial Looks directly mapped to catalogue products
  celebrationLooks = [
    {
      id: 3,
      name: 'Embroidery',
      title: 'Ivory Raw Matka Sherwani',
      category: 'Sherwani',
      image: 'assets/categories/Sherwani.png',
      price: 1850,
      fabric: 'Raw Matka Silk with Thread Embroidery',
      desc: 'Tailored for sovereign occasions, featuring tone-on-tone embroidery and refined ceremonial structure.',
    },
    {
      id: 6,
      name: 'Fine Details',
      title: 'Meenakari Rose Gold Gown',
      category: 'Gown',
      image: 'assets/categories/Gown.png',
      price: 1780,
      fabric: 'Micro Tulle & Silk Satin with Resham Work',
      desc: 'Designed with layered elegance and subtle shimmer, delivering a striking couture presence.',
    },
    {
      id: 4,
      name: 'Artisanal',
      title: 'Chandni Ivory Floor-Length Ensemble',
      category: 'Anarkali',
      image: 'assets/categories/Fusion.png',
      price: 920,
      fabric: 'French Viscose Georgette with Mirrorwork',
      desc: 'A modern silhouette blending contemporary ease with heritage prints, perfect for festive receptions.',
    },
    {
      id: 5,
      name: 'Timeless',
      title: 'Aura Velvet Tuxedo & Kurta',
      category: 'Sherwani',
      image: 'assets/categories/kurta.png',
      price: 1390,
      fabric: 'Italian Silk Velvet with Gilded Metallic Piping',
      desc: 'Understated luxury crafted in pure silk with handcrafted button details for intimate soirees.',
    },
    {
      id: 7,
      name: 'Heritage',
      title: 'Surya Banarasi Brocade Lehenga',
      category: 'Lehenga',
      image: 'assets/artofcelebration.png',
      price: 2100,
      fabric: 'Pure Katan Banarasi Silk with Antique Marodi',
      desc: 'A study in occasion dressing where heritage techniques meet a quieter, more contemporary silhouette.',
    },
    {
      id: 1,
      name: 'Zardozi',
      title: 'Noor Jahan Zari Bridal Lehenga',
      category: 'Lehenga',
      image: 'assets/categories/lehenga.png',
      price: 2450,
      fabric: 'Pure Silk Velvet with Hand-embroidered Zardozi',
      desc: 'Intricately handcrafted with antique gold threadwork and stone embellishments, evoking regal bridal grandeur.',
    },
    {
      id: 2,
      name: 'Handcrafted',
      title: 'Gulmohar Kanjivaram Silk Saree',
      category: 'Saree',
      image: 'assets/categories/Saree.png',
      price: 1150,
      fabric: 'Pure Mulberry Silk with 24k Gold Zari',
      desc: 'Woven with traditional temple borders and delicate floral jaal motifs for effortless celebratory grace.',
    },
  ];

  @ViewChild('celebrationRight') celebrationRight?: ElementRef<HTMLDivElement>;
  celebrationAutoTimer: any = null;
  celebrationVisible = false;
  celebrationAnimationDone = false;
  celTouchStartX = 0;
  celTouchEndX = 0;

  triggerCelebrationVisible(): void {
    if (this.celebrationVisible) return;
    this.celebrationVisible = true;
    // Allow full staggered bottom-to-top wave entrance (approx 2s), then unlock snappy hover & smooth carousel
    setTimeout(() => {
      this.celebrationAnimationDone = true;
      this.startCelebrationAutoScroll();
    }, 2200);
  }

  // Smooth Auto Carousel for The Art of Celebration
  startCelebrationAutoScroll(): void {
    this.stopCelebrationAutoScroll();
    this.celebrationAutoTimer = setInterval(() => {
      this.nextCelebration();
    }, 3200);
  }

  stopCelebrationAutoScroll(): void {
    if (this.celebrationAutoTimer) {
      clearInterval(this.celebrationAutoTimer);
      this.celebrationAutoTimer = null;
    }
  }

  nextCelebration(): void {
    const el = this.celebrationRight?.nativeElement;
    if (el && el.scrollWidth > el.clientWidth) {
      const scrollStep = 115;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 15) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: scrollStep, behavior: 'smooth' });
      }
    } else {
      const first = this.celebrationLooks.shift();
      if (first) {
        this.celebrationLooks.push(first);
      }
    }
  }

  prevCelebration(): void {
    const el = this.celebrationRight?.nativeElement;
    if (el && el.scrollWidth > el.clientWidth) {
      const scrollStep = 115;
      if (el.scrollLeft <= 10) {
        el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: -scrollStep, behavior: 'smooth' });
      }
    } else {
      const last = this.celebrationLooks.pop();
      if (last) {
        this.celebrationLooks.unshift(last);
      }
    }
    this.startCelebrationAutoScroll();
  }

  onCelebrationTouchStart(e: TouchEvent): void {
    this.stopCelebrationAutoScroll();
    this.celTouchStartX = e.changedTouches[0].screenX;
  }

  onCelebrationTouchEnd(e: TouchEvent): void {
    this.celTouchEndX = e.changedTouches[0].screenX;
    const diff = this.celTouchStartX - this.celTouchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        this.nextCelebration();
      } else {
        this.prevCelebration();
      }
    }
    this.startCelebrationAutoScroll();
  }

  // Lookbook items for "FOLLOW OUR WORLD" (authentic maison photography)
  lookbookItems = [
    {
      image: 'assets/categories/Saree.png',
      caption: 'The Royal Drape',
    },
    {
      image: 'assets/categories/Sherwani.png',
      caption: 'Imperial Regalia',
    },
    {
      image: 'assets/categories/lehenga.png',
      caption: 'Heritage Zari',
    },
    {
      image: 'assets/categories/Fusion.png',
      caption: 'Contemporary Silhouette',
    },
  ];

  constructor(
    public productService: ProductService,
    public cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.checkMobile();
    this.startAutoScroll();
    this.startHeroAutoScroll();
    this.startTyping();
    this.startCursorBlink();
  }

  ngAfterViewInit(): void {
    this.initScrollAnimations();
  }

  initScrollAnimations(): void {
    if (typeof window === 'undefined') return;

    setTimeout(() => {
      const animElements = document.querySelectorAll(
        '.move-from-left, .move-from-right, .move-from-top, .move-from-bottom, .celebration-pills'
      );

      const celPills = document.querySelector('.celebration-pills');
      if (celPills) {
        const rect = celPills.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          this.triggerCelebrationVisible();
          celPills.classList.add('is-visible');
        }
      }

      if ('IntersectionObserver' in window) {
        this.scrollObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                if (entry.target.classList.contains('celebration-pills')) {
                  this.triggerCelebrationVisible();
                }
                entry.target.classList.add('is-visible');
              }
            });
          },
          {
            rootMargin: '0px 0px -30px 0px',
            threshold: 0.08,
          }
        );

        animElements.forEach((el) => this.scrollObserver?.observe(el));
      } else {
        animElements.forEach((el) => el.classList.add('is-visible'));
        this.triggerCelebrationVisible();
      }
    }, 80);
  }

  getCategoryAnimationClass(index: number): string {
    const classes = [
      'move-from-left',
      'move-from-top',
      'move-from-right',
      'move-from-left delay-1',
      'move-from-bottom delay-1',
      'move-from-right delay-1',
    ];
    return classes[index % classes.length];
  }

  getCategoryFloatClass(index: number): string {
    const classes = [
      'float-drift-left',
      'float-drift-top',
      'float-drift-right',
      'float-drift-left',
      'float-drift-bottom',
      'float-drift-right',
    ];
    return classes[index % classes.length];
  }

  getLookbookAnimationClass(index: number): string {
    const classes = [
      'move-from-left',
      'move-from-top delay-1',
      'move-from-bottom delay-2',
      'move-from-right delay-3',
    ];
    return classes[index % classes.length];
  }

  getLookbookFloatClass(index: number): string {
    const classes = [
      'float-drift-left',
      'float-drift-top',
      'float-drift-bottom',
      'float-drift-right',
    ];
    return classes[index % classes.length];
  }

  ngOnDestroy(): void {
    this.stopAutoScroll();
    this.stopCelebrationAutoScroll();
    this.stopHeroAutoScroll();
    this.stopTyping();
    this.stopCursorBlink();
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
      this.scrollObserver = null;
    }
  }

  // Auto scroll for hero background images (so mobile images with text scroll & change smoothly)
  startHeroAutoScroll(): void {
    this.stopHeroAutoScroll();
    this.heroAutoTimer = setInterval(() => {
      this.nextHero();
    }, 5000);
  }

  stopHeroAutoScroll(): void {
    if (this.heroAutoTimer) {
      clearInterval(this.heroAutoTimer);
      this.heroAutoTimer = null;
    }
  }

  // ── Character-by-character typewriter (Desktop only) ─────────
  startTyping(): void {
    this.stopTyping();
    this.typedTitle = '';
    this.typingIndex = 0;
    this.heroPopIn = false;

    setTimeout(() => {
      this.heroPopIn = true;
      const fullText = this.heroSlides[this.currentHeroIndex].title;
      this.typingTimer = setInterval(() => {
        if (this.typingIndex < fullText.length) {
          this.typedTitle += fullText[this.typingIndex];
          this.typingIndex++;
        } else {
          this.stopTyping();
        }
      }, 85);
    }, 160);
  }

  stopTyping(): void {
    if (this.typingTimer) {
      clearInterval(this.typingTimer);
      this.typingTimer = null;
    }
  }

  startCursorBlink(): void {
    this.cursorTimer = setInterval(() => {
      this.showCursor = !this.showCursor;
    }, 520);
  }

  stopCursorBlink(): void {
    if (this.cursorTimer) {
      clearInterval(this.cursorTimer);
      this.cursorTimer = null;
    }
  }

  // Auto-scroll loop for DRESSED FOR THE MOMENT carousel
  startAutoScroll(): void {
    this.stopAutoScroll();
    this.autoScrollTimer = setInterval(() => {
      this.nextMoment();
    }, 2800);
  }

  stopAutoScroll(): void {
    if (this.autoScrollTimer) {
      clearInterval(this.autoScrollTimer);
      this.autoScrollTimer = null;
    }
  }

  // Hero controls
  nextHero(): void {
    this.currentHeroIndex =
      (this.currentHeroIndex + 1) % this.heroSlides.length;
    this.startTyping();
  }

  prevHero(): void {
    this.currentHeroIndex =
      (this.currentHeroIndex - 1 + this.heroSlides.length) %
      this.heroSlides.length;
    this.startTyping();
  }

  // Carousel controls for DRESSED FOR THE MOMENT
  prevMoment(): void {
    const last = this.momentLooks.pop();
    if (last) {
      this.momentLooks.unshift(last);
    }
    this.startAutoScroll();
  }

  nextMoment(): void {
    const first = this.momentLooks.shift();
    if (first) {
      this.momentLooks.push(first);
    }
  }

  setMoment(index: number): void {
    const diff = index - 2;
    if (diff > 0) {
      for (let k = 0; k < diff; k++) {
        const first = this.momentLooks.shift();
        if (first) this.momentLooks.push(first);
      }
    } else if (diff < 0) {
      for (let k = 0; k < Math.abs(diff); k++) {
        const last = this.momentLooks.pop();
        if (last) this.momentLooks.unshift(last);
      }
    }
    this.startAutoScroll();
  }

  goToDot(dotIdx: number): void {
    const targetId = this.dotIds[dotIdx];
    const currentIndex = this.momentLooks.findIndex(
      (item) => item.id === targetId,
    );
    if (currentIndex !== -1) {
      this.setMoment(currentIndex);
    }
  }

  // Touch swipe support for mobile
  touchStartX = 0;
  touchEndX = 0;
  momentTouchStartX = 0;
  momentTouchEndX = 0;

  onHeroTouchStart(e: TouchEvent): void {
    this.stopHeroAutoScroll();
    this.touchStartX = e.changedTouches[0].screenX;
  }

  onHeroTouchEnd(e: TouchEvent): void {
    this.touchEndX = e.changedTouches[0].screenX;
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        this.nextHero();
      } else {
        this.prevHero();
      }
    }
    this.startHeroAutoScroll();
  }

  onMomentTouchStart(e: TouchEvent): void {
    this.momentTouchStartX = e.changedTouches[0].screenX;
  }

  onMomentTouchEnd(e: TouchEvent): void {
    this.momentTouchEndX = e.changedTouches[0].screenX;
    const diff = this.momentTouchStartX - this.momentTouchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        this.nextMoment();
      } else {
        this.prevMoment();
      }
    }
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
}
