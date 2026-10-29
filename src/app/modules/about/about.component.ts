import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {
  private scrollObserver: IntersectionObserver | null = null;
  showAppointmentModal = false;
  bookingSuccess = false;

  clientName = '';
  clientEmail = '';
  clientPhone = '';
  clientDate = '';
  selectedOccasion = 'Bridal Trousseau';

  // Direct WhatsApp contact link with pre-filled concierge message
  whatsAppUrl = 'https://wa.me/919876543210?text=Hello%20SIA%20LUXURY,%20I%20would%20like%20to%20book%20a%20free%20couture%20consultation.';

  pillars = [
    {
      num: '01',
      title: 'Archival Weaves',
      tagline: 'Pure Silk & Zari',
      description: 'Loom-woven in Varanasi and Kanchipuram with pure mulberry silk and authentic gold zari.',
      icon: 'fa-solid fa-scroll'
    },
    {
      num: '02',
      title: 'Master Karigars',
      tagline: 'Hand Embroidered',
      description: 'Generations of needle mastery in antique Zardozi, delicate Resham, and Pitta threadwork.',
      icon: 'fa-solid fa-hands'
    },
    {
      num: '03',
      title: 'Sculpted Poise',
      tagline: 'Modern Ergonomics',
      description: 'Featherlight couture corsetry tailored to celebrate natural movement and regal posture.',
      icon: 'fa-solid fa-compass-drafting'
    },
    {
      num: '04',
      title: 'Heirloom Legacy',
      tagline: 'Lifelong Quality',
      description: 'Constructed with generous silk inlays, created to be cherished and passed through generations.',
      icon: 'fa-solid fa-gem'
    }
  ];

  atelierStats = [
    { target: 450, prefix: '', suffix: '+', displayValue: '0+', label: 'Hours per Bridal Piece', desc: 'Handcrafted needle-by-needle' },
    { target: 24, prefix: '', suffix: 'K', displayValue: '0K', label: 'Gold & Silver Zari', desc: 'Electroplated authentic metallic wire' },
    { target: 85, prefix: '', suffix: '+', displayValue: '0+', label: 'Master Karigars', desc: 'Preserving living heritage' },
    { target: 100, prefix: '', suffix: '%', displayValue: '0%', label: 'Bespoke Atelier Fit', desc: 'Customized to your measurements' }
  ];
  hasCounted = false;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  ngAfterViewInit(): void {
    this.initScrollAnimations();
    this.initStatsObserver();
  }

  startCounting(): void {
    if (this.hasCounted) return;
    this.hasCounted = true;

    const duration = 1800; // ms duration
    const startTime = performance.now();

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic for a silky luxury slowdown
      const ease = 1 - Math.pow(1 - progress, 3);

      this.atelierStats.forEach(stat => {
        const current = Math.round(stat.target * ease);
        stat.displayValue = `${stat.prefix}${current}${stat.suffix}`;
      });

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        this.atelierStats.forEach(stat => {
          stat.displayValue = `${stat.prefix}${stat.target}${stat.suffix}`;
        });
      }
    };

    requestAnimationFrame(animateCount);
  }

  initStatsObserver(): void {
    if (typeof window === 'undefined') return;

    setTimeout(() => {
      const statsSection = document.querySelector('.about-stats-section');
      if (!statsSection) return;

      const rect = statsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        this.startCounting();
        return;
      }

      if ('IntersectionObserver' in window) {
        const statsObs = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            this.startCounting();
            statsObs.disconnect();
          }
        }, { threshold: 0.12 });
        statsObs.observe(statsSection);
      } else {
        this.startCounting();
      }
    }, 100);
  }

  initScrollAnimations(): void {
    if (typeof window === 'undefined') return;

    setTimeout(() => {
      const animElements = document.querySelectorAll(
        '.move-from-left, .move-from-right, .move-from-top, .move-from-bottom'
      );

      if ('IntersectionObserver' in window) {
        this.scrollObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
              }
            });
          },
          {
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.08,
          }
        );

        animElements.forEach((el) => this.scrollObserver?.observe(el));
      } else {
        animElements.forEach((el) => el.classList.add('is-visible'));
      }
    }, 80);
  }

  openAppointmentModal(): void {
    this.showAppointmentModal = true;
    this.bookingSuccess = false;
  }

  closeAppointmentModal(): void {
    this.showAppointmentModal = false;
    this.bookingSuccess = false;
  }

  submitAppointment(event: Event): void {
    event.preventDefault();
    this.bookingSuccess = true;
    setTimeout(() => {
      this.closeAppointmentModal();
    }, 2800);
  }
}
