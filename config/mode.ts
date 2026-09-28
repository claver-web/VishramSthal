export type ModeType = 'hotel' | 'wedding';

export interface ModeConfig {
  name: string;
  tagline: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
  logoText: string;
  navLinks: string[];
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  footerDesc: string;
}

export const modeConfigs: Record<ModeType, ModeConfig> = {
  hotel: {
    name: "Vishram Sthal",
    tagline: "Comfortable Stay in Dehra Gopipur",
    colors: {
      primary: "#f97316", // Orange/Saffron
      secondary: "#fbbf24", // Gold
      background: "#0f0f1a", // Dark
    },
    logoText: "VS",
    navLinks: ["Home", "Rooms", "About", "Contact"],
    hero: {
      title: "Welcome to Vishram Sthal",
      subtitle: "Experience comfort at Word No. 6, Dehra Gopipur",
      cta: "Explore Rooms",
    },
    footerDesc: "Your home away from home in the beautiful hills of Dehra Gopipur. We offer comfortable rooms with excellent amenities for a relaxing stay."
  },
  wedding: {
    name: "Shani Marriage Palace",
    tagline: "Where Dreams Become Memories",
    colors: {
      primary: "#e11d48", // Rose/Pink
      secondary: "#fbbf24", // Gold
      background: "#1a0a0a", // Deep maroon
    },
    logoText: "VSW",
    navLinks: ["Home", "Venues", "Services", "Gallery", "Contact"],
    hero: {
      title: "Your Dream Wedding Begins Here",
      subtitle: "Luxurious venues & flawless arrangements at Dehra Gopipur",
      cta: "Explore Wedding Venues",
    },
    footerDesc: "Creating magical moments that last a lifetime. Our exquisite venues and dedicated team ensure your special day is perfectly flawless."
  }
};
