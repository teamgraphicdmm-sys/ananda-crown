export interface InventoryUnit {
  id: string;
  fraction: string;
  tower: string;
  bedrooms: number;
  typology: string;
  floor: number;
  floorLabel: string;
  side: string;
  parking: string;
  areaSqFt: number;
  areaSqM: number;
  status: "available" | "reserved" | "sold";
  priceEst: string;
  floorplanImage: string;
  specs: {
    livingDining: string;
    masterBedroom: string;
    balconies: string;
    servantRoom: boolean;
    ceilingHeight: string;
  };
}

export interface ResidenceHighlight {
  id: string;
  title: string;
  tag: string;
  description: string;
  image: string;
  features: string[];
}

export interface LandmarkDistance {
  name: string;
  category: "Transport" | "Healthcare" | "Education" | "Sports" | "Retail" | "Business";
  distance: string;
  time: string;
}

export const PROJECT_DETAILS = {
  name: "Ananda Crown",
  tagline: "The Crown Has Arrived",
  subtagline: "Ultra-Luxury High-Rise Sky Residences",
  philosophy: "Carefully thought out and tailored with great flexibility, adapting itself to the needs and lifestyle of the discerning connoisseur.",
  developer: {
    name: "Ananda Group",
    founders: "Sahil Aggarwal & Anuj Bansal",
    legacy: "Over two decades of proven excellence in premium real estate development.",
    website: "https://www.anandacrownmohali.com",
  },
  rera: {
    number: "PBRERA-SAS81-PR1421-082026",
    state: "Punjab Real Estate Regulatory Authority",
    verified: true,
  },
  location: {
    address: "Sector 78, SAS Nagar, Mohali, Punjab 140308",
    city: "Mohali (Chandigarh Tricity)",
    state: "Punjab",
    pincode: "140308",
    googleMapsUrl: "https://maps.google.com/?q=Sector+78+Mohali+Punjab",
  },
  contact: {
    phonePrimary: "+91 97797 99705",
    phoneSecondary: "+91 98724 00078",
    email: "sales@anandacrown.com",
    conciergeEmail: "concierge@anandacrown.com",
    whatsapp: "https://wa.me/919779799705?text=Hello%20Ananda%20Crown%20Team%2C%20I%20would%20like%20to%20inquire%20about%20the%20residences.",
    instagram: "https://www.instagram.com/anandacrownmohali",
    facebook: "https://www.facebook.com/anandacrownmohali",
  },
  architecturalStats: {
    elevation: "G + 30 Floors",
    frontage: "600 Feet Grand Avenue Frontage",
    ceilingHeight: "11.5 Feet Clear Slab-to-Slab",
    architects: "IE Design & HBS Studio",
    landscapeDesign: "Oracles Landscape Design",
    possessionYear: "2026 - 2027",
    totalTowers: "Iconic High-Rise Towers",
    totalUnits: "Limited Edition Residences",
    startingRate: "₹10,500 / sq. ft.",
  },
  typologies: [
    {
      name: "3 BHK Royal",
      areaSqFt: "2,425 sq. ft.",
      areaSqM: "225.3 sq. m.",
      features: "Expansive Wrap-Around Balcony, Italian Marble Living, Powder Room",
    },
    {
      name: "3+1 BHK Imperial",
      areaSqFt: "2,750 sq. ft.",
      areaSqM: "255.5 sq. m.",
      features: "Separate Servant/Staff Suite, Double-Height Balconies, Private Foyer",
    },
    {
      name: "4 BHK Palatial",
      areaSqFt: "3,250 sq. ft.",
      areaSqM: "301.9 sq. m.",
      features: "4 En-Suite Bedrooms, Master Dressing Suite, Show Kitchen + Utility",
    },
    {
      name: "4+1 BHK Sovereign",
      areaSqFt: "3,650 sq. ft.",
      areaSqM: "339.1 sq. m.",
      features: "Panoramic Corner Vistas, Family Lounge, Maid Quarters, 3 Car Bays",
    },
    {
      name: "5 BHK Sky Penthouse",
      areaSqFt: "4,100 sq. ft.",
      areaSqM: "380.9 sq. m.",
      features: "Double-Height Living Salon, Private Sky Plunge Pool, 360° Tricity Views",
    },
  ],
};

export const RESIDENCE_SPACES: ResidenceHighlight[] = [
  {
    id: "skydeck",
    title: "Grand Skydeck & Wrap Balconies",
    tag: "Balcony & Verandah",
    description:
      "Deep, architectural cantilevered skydecks engineered with high-impact seamless glass railings. Designed to seamlessly blur the boundary between opulent interior salons and the panoramic green expanses of Sector 78.",
    image: "/images/wait-is-over.webp",
    features: [
      "Panoramic 270° views of Mohali & Shivalik foothills",
      "All-weather teak wood finish porcelain decking",
      "Seamless glass railings with integrated brass trim",
      "Direct alfresco dining access from formal living",
    ],
  },
  {
    id: "living-palace",
    title: "The Grand Living & Dining Salon",
    tag: "Living & Dining",
    description:
      "A celebration of volume and light. Boasting unprecedented 11.5-foot clear ceiling heights and book-matched imported Italian marble, this grand salon effortlessly accommodates royal banquets and intimate soirées alike.",
    image: "/images/crown-arrived.webp",
    features: [
      "11.5 ft clear slab-to-slab ceiling height",
      "Full-height acoustic double-glazed curtain walls",
      "Custom Italian Statuario / Botticino marble flooring",
      "Pre-integrated smart automation & architectural lighting",
    ],
  },
  {
    id: "gourmet-kitchen",
    title: "Gourmet Chef's Culinary Atelier",
    tag: "Kitchen & Pantry",
    description:
      "Ergonomically curated for culinary mastery. Equipped with German soft-close cabinetry, quartz waterfall stone countertops, built-in European appliances, and a discrete dry utility room.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    features: [
      "German modular cabinetry with concealed soft-touch hardware",
      "Scratch-resistant quartz countertops with waterfall edge",
      "Separate heavy-cooking wet kitchen & utility bay",
      "Integrated microwave, induction hob & silent chimney",
    ],
  },
  {
    id: "presidential-suite",
    title: "The Presidential Master Sanctuary",
    tag: "Master Suite",
    description:
      "An exclusive sanctuary crafted for rejuvenation. Features private viewing balcony access, a couture walk-in wardrobe salon, and a 5-fixture master bathroom clad in exotic stone with a free-standing soaking tub.",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80",
    features: [
      "Engineered French oak chevron wooden flooring",
      "Couture walk-in dressing room with ambient LED lighting",
      "Five-fixture spa master bath with freestanding tub",
      "Smart climate and motorized blackout blind controls",
    ],
  },
  {
    id: "porte-cochere",
    title: "Grand Arrival Porte-Cochère",
    tag: "Arrival Experience",
    description:
      "A magnificent 600-foot frontage entrance with a sculptural canopy designed by IE Design. Royal fountains, manicured date palms, and discreet chauffeur valet bays welcome residents home in true aristocratic fashion.",
    image: "/images/wait-is-over.webp",
    features: [
      "Monumental sculptural porte-cochère arrival canopy",
      "Triple-height climate-controlled royal lobby lounge",
      "Discreet biometric access and concierge reception",
      "Chauffeur waiting lounge and electric vehicle charging bays",
    ],
  },
];

export const INVENTORY_DATA: InventoryUnit[] = [
  {
    id: "unit-k",
    fraction: "K",
    tower: "Tower Crown A",
    bedrooms: 3,
    typology: "3 BHK Royal",
    floor: 3,
    floorLabel: "Floor 03",
    side: "North-East (Park View)",
    parking: "2 Covered Bays",
    areaSqFt: 2425,
    areaSqM: 225.3,
    status: "available",
    priceEst: "₹2.54 Cr*",
    floorplanImage: "/images/florplan.png",
    specs: {
      livingDining: "28' x 16' Palatial Salon",
      masterBedroom: "18' x 14' with En-suite & Dresser",
      balconies: "8' Wide Wrap-around Skydeck",
      servantRoom: true,
      ceilingHeight: "11.5 ft Clear",
    },
  },
  {
    id: "unit-l",
    fraction: "L",
    tower: "Tower Crown A",
    bedrooms: 3,
    typology: "3+1 BHK Imperial",
    floor: 6,
    floorLabel: "Floor 06",
    side: "Boulevard Facing",
    parking: "2 Covered Bays",
    areaSqFt: 2750,
    areaSqM: 255.5,
    status: "available",
    priceEst: "₹2.88 Cr*",
    floorplanImage: "/images/florplan.png",
    specs: {
      livingDining: "30' x 18' Living & Dining",
      masterBedroom: "20' x 15' Master Retreat",
      balconies: "Dual Balconies (East & West)",
      servantRoom: true,
      ceilingHeight: "11.5 ft Clear",
    },
  },
  {
    id: "unit-m",
    fraction: "M",
    tower: "Tower Crown A",
    bedrooms: 4,
    typology: "4 BHK Palatial",
    floor: 11,
    floorLabel: "Floor 11",
    side: "Panoramic Corner",
    parking: "3 Covered Bays",
    areaSqFt: 3250,
    areaSqM: 301.9,
    status: "available",
    priceEst: "₹3.41 Cr*",
    floorplanImage: "/images/florplan.png",
    specs: {
      livingDining: "34' x 20' Grand Salon",
      masterBedroom: "22' x 16' Presidential Suite",
      balconies: "3-Sided Open Wrap Balcony",
      servantRoom: true,
      ceilingHeight: "11.5 ft Clear",
    },
  },
  {
    id: "unit-i",
    fraction: "I",
    tower: "Tower Crown B",
    bedrooms: 3,
    typology: "3 BHK Royal",
    floor: 14,
    floorLabel: "Floor 14",
    side: "City Skyline & Sunset",
    parking: "2 Covered Bays",
    areaSqFt: 2425,
    areaSqM: 225.3,
    status: "available",
    priceEst: "₹2.54 Cr*",
    floorplanImage: "/images/florplan.png",
    specs: {
      livingDining: "28' x 16' Palatial Salon",
      masterBedroom: "18' x 14' with En-suite",
      balconies: "8' Wide Sun-drenched Skydeck",
      servantRoom: true,
      ceilingHeight: "11.5 ft Clear",
    },
  },
  {
    id: "unit-j",
    fraction: "J",
    tower: "Tower Crown B",
    bedrooms: 4,
    typology: "4+1 BHK Sovereign",
    floor: 18,
    floorLabel: "Floor 18",
    side: "Golf & Green Corridor",
    parking: "3 Covered Bays",
    areaSqFt: 3650,
    areaSqM: 339.1,
    status: "reserved",
    priceEst: "₹3.83 Cr*",
    floorplanImage: "/images/florplan.png",
    specs: {
      livingDining: "36' x 22' Royal Salon + Family Den",
      masterBedroom: "24' x 16' Grand Master with Walk-in",
      balconies: "Continuous Double-Width Verandah",
      servantRoom: true,
      ceilingHeight: "11.5 ft Clear",
    },
  },
  {
    id: "unit-f",
    fraction: "F",
    tower: "Tower Crown B",
    bedrooms: 3,
    typology: "3+1 BHK Imperial",
    floor: 21,
    floorLabel: "Floor 21",
    side: "North-East Garden View",
    parking: "2 Covered Bays",
    areaSqFt: 2750,
    areaSqM: 255.5,
    status: "available",
    priceEst: "₹2.88 Cr*",
    floorplanImage: "/images/florplan.png",
    specs: {
      livingDining: "30' x 18' Living & Dining",
      masterBedroom: "20' x 15' Master Chamber",
      balconies: "Dual Viewing Decks",
      servantRoom: true,
      ceilingHeight: "11.5 ft Clear",
    },
  },
  {
    id: "unit-g",
    fraction: "G",
    tower: "Tower Crown C",
    bedrooms: 4,
    typology: "4 BHK Palatial",
    floor: 24,
    floorLabel: "Floor 24",
    side: "Unobstructed Shivalik Hills",
    parking: "3 Covered Bays",
    areaSqFt: 3250,
    areaSqM: 301.9,
    status: "available",
    priceEst: "₹3.41 Cr*",
    floorplanImage: "/images/florplan.png",
    specs: {
      livingDining: "34' x 20' Grand Salon",
      masterBedroom: "22' x 16' Presidential Suite",
      balconies: "Wrap-around Glass Balcony",
      servantRoom: true,
      ceilingHeight: "11.5 ft Clear",
    },
  },
  {
    id: "unit-h",
    fraction: "H",
    tower: "Tower Crown C",
    bedrooms: 4,
    typology: "4+1 BHK Sovereign",
    floor: 26,
    floorLabel: "Floor 26",
    side: "Boulevard & Sunset",
    parking: "3 Covered Bays",
    areaSqFt: 3650,
    areaSqM: 339.1,
    status: "sold",
    priceEst: "₹3.83 Cr*",
    floorplanImage: "/images/florplan.png",
    specs: {
      livingDining: "36' x 22' Royal Salon",
      masterBedroom: "24' x 16' Master Quarters",
      balconies: "Panoramic Sky Balconies",
      servantRoom: true,
      ceilingHeight: "11.5 ft Clear",
    },
  },
  {
    id: "unit-ph1",
    fraction: "PH-1",
    tower: "Crown Penthouse Summit",
    bedrooms: 5,
    typology: "5 BHK Sky Penthouse",
    floor: 29,
    floorLabel: "Duplex 29 & 30",
    side: "360° Tricity Horizon",
    parking: "4 Private Stalls",
    areaSqFt: 4100,
    areaSqM: 380.9,
    status: "available",
    priceEst: "₹4.75 Cr*",
    floorplanImage: "/images/florplan.png",
    specs: {
      livingDining: "Double-Height 24 ft Grand Atrium",
      masterBedroom: "28' x 18' Penthouse Master with Private Deck",
      balconies: "Private Rooftop Terrace & Plunge Pool",
      servantRoom: true,
      ceilingHeight: "24 ft Double-Height Living / 12 ft Bedrooms",
    },
  },
];

export const NEARBY_LANDMARKS: LandmarkDistance[] = [
  {
    name: "I.S. Bindra PCA Stadium Mohali",
    category: "Sports",
    distance: "2.8 km",
    time: "5 mins",
  },
  {
    name: "Sohana Multispecialty Hospital",
    category: "Healthcare",
    distance: "1.9 km",
    time: "4 mins",
  },
  {
    name: "Fortis Hospital Mohali",
    category: "Healthcare",
    distance: "4.2 km",
    time: "8 mins",
  },
  {
    name: "Shaheed Bhagat Singh Intl. Airport (IXC)",
    category: "Transport",
    distance: "11.5 km",
    time: "15 mins",
  },
  {
    name: "Mohali Railway Station",
    category: "Transport",
    distance: "4.5 km",
    time: "9 mins",
  },
  {
    name: "IT City & Aerocity (Infosys / HDFC / Quark)",
    category: "Business",
    distance: "5.8 km",
    time: "10 mins",
  },
  {
    name: "Indian School of Business (ISB) & IISER",
    category: "Education",
    distance: "6.2 km",
    time: "11 mins",
  },
  {
    name: "Elante Mall & Sector 17 Chandigarh",
    category: "Retail",
    distance: "12 km",
    time: "18 mins",
  },
];

export const LUXURY_AMENITIES = [
  {
    title: "Clubhouse Royale",
    tagline: "25,000+ sq.ft of Aristocratic Leisure",
    description: "Private cigar lounge, screening theatre, multi-cuisine private dining, and grand banquet hall.",
  },
  {
    title: "Lagoon & Infinity Pools",
    tagline: "Heated Year-Round Aquatics",
    description: "Multi-tiered lagoon swimming pool, heated indoor pool, children's splash bay, and sunken sun-loungers.",
  },
  {
    title: "Holistic Spa & Thermal Suites",
    tagline: "Revitalization & Wellness",
    description: "Swedish sauna, eucalyptus steam chambers, private hydrotherapy suites, and Ayurvedic treatment rooms.",
  },
  {
    title: "High-Performance Gymnasium",
    tagline: "Curated Fitness with Technogym",
    description: "Personal training studios, aerial yoga deck, pilates reformers, and cardio terrace overlooking gardens.",
  },
  {
    title: "Landscaped Zen Realm",
    tagline: "Designed by Oracles Landscape",
    description: "Reflecting lotus ponds, reflexology aromatic pathways, private cabanas, and 600 ft canopy avenue.",
  },
  {
    title: "Biometric & Concierge Security",
    tagline: "7-Tier Smart Fortress",
    description: "Facial recognition access, boom barrier RFID recognition, 24/7 round-the-clock patrol, and smart app intercom.",
  },
];
