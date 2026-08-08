import Image from 'next/image';
import { Utensils, Brush, Camera, HeartHandshake, Music, BedDouble, Flame, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Wedding Services - Catering, Decoration & More | Shani Marriage Palace",
  description: "From multi-cuisine catering to premium decorations and photography, explore all wedding services at Shani Marriage Palace."
};

export const dynamic = 'force-dynamic';

export default function ServicesPage() {
  const services = [
    {
      id: "catering",
      title: "Catering & Food",
      icon: Utensils,
      desc: "Delight your guests with exquisite culinary experiences. We offer customized menus that cater to every palate and dietary requirement.",
      included: ["Multi-cuisine menu", "Vegetarian & non-vegetarian options", "Live cooking counters", "Welcome drinks & mocktails", "Dessert & paan stations"],
      price: "From ₹1,200 per plate",
      img: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800"
    },
    {
      id: "decoration",
      title: "Decoration & Themes",
      icon: Brush,
      desc: "Transform your venue into a magical wonderland. Our decorators work closely with you to bring your dream aesthetic to life.",
      included: ["Custom floral arrangements", "Stage & mandap setup", "Ambient & mood lighting", "Table centerpieces & decor", "Grand entrance arches"],
      price: "From ₹75,000",
      img: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800"
    },
    {
      id: "photography",
      title: "Photography & Videography",
      icon: Camera,
      desc: "Capture the fleeting moments of your special day with our team of expert visual storytellers and cinematic directors.",
      included: ["Candid & traditional photography", "Cinematic video coverage", "Pre-wedding shoots", "Drone coverage", "Premium photo albums"],
      price: "From ₹50,000 per day",
      img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800"
    },
    {
      id: "makeup",
      title: "Makeup & Beauty",
      icon: HeartHandshake,
      desc: "Look your absolute best. We partner with top-tier makeup artists and stylists to ensure you shine on your big day.",
      included: ["HD Bridal makeup", "Mehendi artists (Bridal & guests)", "Professional hairstyling", "Groom grooming packages", "Saree draping"],
      price: "Enquire for Price",
      img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800"
    },
    {
      id: "entertainment",
      title: "Entertainment & Music",
      icon: Music,
      desc: "Keep the energy high and your guests dancing all night with our curated selection of entertainers.",
      included: ["Professional DJ setup", "Live band performances", "Traditional dhol players", "Experienced emcee/hosts", "Choreography for Sangeet"],
      price: "From ₹25,000",
      img: "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?q=80&w=800"
    },
    {
      id: "guest-management",
      title: "Guest Management & Stay",
      icon: BedDouble,
      desc: "Ensure your guests are comfortable and well taken care of from the moment they arrive until they depart.",
      included: ["Premium room bookings", "Airport/station transport", "Welcome gifts & hampers", "24/7 hospitality desk", "Luggage handling"],
      price: "Customized Packages",
      img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800"
    },
    {
      id: "rituals",
      title: "Rituals & Pooja",
      icon: Flame,
      desc: "Respecting traditions, we arrange all the necessary elements for your sacred vows and ceremonies.",
      included: ["Pandit/Priest arrangements", "Havan kund setup", "All pooja samagri", "Customized religious ceremonies", "Varmala arrangements"],
      price: "From ₹15,000",
      img: "https://images.unsplash.com/photo-1522273400909-fd1a8f77637e?q=80&w=800"
    },
    {
      id: "additional",
      title: "Additional Services",
      icon: Sparkles,
      desc: "The little details that make your wedding unique and perfectly coordinated.",
      included: ["Digital & physical invitations", "Custom return gifts", "Multi-tier wedding cakes", "Safe fireworks & pyrotechnics", "Baraat coordination"],
      price: "Enquire for Price",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#1a0a0a]">
      {/* Hero Banner */}
      <div className="relative pt-32 pb-20 flex items-center justify-center min-h-[40vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a] via-rose-950/50 to-[#1a0a0a] z-10" />
        <Image src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000" alt="Wedding Services" fill className="object-cover opacity-20 z-0" />
        
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-serif text-amber-400 mb-4">Our Wedding Services</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">From exquisite catering to breathtaking decor, we take care of every detail so you can focus on making memories.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="space-y-24">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div key={service.id} id={service.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                
                {/* Image Section */}
                <div className="w-full lg:w-1/2">
                  <div className="relative h-[400px] w-full rounded-3xl overflow-hidden border border-rose-900/50 shadow-2xl group">
                    <Image src={service.img} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0a]/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-lg">
                        <Icon size={24} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <h2 className="text-4xl font-serif text-white mb-4">{service.title}</h2>
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">{service.desc}</p>
                  
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
                    <h3 className="text-rose-400 font-bold uppercase tracking-widest text-sm mb-4">What's Included</h3>
                    <ul className="space-y-3">
                      {service.included.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <span className="text-amber-500 mt-1">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-widest">Starting at</p>
                      <p className="text-3xl font-bold text-amber-400">{service.price}</p>
                    </div>
                    
                    <Link href={`/wedding/contact?service=${service.id}`} className="px-8 py-3 bg-rose-600 text-white font-bold rounded-full hover:bg-rose-500 transition-colors shadow-lg shadow-rose-600/20">
                      Enquire Now
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
