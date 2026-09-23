"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { PROJECT_DETAILS } from "@/data/projectData";

interface NavbarProps {
  onOpenInquire: () => void;
  activeSection: string;
}

export default function Navbar({ onOpenInquire, activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "HOME", href: "#home", id: "home" },
    { label: "VISION", href: "#vision", id: "vision" },
    { label: "RESIDENCES", href: "#residences", id: "residences" },
    { label: "THE DESTINATION", href: "#destination", id: "destination" },
    { label: "LOCATION", href: "#location", id: "location" },
    { label: "AVAILABILITY", href: "#availability", id: "availability" },
  ];

  return (
    <>
      {/* Top-Left Logo with ZERO background color, matching ChatGPT Image Sep 16, 2026, 05_59_01 PM.png */}
      <Link
        href="#home"
        className="fixed top-6 left-8 sm:left-14 md:left-16 lg:left-20 z-50 w-[68px] h-[68px] sm:w-[74px] sm:h-[74px] bg-transparent flex items-center justify-center transition-transform duration-300 hover:scale-105"
        aria-label="Ananda Crown"
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/logo.jpg"
            alt="Ananda Crown Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </Link>

      {/* Top Transparent Navigation Header matching Reference */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 pl-32 sm:pl-40 md:pl-48 pr-8 sm:pr-14 md:pr-16 lg:pr-20 py-6 ${
          scrolled
            ? "bg-[#f5efeb]/85 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Centered Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center space-x-9 mx-auto">
            {navItems.map((item) => {
              const isActive = activeSection === item.id || (item.id === "home" && !activeSection);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group relative flex flex-col items-center py-1 text-[11.5px] font-medium tracking-[0.22em] uppercase text-[#221814] hover:text-[#9e6443] transition-colors duration-300"
                >
                  <span>{item.label}</span>
                  {/* Active underline indicator */}
                  <span
                    className={`mt-1 h-[1.5px] w-5 bg-[#221814] transition-all duration-300 ${
                      isActive ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-60 group-hover:scale-75"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Vertical Divider and INQUIRE text link */}
          <div className="hidden lg:flex items-center space-x-5 ml-auto">
            <span className="h-4 w-[1px] bg-[#221814]/40" />
            <button
              onClick={onOpenInquire}
              className="text-[11.5px] font-medium tracking-[0.22em] uppercase text-[#221814] hover:text-[#9e6443] transition-colors cursor-pointer"
            >
              INQUIRE
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden ml-auto">
            <button
              onClick={onOpenInquire}
              className="rounded-full border border-[#221814] px-3.5 py-1 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#221814]"
            >
              Inquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#221814] hover:text-[#9e6443] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#30160e]/98 backdrop-blur-xl pt-24 px-8 pb-12 flex flex-col justify-between lg:hidden animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-6 border-b border-[#c2a180]/20">
            <div className="relative h-10 w-10">
              <Image
                src="/images/logo-clean-transparent.png"
                alt="Ananda Crown Logo"
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#f7f2ed] hover:text-[#c2a180] transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6 my-auto">
            <div className="flex flex-col space-y-5">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-2xl font-light tracking-[0.1em] text-[#f7f2ed] hover:text-[#c2a180] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#c2a180]/20">
            <div className="space-y-1 text-xs text-[#c2a180]/80">
              <p className="font-mono text-sm text-[#f7f2ed]">
                {PROJECT_DETAILS.contact.phonePrimary}
              </p>
              <p className="text-[11px] pt-1 text-[#c2a180]">
                {PROJECT_DETAILS.location.address}
              </p>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquire();
              }}
              className="w-full bg-[#c2a180] text-[#30160e] py-3.5 text-xs font-semibold tracking-[0.25em] uppercase hover:bg-[#dfcaa8] transition-colors"
            >
              Open Inquiry Dossier
            </button>
          </div>
        </div>
      )}
    </>
  );
}
