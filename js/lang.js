// ── Arabic/English Language Toggle ──────────────────────────
const TRANSLATIONS = {
  // Navbar
  'Home': 'الرئيسية',
  'Services': 'الخدمات',
  'Air Freight': 'الشحن الجوي',
  'Sea Freight': 'الشحن البحري',
  'Road Transport': 'النقل البري',
  'Customs & Misc': 'التخليص الجمركي',
  'Contact': 'اتصل بنا',
  'Login': 'تسجيل الدخول',

  // Hero
  'Your Global': 'شريككم',
  'Freight Partner': 'في الشحن العالمي',
  'Union Logistics – your trusted freight forwarding partner since 2006, operating from the heart of Dubai Airport Free Zone.': 'يونيون لوجستكس – شريككم الموثوق في الشحن منذ 2006، من قلب منطقة دبي الحرة للمطار.',
  'Get a Quote': 'طلب عرض سعر',
  'Get a Quote →': 'طلب عرض سعر →',
  'Years of Excellence': 'سنوات من التميز',
  'Global Offices': 'مكاتب عالمية',
  'Freight Modes': 'أنماط الشحن',

  // About
  'About Us': 'من نحن',
  'Our Story': 'قصتنا',
  'Who We Are': 'من نحن',

  // Services section
  'What We Do': 'ماذا نقدم',
  'Comprehensive': 'حلول',
  'Logistics Solutions': 'لوجستية شاملة',
  'Warehousing': 'التخزين',
  'Customs Clearing': 'التخليص الجمركي',
  'Global Logistics': 'اللوجستيات العالمية',
  'Learn More →': 'اعرف المزيد →',

  // Why Choose Us
  'Why Union Logistics': 'لماذا يونيون لوجستكس',
  'Built for': 'مصمم لأجل',
  'Reliability & Speed': 'الموثوقية والسرعة',
  'Real-Time Track & Trace': 'التتبع الفوري',
  '24×7 Time-Critical Operations': 'عمليات على مدار الساعة',
  '18+ Years of Expertise': '+18 سنة من الخبرة',
  'Special Cargo Handling': 'مناولة شحنات خاصة',

  // Stats
  'Customer Support': 'دعم العملاء',

  // CTA
  'Ready to Ship?': 'جاهز للشحن؟',

  // Footer
  'Quick Links': 'روابط سريعة',
  'Contact Us': 'اتصل بنا',
  'Contact Us Instead →': 'اتصل بنا بدلاً من ذلك →',
  'All rights reserved.': 'جميع الحقوق محفوظة.',

  // Contact page
  'Our Offices': 'مكاتبنا',
  'Get in Touch': 'تواصل معنا',
  'Send a Message': 'أرسل رسالة',
  'Request a': 'طلب',
  'Quote': 'عرض سعر',
  'First Name': 'الاسم الأول',
  'Last Name': 'اسم العائلة',
  'Email Address': 'البريد الإلكتروني',
  'Phone Number': 'رقم الهاتف',
  'Service Required': 'الخدمة المطلوبة',
  'Message': 'الرسالة',
  'Send Message →': 'إرسال →',
  'Select a service...': 'اختر خدمة...',

  // Login modal
  'Client Portal': 'بوابة العملاء',
  'Full Management System Coming Soon!': 'نظام إدارة شامل قريباً!',

  // Service pages
  'Our Services': 'خدماتنا',
  'All Services': 'جميع الخدمات',
  'Air Freight Services': 'خدمات الشحن الجوي',
  'Sea Freight Services': 'خدمات الشحن البحري',
  'Road Transport Services': 'خدمات النقل البري',
  'Customs Clearing & Miscellaneous': 'التخليص الجمركي والخدمات المتنوعة',
  'Custom Solution': 'حل مخصص',
  'Need a': 'هل تحتاج',
};

let currentLang = localStorage.getItem('ul-lang') || 'en';

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  localStorage.setItem('ul-lang', currentLang);
  applyLanguage();
}

function applyLanguage() {
  const btn = document.getElementById('langToggle');
  if (btn) {
    btn.textContent = currentLang === 'en' ? 'عربي' : 'EN';
  }

  if (currentLang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
    document.body.style.fontFamily = "'Noto Sans Arabic', 'Segoe UI', sans-serif";

    // Translate text nodes
    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = el.getAttribute('data-ar');
    });

    // Translate elements without data attributes by matching text
    translateTextNodes(document.body);
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
    document.body.style.fontFamily = '';

    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = el.getAttribute('data-en');
    });

    restoreTextNodes(document.body);
  }
}

function translateTextNodes(root) {
  // Translate nav links, headings, labels, buttons
  const selectors = '.nav-links a, .section-label, .service-card h3, .feature-card h4, .btn, .hero-stat-label, .stat-label, .footer-col h5, .service-link, label, option, .nav-cta';
  root.querySelectorAll(selectors).forEach(el => {
    const text = el.textContent.trim();
    if (TRANSLATIONS[text] && !el.getAttribute('data-en')) {
      el.setAttribute('data-en', text);
      el.setAttribute('data-ar', TRANSLATIONS[text]);
      el.textContent = TRANSLATIONS[text];
    }
  });
}

function restoreTextNodes(root) {
  root.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.getAttribute('data-en');
  });
}

// Apply on load
document.addEventListener('DOMContentLoaded', () => {
  if (currentLang === 'ar') {
    applyLanguage();
  }
});

// Apply immediately if DOM is ready
if (document.readyState !== 'loading') {
  if (currentLang === 'ar') {
    applyLanguage();
  }
}
