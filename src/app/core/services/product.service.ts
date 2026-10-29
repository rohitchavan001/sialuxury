import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Master Array of Product Objects - directly loaded without model files
  products: any[] = [
    {
      id: 1,
      name: 'Noor Jahan Zari Bridal Lehenga',
      subtitle: 'Hand-embroidered zardozi on crimson silk velvet',
      category: 'Lehenga',
      price: 2450,
      originalPrice: 2800,
      rating: 4.9,
      reviewsCount: 48,
      image: 'assets/categories/lehenga.png',
      gallery: [
        'assets/categories/lehenga.png',
        'assets/thebeauty.png',
        'assets/thebeauty1.png'
      ],
      description: 'The Noor Jahan Bridal Lehenga is an ode to regal Mughal craftsmanship. Handcrafted with authentic zardozi, dabka, and shimmering gota patti on pure crimson silk velvet with an organza double veil.',
      fabric: 'Pure Silk Velvet & Organza Dupatta',
      color: 'Crimson Vermillion',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom'],
      inStock: true,
      badge: 'BESTSELLER',
      isFeatured: true
    },
    {
      id: 2,
      name: 'Gulmohar Kanjivaram Silk Saree',
      subtitle: 'Pure mulberry silk with 24k gold woven border',
      category: 'Saree',
      price: 1150,
      originalPrice: 1350,
      rating: 5.0,
      reviewsCount: 32,
      image: 'assets/categories/Saree.png',
      gallery: [
        'assets/categories/Saree.png',
        'assets/categories/lehenga.png'
      ],
      description: 'Woven over 45 painstaking days in Kanchipuram, featuring opulent temple borders interwoven with 24-karat gold dipped zari and intricate peacock motifs.',
      fabric: '100% Pure Mulberry Silk & Gold Zari',
      color: 'Emerald & Royal Gold',
      sizes: ['Free Size'],
      inStock: true,
      badge: 'NEW',
      isFeatured: true
    },
    {
      id: 3,
      name: 'Raja Man Singh Royal Sherwani',
      subtitle: 'Raw silk sherwani with tonal resham embroidery',
      category: 'Sherwani',
      price: 1850,
      originalPrice: 2100,
      rating: 4.8,
      reviewsCount: 26,
      image: 'assets/categories/Sherwani.png',
      gallery: [
        'assets/categories/Sherwani.png',
        'assets/categories/kurta.png'
      ],
      description: 'Impeccable bespoke craftsmanship for the contemporary groom. Handcrafted in ivory matka raw silk accented with handcrafted mother-of-pearl buttons and matching stole.',
      fabric: 'Raw Matka Silk & Chanderi Stole',
      color: 'Ivory Champagne',
      sizes: ['38', '40', '42', '44', '46', 'Bespoke'],
      inStock: true,
      badge: 'LIMITED',
      isFeatured: true
    },
    {
      id: 4,
      name: 'Chandni Ivory Floor-Length Anarkali',
      subtitle: 'Georgette silhouette with cascading mirror work',
      category: 'Anarkali',
      price: 920,
      originalPrice: 1100,
      rating: 4.7,
      reviewsCount: 19,
      image: 'assets/categories/Fusion.png',
      gallery: [
        'assets/categories/Fusion.png',
        'assets/thebeauty1.png'
      ],
      description: 'Featuring 48 kalis in flowy French georgette, embellished with delicate mirror and thread embroidery that catches the light from every angle.',
      fabric: 'French Viscose Georgette',
      color: 'Pearl Moonstone',
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
      badge: 'SALE',
      isFeatured: false
    },
    {
      id: 5,
      name: 'Aura Velvet Tuxedo & Bandhgala',
      subtitle: 'Midnight velvet jacket with gilded metallic piping',
      category: 'Sherwani',
      price: 1390,
      originalPrice: 1600,
      rating: 4.9,
      reviewsCount: 22,
      image: 'assets/categories/kurta.png',
      gallery: [
        'assets/categories/kurta.png'
      ],
      description: 'Sculpted structured silhouette tailored in Italian midnight velvet with hand-laid metallic piping and jewel buttons.',
      fabric: 'Italian Silk Velvet',
      color: 'Midnight Obsidian',
      sizes: ['38', '40', '42', '44'],
      inStock: true,
      badge: 'NEW',
      isFeatured: false
    },
    {
      id: 6,
      name: 'Meenakari Rose Gold Gown',
      subtitle: 'Couture ballgown with structured corset bodice',
      category: 'Gown',
      price: 1780,
      originalPrice: 2050,
      rating: 4.9,
      reviewsCount: 38,
      image: 'assets/categories/Gown.png',
      gallery: [
        'assets/categories/Gown.png'
      ],
      description: 'Dramatic architectural gown with cascading tulle skirt, hand-beaded with Austrian crystals and rose gold metal wires.',
      fabric: 'Micro Tulle & Silk Satin',
      color: 'Rose Gold Champagne',
      sizes: ['XS', 'S', 'M', 'L'],
      inStock: true,
      badge: 'BESTSELLER',
      isFeatured: true
    },
    {
      id: 7,
      name: 'Surya Banarasi Brocade Lehenga',
      subtitle: 'Pure gold brocade with antique marodi handwork',
      category: 'Lehenga',
      price: 2100,
      originalPrice: 2400,
      rating: 4.8,
      reviewsCount: 15,
      image: 'assets/thebeauty.png',
      gallery: [
        'assets/thebeauty.png'
      ],
      description: 'Heirloom quality bridal wear woven in Varanasi with antique gold threads, framed with hand-stitched borders and a tissue dupatta.',
      fabric: 'Pure Katan Banarasi Silk',
      color: 'Gilded Amber Gold',
      sizes: ['S', 'M', 'L', 'Custom'],
      inStock: true,
      badge: 'LIMITED',
      isFeatured: false
    },
    {
      id: 8,
      name: 'Niloufer Chanderi Tissue Saree',
      subtitle: 'Whisper-light metallic tissue with scalloped border',
      category: 'Saree',
      price: 880,
      originalPrice: 990,
      rating: 4.9,
      reviewsCount: 41,
      image: 'assets/thebeauty1.png',
      gallery: [
        'assets/thebeauty1.png'
      ],
      description: 'Effortlessly graceful sheer tissue saree with cutwork scalloped borders and hand-embroidered floral vines.',
      fabric: 'Chanderi Metallic Tissue',
      color: 'Liquid Platinum',
      sizes: ['Free Size'],
      inStock: true,
      badge: 'NEW',
      isFeatured: false
    }
  ];

  categories: any[] = [
    {
      id: 'lehenga',
      name: 'Bridal Lehengas',
      tagline: 'Hand-embroidered heirlooms for the bride',
      image: 'assets/categories/lehenga.png',
      itemCount: 24
    },
    {
      id: 'saree',
      name: 'Couture Sarees',
      tagline: 'Pure Kanjivaram & Banarasi weaves',
      image: 'assets/categories/Saree.png',
      itemCount: 38
    },
    {
      id: 'sherwani',
      name: 'Royal Menswear',
      tagline: 'Regal Sherwanis & Bandhgalas',
      image: 'assets/categories/Sherwani.png',
      itemCount: 19
    },
    {
      id: 'gown',
      name: 'Evening Gowns',
      tagline: 'Sculpted silhouettes for celebrations',
      image: 'assets/categories/Gown.png',
      itemCount: 16
    }
  ];

  // Direct short getters
  getProducts(): any[] {
    return this.products;
  }

  getProductById(id: number): any {
    return this.products.find(p => p.id === id);
  }

  getProductsByCategory(cat: string): any[] {
    if (!cat || cat === 'All') return this.products;
    return this.products.filter(p => p.category.toLowerCase() === cat.toLowerCase());
  }

  getCategories(): any[] {
    return this.categories;
  }

  getFeaturedProducts(): any[] {
    return this.products.filter(p => p.isFeatured);
  }
}
