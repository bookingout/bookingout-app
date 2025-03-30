// lib/translations.ts (or your filename)

export const translations = {
  en: {
    header: {
      comingSoon: "Coming Soon"
    },
    hero: {
      subtitle: "Discover Your Next Gay Adventure in Poland.\nTaste the real Fun!",
      cta: "Get Ready to Explore!",
    },
    "about.us": "About us",
    "our.offer": "Our offer",
    newsletter: "Newsletter",
    faq: "FAQ",
    contact: "Contact",
    features: { // This key seems unused now that 'experiences' exists, keep or remove?
      title: "Discover Amazing Experiences",
      card1: {
        title: "Vibrant Clubs",
        description: "Discover the hottest nightlife spots with exclusive access to the best clubs in Poland.",
      },
      card2: {
        title: "Relaxing Resorts",
        description: "Unwind in luxurious resorts and spas, perfect for rejuvenating after exciting nights out.",
      },
      card3: {
        title: "Friendly Spaces",
        description:
          "Connect with like-minded people in welcoming venues designed for socializing and making memories.",
      },
    },
    countdown: {
      message: "Instead of spending time here, consider visiting one of the recommended venues. Don't waste your time!",
      ctaText: "Sign up for updates",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
    newsletterSection: { // Keeping this in case the old component is still used somewhere
      title: "Stay Updated",
      description: "Be the first to know when we launch and receive exclusive offers.",
      buttonText: "Subscribe",
      successMessage: "Thanks for subscribing! We'll keep you updated.",
      placeholder: "Enter your email",
    },
    newsletter_v2: {
      mainTitle: "Stay Ahead with Our Newsletter",
      mainDescription: "Join our community and receive the latest updates, exclusive content, and special offers directly to your inbox.",
      formTitle: "Subscribe to Our Newsletter",
      formSubtitle: "Get insights and tips to help you grow.",
      placeholder: "Enter your email address",
      privacy: "We respect your privacy. Unsubscribe at any time.",
      button: "Subscribe Now",
      buttonSubmitting: "Subscribing...",
      benefit1: "Updates about hot events, clubs, parties",
      benefit2: "Exclusive Content",
      benefit3: "No Spam",
      successTitle: "Thank You for Subscribing!",
      successMessage: "We've sent a confirmation email to {email}. Please check your inbox to complete the subscription.",
      tryAgainButton: "Subscribe Another Email",
    },
    dynamicImageSection: { // New key for this component
    items: [ // Array matching the component's 'images' array
      {
        title: "Nightlife Vibes",
        description: "Experience the energy of Poland's most exclusive clubs",
        alt: "Vibrant nightclub scene with colorful lights" // Add alt text
      },
      {
        title: "Relaxation Retreats",
        description: "Unwind in stunning resorts with world-class amenities",
        alt: "Luxurious resort pool with palm trees" // Add alt text
      },
      {
        title: "Social Spaces",
        description: "Connect with like-minded people in stylish venues",
        alt: "Social gathering in a modern lounge" // Add alt text
      },
      {
        title: "Unforgettable Moments",
        description: "Create memories that last a lifetime",
        alt: "Romantic dinner setting with city views" // Add alt text
      }
    ]
  },
    experiences: { // Translations for the EnhancedInteractiveCards component
      mainTitle: "Unforgettable Experiences",
      mainSubtitle: "Discover unique experiences tailored to your preferences and create memories that last a lifetime.",
      // Nested objects for each card:
      nightlife: {
        title: "Vibrant Nightlife",
        description: "Discover the best nightlife spots with exclusive access to the finest clubs and venues. Experience unforgettable evenings in the most exciting locations."
      },
      resorts: {
        title: "Relaxing Resorts",
        description: "Unwind in luxurious spa resorts, perfect for rejuvenation after exciting nightlife adventures. Enjoy premium amenities and world-class service."
      },
      spaces: {
        title: "Friendly Spaces",
        description: "Connect with like-minded people in welcoming environments designed for creating memorable experiences. Build relationships that last beyond your trip."
      },
      buttonText: "Explore more" // Text for the button inside the card
    },
    faqSection: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "When will BookingOut.fun launch?",
          answer:
            "We're planning to launch in Summer 2025. Subscribe to our newsletter to be notified when we go live!",
        },
        {
          question: "Which cities will be available at launch?",
          answer:
            "We'll initially launch in Warsaw, Krakow, and Gdansk, with plans to expand to other Polish cities shortly after.",
        },
        {
          question: "How does the booking process work?",
          answer:
            "Our platform makes it easy to discover and book clubs, resorts, and social spaces. Simply browse venues, select your date and time, and complete your booking with secure payment.",
        },
        {
          question: "Are there any membership fees?",
          answer:
            "BookingOut.fun is free to use! There are no membership fees or hidden charges. You only pay for your bookings.",
        },
        {
          question: "Can I cancel my booking?",
          answer:
            "Yes, most venues allow cancellations up to 24-48 hours before your booking. Specific cancellation policies will be clearly displayed for each venue.",
        },
      ],
    },
    social: {
      title: "Follow Us",
    },
    footer: {
      rights: "All Rights Reserved",
      comingSoon: "Coming Soon" // Added coming soon here too
    },
  },
  // ====================================
  // === POLISH SECTION (CORRECTED) ===
  // ====================================
  pl: {
    header: {
      comingSoon: "Już wkrótce"
    },
    hero: {
      subtitle: "Ekskluzywne doświadczenia dla mężczyzn, którzy wiedzą, czego pragną. \nOdkryj świat rozrywki, awangardy i niezapomnianych spotkań.",
      cta: "Przygotuj się na przygodę!",
    },
    "about.us": "O nas",
    "our.offer": "Nasza oferta",
    newsletter: "Newsletter",
    faq: "FAQ",
    contact: "Kontakt",
    features: { // Keep or remove if unused?
      title: "Nizapomniane doświadczenia",
      card1: {
        title: "Tętniące życiem kluby",
        description: "Odkryj najgorętsze miejsca nocnego życia z ekskluzywnym dostępem do najlepszych klubów w Polsce.",
      },
      card2: {
        title: "Relaksujące kurorty",
        description:
          "Odpocznij w luksusowych kurortach spa, idealnych do regeneracji po ekscytujących nocnych wyjściach.",
      },
      card3: {
        title: "Przyjazne przestrzenie",
        description:
          "Nawiąż (niezobowiązujący) kontakt w przyjaznych miejscach stworzonych do FUN i tworzenia wyjątkowych wspomnień.",
      },
    },
    countdown: {
      message: "Zamiast spędzać czas tutaj, odwiedź jedno z polecanych u nas miejsc. Nie marnuj czasu!",
      ctaText: "Zapisz się już dziś, aby nic Ci nie umknęło",
      days: "Dni",
      hours: "Godzin",
      minutes: "Minut",
      seconds: "Sekund",
    },
    newsletterSection: {
      title: "Bądź na Bieżąco",
      description: "Dowiedz się pierwszy o naszym starcie i otrzymuj ekskluzywne oferty.",
      buttonText: "Subskrybuj",
      successMessage: "Dziękujemy za subskrypcję! Będziemy informować Cię na bieżąco.",
      placeholder: "Wpisz swój email",
    },
    newsletter_v2: {
      mainTitle: "Bądź o krok do przodu!",
      mainDescription: "Dołącz do naszej społeczności i otrzymuj najnowsze aktualizacje, ekskluzywne treści i specjalne oferty bezpośrednio na swoją skrzynkę.",
      formTitle: "Zapisz się do Newslettera",
      formSubtitle: "Bądź na bieżąco. Nikogo/niczego nie przegap!",
      placeholder: "Wpisz swój adres email",
      privacy: "Szanujemy Twoją prywatność. Wypisz się w dowolnym momencie.",
      button: "Zapisz się Teraz",
      buttonSubmitting: "Zapisywanie...",
      benefit1: "Fun - zawsze na bieżąco",
      benefit2: "Ekskluzywne Treści",
      benefit3: "Zero Spamu",
      successTitle: "Dziękujemy za Zapisanie się!",
      successMessage: "Wysłaliśmy email potwierdzający na adres {email}. Sprawdź swoją skrzynkę, aby dokończyć subskrypcję.",
      tryAgainButton: "Dodaj kolejny Email",
    },
    dynamicImageSection: { // New key for this component
    items: [ // Array matching the component's 'images' array
      {
        title: "Pulsujące Nocne Życie",
        description: "Poczuj energię najbardziej ekskluzywnych klubów w Polsce",
        alt: "Tętniąca życiem scena klubowa z sekcjami dla dorosłych" // Add alt text
      },
      {
        title: "Groące Wakacje",
        description: "Zrelaksuj się w zachwycających kurortach i odkrywaj ich tajemne miejsca",
        alt: "Miejsca tabu bez tabu" // Add alt text
      },
      {
        title: "Towarzystwo do wszystkiego",
        description: "Nawiązuj kontakty z ludźmi o podobnych potrzebach i ceniących dyskrecję",
        alt: "Spotkania dyskretne w towarzyskie bez tabu" // Add alt text
      },
      {
        title: "Niezapomniane Chwile",
        description: "Doświadczeń i gromadź wspomnienia, które pozostaną na całe życie",
        alt: "Romantycznie czy też bezpruderyjnie - Ty decydujesz" // Add alt text
      }
    ]
  },
    // --- CORRECTED experiences section ---
    experiences: {
      mainTitle: "Wrażenia na całe życie",
      mainSubtitle: "Odkryj wyjątkowe (eksluzywne/prywatne) miejsca i doświadczaj życia tak jak Ty lubisz.",
      // Nested objects for each card:
      nightlife: { // Card 1 using ID
        title: "Tętniące Życie Nocne",
        description: "Odkryj najlepsze miejsca życia nocnego z ekskluzywnym dostępem do najlepszych klubów i lokali. Przeżyj niezapomniane wieczory w najbardziej ekscytujących miejscach."
      }, // <-- Added comma
      resorts: { // Card 2 using ID
        title: "Wakacje dla dorosłych",
        description: "Zrelaksuj się w luksusowych kurortach tylko dla mężczyzn, odwiedzaj miejsca, gdzie tabu nie istnieje. Ciesz się premium udogodnieniami i obsługą na światowym poziomie."
      }, // <-- Added comma
      spaces: { // Card 3 using ID
        title: "Niezapomniane kontakty",
        description: "Nawiązuj kontakty z mężczyznami o podobnych potrzebach, w przyjaznym i bezpiecznym otoczeniu. Buduj relacje, które (jak tylko zechcesz) przetrwają dłużej niż podróż."
      }, // <-- Added comma
      buttonText: "Odkryj więcej" // Text for the button inside the card
    }, // <-- Added comma after experiences
    // --- End corrected section ---
    faqSection: {
      title: "Często Zadawane Pytania",
      items: [
        {
          question: "Kiedy BookingOut.fun zostanie uruchomiony?",
          answer:
            "Planujemy start latem 2025 roku. Zapisz się do naszego newslettera, aby otrzymać powiadomienie o starcie!",
        },
        {
          question: "Które miasta będą dostępne na początku?",
          answer:
            "Początkowo uruchomimy usługę w Warszawie, Krakowie, Poznaniu, Wrocławiu i Gdańsku, z planami rozszerzenia na inne polskie miasta wkrótce potem.",
        },
        {
          question: "Jak działa nasza platforma?",
          answer:
            "Nasza platforma ułatwia odkrywanie klubów, kurortów i przestrzeni gay-friendly. Wystarczy przeglądać miejsca, wybrać datę i godzinę, a następnie dokonać rezerwacji.",
        },
        {
          question: "Czy są jakieś opłaty członkowskie?",
          answer:
            "BookingOut.fun jest darmowy w użyciu! Nie ma żadnych opłat członkowskich ani ukrytych kosztów. Płacisz tylko za swoje rezerwacje.",
        },
        {
          question: "Czy mogę anulować rezerwację?",
          answer:
            "Tak, większość miejsc pozwala na anulowanie do 24-48 godzin przed rezerwacją. Szczegółowe zasady anulowania będą wyraźnie wyświetlane dla każdego miejsca.",
        },
      ],
    }, // <-- Added comma after faqSection
    social: {
      title: "Obserwuj Nas",
    }, // <-- Added comma after social
    footer: {
      rights: "Wszelkie Prawa Zastrzeżone",
      comingSoon: "Już wkrótce" // Added coming soon here
    } // <-- No comma after last item
  }, // <-- Comma after pl object (if you add more languages later)
  // Add other languages if needed
};