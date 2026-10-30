"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VisionSection from "@/components/VisionSection";
import ResidencesSection from "@/components/ResidencesSection";
import DestinationSection from "@/components/DestinationSection";
import LocationSection from "@/components/LocationSection";
import AvailabilitySection from "@/components/AvailabilitySection";
import FloorplanModal from "@/components/FloorplanModal";
import BrochureModal from "@/components/BrochureModal";
import InquireDrawer from "@/components/InquireDrawer";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import { InventoryUnit } from "@/data/projectData";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [inquireOpen, setInquireOpen] = useState<boolean>(false);
  const [brochureOpen, setBrochureOpen] = useState<boolean>(false);
  const [selectedFloorplanUnit, setSelectedFloorplanUnit] = useState<InventoryUnit | null>(null);
  const [inquireUnit, setInquireUnit] = useState<InventoryUnit | null>(null);

  // Active section tracker matching One24's nav-ball
  useEffect(() => {
    const sections = ["home", "vision", "residences", "destination", "location", "availability"];
    
    const handleScroll = () => {
      const scrollY = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenInquire = (unit?: InventoryUnit | null) => {
    setInquireUnit(unit || null);
    setInquireOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-[#160D08] text-[#F5EFEB] selection:bg-[#C5A880] selection:text-[#160D08]">
      {/* Luxury Custom Cursor */}
      <CustomCursor />

      {/* Cinematic Opening Preloader */}
      <Preloader />

      {/* Minimalist Top Navigation */}
      <Navbar
        onOpenInquire={() => handleOpenInquire(null)}
        activeSection={activeSection}
      />

      {/* Hero Section */}
      <Hero onOpenInquire={() => handleOpenInquire(null)} />

      {/* Vision Section */}
      <VisionSection />

      {/* Residences Section */}
      <ResidencesSection />

      {/* The Destination: Mohali Living */}
      <DestinationSection />

      {/* Location Section */}
      <LocationSection />

      {/* Availability Matrix */}
      <AvailabilitySection
        onOpenInquire={() => handleOpenInquire(null)}
        onOpenBrochure={() => setBrochureOpen(true)}
        onSelectFloorplan={(unit) => setSelectedFloorplanUnit(unit)}
      />

      {/* Architectural Footer */}
      <Footer onOpenInquire={() => handleOpenInquire(null)} />

      {/* Interactive Floorplan Modal */}
      <FloorplanModal
        unit={selectedFloorplanUnit}
        onClose={() => setSelectedFloorplanUnit(null)}
        onInquireUnit={(unit) => {
          setSelectedFloorplanUnit(null);
          handleOpenInquire(unit);
        }}
      />

      {/* Digital Brochure Modal */}
      <BrochureModal
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
        onOpenInquire={() => {
          setBrochureOpen(false);
          handleOpenInquire(null);
        }}
      />

      {/* Luxury Inquire Slide-Out Drawer */}
      <InquireDrawer
        isOpen={inquireOpen}
        onClose={() => {
          setInquireOpen(false);
          setInquireUnit(null);
        }}
        selectedUnit={inquireUnit}
      />
    </main>
  );
}
