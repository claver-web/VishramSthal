export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export const mainNav: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Rooms", href: "/rooms" },
  { title: "Wedding", href: "/wedding" },
  { title: "Gallery", href: "/gallery" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" }
];

export const weddingNav: NavItem[] = [
  { title: "Overview", href: "/wedding" },
  { title: "Venues", href: "/wedding/venues" },
  { title: "Services", href: "/wedding/services" },
  { title: "Gallery", href: "/wedding/gallery" },
  { title: "Contact", href: "/wedding/contact" }
];
